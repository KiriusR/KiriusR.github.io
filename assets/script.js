const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

document.querySelectorAll(".navbar-collapse .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector(".navbar-collapse.show");

    if (nav && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});

document.querySelectorAll("[data-download-cv]").forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    const originalText = link.textContent;

    link.textContent = "Preparing CV...";

    try {
      const response = await fetch(link.href);

      if (!response.ok) {
        throw new Error("CV download failed");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = downloadUrl;
      anchor.download = link.getAttribute("download") || "Kiryl_Rtsishchau_CV.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);
      link.textContent = "Download started";
    } catch {
      window.open(link.href, "_blank", "noopener,noreferrer");
      link.textContent = "Opening CV";
    }

    window.setTimeout(() => {
      link.textContent = originalText;
    }, 2200);
  });
});
