const productionOrigins = [
  "https://clarise.my.id",
  "https://app.clarise.my.id",
  "https://admin.panel.clarise.my.id",
];

const devOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

const allAllowedOrigins = [...productionOrigins, ...devOrigins];

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return allAllowedOrigins.includes(origin);
}

export function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowed = isAllowedOrigin(origin);
  return {
    "Access-Control-Allow-Origin": allowed && origin ? origin : "",
    "Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT,PATCH,DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    // Cegah browser meng-cache CORS preflight terlalu lama
    "Access-Control-Max-Age": "600",
  };
}

export function corsResponse(
  body: unknown,
  status: number,
  origin: string | null,
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(origin),
    },
  });
}

export { productionOrigins, devOrigins };
