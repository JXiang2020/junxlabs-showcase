(() => {
  const counter = document.getElementById("site-visits");

  if (!counter) return;

  fetch("/api/visits", {
    method: "POST",
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
