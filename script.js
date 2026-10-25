(() => {
  const counter = document.getElementById("site-visits");

  if (!counter) return;

  const params = new URLSearchParams(window.location.search);
  const exclusionSetting = params.get("exclude_my_visits");
  const storageKey = "junxlabs.excludeMyVisits";
  let excludeMyVisits = exclusionSetting === "1";

  try {
    if (exclusionSetting === "1") {
      localStorage.setItem(storageKey, "1");
    } else if (exclusionSetting === "0") {
      localStorage.removeItem(storageKey);
    }
    excludeMyVisits = localStorage.getItem(storageKey) === "1";
  } catch {
    // The activation link still excludes this page view if storage is unavailable.
  }

  if (exclusionSetting === "1" || exclusionSetting === "0") {
    params.delete("exclude_my_visits");
    const query = params.toString();
    history.replaceState(history.state, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
  }

  fetch("/api/visits", {
    method: excludeMyVisits ? "GET" : "POST",
    headers: { Accept: "application/json" },
    cache: "no-store"
  })
    .then((response) => {
      if (!response.ok) throw new Error("Visit counter unavailable");
      return response.json();
    })
    .then(({ visits }) => {
      if (Number.isInteger(visits)) {
        counter.textContent = `Page views: ${visits}`;
      }
    })
    .catch(() => {
      // The counter is supplementary; leave the page unchanged on failure.
    });
})();
