const HTML_TAG_RE = /<[^>]*>/g;

const INJECTION_KEYWORDS = [
  "ignore previous",
  "forget instructions",
  "you are now",
  "act as",
  "jailbreak",
  "dan mode",
  "developer mode",
  "system prompt",
  "ignore all",
  "bypass",
  "pretend you are",
  "roleplay as",
  "new persona",
  "disregard",
  "override",
];

export function stripHtml(input: string): string {
  return input.replace(HTML_TAG_RE, "");
}

export function sanitizeUserContent(input: string): string {
  return stripHtml(input).trim();
}

export function detectPromptInjection(input: string): boolean {
  const lower = input.toLowerCase();
  return INJECTION_KEYWORDS.some((kw) => lower.includes(kw));
}

export function isSafeUrl(url: string, allowedDomains: string[]): boolean {
  try {
    const parsed = new URL(url);
    return (
      (parsed.protocol === "https:" || parsed.protocol === "http:") &&
      allowedDomains.some(
        (d) => parsed.hostname === d || parsed.hostname.endsWith(`.${d}`),
      )
    );
  } catch {
    return false;
  }
}
