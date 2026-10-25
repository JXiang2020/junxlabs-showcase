const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/visits") {
      if (request.method !== "GET" && request.method !== "POST") {
        return new Response(null, { status: 405, headers: { Allow: "GET, POST" } });
      }

      try {
        const row = await env.SITE_VISITS
          .prepare(request.method === "GET"
            ? "SELECT visits FROM site_visits WHERE id = 1"
            : "UPDATE site_visits SET visits = visits + 1 WHERE id = 1 RETURNING visits")
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
