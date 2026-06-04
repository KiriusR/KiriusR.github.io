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
