/**
 * source-search.ts — Verifikasi & perkaya sumber referensi course dengan API NYATA.
 *
 * Tanpa YouTube Data API (tidak perlu kartu kredit): semua lewat Tavily.
 *  1. Artikel/dokumentasi  → Tavily web search → URL nyata & relevan.
 *  2. Video YouTube        → Tavily dibatasi ke youtube.com → video nyata.
 *  3. Fallback URL dari LLM → hanya dipakai kalau domain tepercaya (anti-SSRF)
 *                              DAN lolos liveness check (bukan link mati).
 *  4. Caching Upstash (TTL 24 jam) untuk hemat kuota Tavily & lebih cepat.
 *
 * Aman & opsional: kalau TAVILY_API_KEY tidak diset, enrichment dilewati dan
 * sumber LLM yang lolos allowlist + liveness tetap dipakai.
 */

import { isSafeUrl } from "./sanitize";
import { redis } from "./ratelimit";

const ALLOWED_SOURCE_DOMAINS = [
  "developer.mozilla.org",
  "react.dev",
  "nodejs.org",
  "w3schools.com",
  "freecodecamp.org",
  "geeksforgeeks.org",
  "dicoding.com",
  "petanikode.com",
  "codepolitan.com",
  "github.com",
  "youtube.com",
  "youtu.be",
];

const TTL = 60 * 60 * 24; // 24 jam

export type Src = { type: string; title: string; url: string };

// ── Tavily search (dengan cache Upstash) ──
async function tavilySearch(
  query: string,
  includeDomains?: string[],
): Promise<{ title: string; url: string } | null> {
  const key = process.env.TAVILY_API_KEY;
  if (!key) return null;

  const cacheKey = `src:tav:${includeDomains?.join(",") || "web"}:${query.toLowerCase()}`;
  try {
    const hit = await redis.get<{ title: string; url: string }>(cacheKey);
    if (hit) return hit;
  } catch {
    /* cache miss / redis down — lanjut fetch */
  }

  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        api_key: key,
        query,
        max_results: 1,
        search_depth: "basic",
        ...(includeDomains ? { include_domains: includeDomains } : {}),
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const top = data.results?.[0];
    if (!top?.url) return null;
    const result = { title: top.title || query, url: top.url };
    try {
      await redis.set(cacheKey, result, { ex: TTL });
    } catch {
      /* abaikan kegagalan cache */
    }
    return result;
  } catch {
    return null;
  }
}

async function searchYouTube(query: string): Promise<Src | null> {
  const r = await tavilySearch(`${query} tutorial`, ["youtube.com"]);
  if (r && /([?&]v=|youtu\.be\/|\/embed\/)/.test(r.url)) {
    return { type: "YOUTUBE", title: r.title, url: r.url };
  }
  return null;
}

// ── Liveness check (SSRF-safe: hanya URL allowlist; hasil di-cache) ──
async function isUrlAlive(url: string): Promise<boolean> {
  if (!isSafeUrl(url, ALLOWED_SOURCE_DOMAINS)) return false;

  const cacheKey = `src:live:${url}`;
  try {
    const hit = await redis.get<string>(cacheKey);
    if (hit === "1") return true;
    if (hit === "0") return false;
  } catch {
    /* lanjut cek */
  }

  let alive = true;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: ctrl.signal,
    });
    // Banyak server menolak HEAD → coba GET sebelum memvonis mati.
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: ctrl.signal,
      });
    }
    clearTimeout(t);
    alive = res.status !== 404 && res.status !== 410; // lunak: hanya buang yang jelas hilang
  } catch {
    alive = true; // timeout/error → beri benefit of the doubt
  }

  try {
    await redis.set(cacheKey, alive ? "1" : "0", { ex: TTL });
  } catch {
    /* abaikan */
  }
  return alive;
}

export async function enrichSources(
  courseTitle: string,
  moduleTitle: string,
  sources: Src[],
): Promise<Src[]> {
  const nonYt = sources.filter((s) => s.type !== "YOUTUBE").slice(0, 5);

  const [yt, webResults] = await Promise.all([
    searchYouTube(`${courseTitle} ${moduleTitle}`),
    Promise.all(
      nonYt.map(async (s): Promise<Src | null> => {
        // Ganti dengan hasil web nyata dari Tavily.
        const web = await tavilySearch(`${moduleTitle} ${s.title}`);
        if (web) {
          return {
            type: s.type === "DOCUMENTATION" ? "DOCUMENTATION" : "ARTICLE",
            title: web.title,
            url: web.url,
          };
        }
        // Fallback: URL LLM hanya kalau domain tepercaya & masih hidup.
        if (s.url && (await isUrlAlive(s.url))) return s;
        return null;
      }),
    ),
  ]);

  const out: Src[] = [];
  if (yt) out.push(yt);
  for (const w of webResults) if (w) out.push(w);

  // Dedup berdasarkan URL.
  const seen = new Set<string>();
  return out.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
}
