const root = document.documentElement;

document.querySelector(".theme-toggle")?.addEventListener("click", () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

document.querySelectorAll(".copy-link").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.url);
      btn.textContent = "Copied ✓";
    } catch (e) {
      prompt("Copy this link:", btn.dataset.url);
    }
    setTimeout(() => (btn.textContent = "Copy link"), 2000);
  });
});

// Mobile browsers get the OS share sheet (WhatsApp, Telegram, Substack app, …).
if (navigator.share) {
  document.querySelectorAll(".native-share").forEach((btn) => {
    btn.hidden = false;
    btn.addEventListener("click", () =>
      navigator.share({ title: btn.dataset.title, url: btn.dataset.url }).catch(() => {})
    );
  });
}
