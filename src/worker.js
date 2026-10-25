const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};

function isExcludedVisitor(request, env) {
  const visitorIp = request.headers.get("CF-Connecting-IP")?.toLowerCase();
  return Boolean(visitorIp && env.EXCLUDED_VISITOR_IPS?.split(/[\s,]+/)
    .some((ip) => ip.toLowerCase() === visitorIp));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/visits") {
      if (request.method !== "GET" && request.method !== "POST") {
        return new Response(null, { status: 405, headers: { Allow: "GET, POST" } });
      }

      try {
        const shouldIncrement = request.method === "POST" && !isExcludedVisitor(request, env);
        const row = await env.SITE_VISITS
          .prepare(shouldIncrement
            ? "UPDATE site_visits SET visits = visits + 1 WHERE id = 1 RETURNING visits"
            : "SELECT visits FROM site_visits WHERE id = 1")
          .first();

        if (!row || !Number.isInteger(row.visits)) {
          throw new Error("Visit counter has not been initialized");
        }

        return Response.json({ visits: row.visits }, { headers: JSON_HEADERS });
      } catch (error) {
        console.error("Visit counter request failed", error);
        return Response.json({ error: "Visit counter unavailable" }, { status: 503, headers: JSON_HEADERS });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
