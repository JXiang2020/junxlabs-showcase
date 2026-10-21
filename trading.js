(() => {
  const trigger = document.querySelector(".trading-preview-trigger");
  const viewer = document.getElementById("trading-fullscreen-viewer");
  if (!trigger || !viewer) return;

  const root = document.documentElement;
  let session = null;

  function restore(current) {
    if (session !== current) return;

    current.listeners.abort();
    viewer.hidden = true;
    root.style.overflow = current.rootOverflow;
    document.body.style.overflow = current.bodyOverflow;
    trigger.focus({ preventScroll: true });

    // The site enables smooth scrolling; restore the saved position immediately.
    const scrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(current.scrollX, current.scrollY);
    root.style.scrollBehavior = scrollBehavior;
    session = null;
  }

  function close() {
    const current = session;
    if (!current || current.closing) return;
    current.closing = true;

    if (document.fullscreenElement !== viewer) {
      restore(current);
      return;
    }

    try {
      Promise.resolve(document.exitFullscreen()).catch(() => {
        if (session !== current) return;
        if (document.fullscreenElement === viewer) current.closing = false;
        else restore(current);
      });
    } catch {
      if (document.fullscreenElement === viewer) current.closing = false;
      else restore(current);
    }
  }

  function open() {
    if (session) return;

    const current = {
      listeners: new AbortController(),
      mode: "opening",
      closing: false,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      rootOverflow: root.style.overflow,
      bodyOverflow: document.body.style.overflow
    };
    session = current;

    viewer.hidden = false;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    viewer.focus({ preventScroll: true });

    const { signal } = current.listeners;
    viewer.addEventListener("click", close, { signal });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }, { signal });
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement === viewer) {
        current.mode = "native";
        if (current.closing) document.exitFullscreen().catch(() => { current.closing = false; });
      } else if (current.mode === "native") {
        restore(current);
      }
    }, { signal });
    document.addEventListener("fullscreenerror", () => {
      if (session === current && !current.closing && document.fullscreenElement !== viewer) {
        current.mode = "fallback";
      }
    }, { signal });

    if (typeof viewer.requestFullscreen !== "function") {
      current.mode = "fallback";
      return;
    }

    try {
      const request = viewer.requestFullscreen();
      Promise.resolve(request).then(() => {
        if (session !== current || current.closing) {
          if (document.fullscreenElement === viewer) document.exitFullscreen().catch(() => {});
          return;
        }
        current.mode = document.fullscreenElement === viewer ? "native" : "fallback";
      }).catch(() => {
        if (session === current && !current.closing) current.mode = "fallback";
      });
    } catch {
      current.mode = "fallback";
    }
  }

  trigger.addEventListener("click", open);
})();
