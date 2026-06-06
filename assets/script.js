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

const languageStorageKey = "preferred-language";
const translations = window.siteTranslations || {};
const translatableSelectors = [
  ".navbar-nav > .nav-item:not(.language-switcher) .nav-link",
  ".hero-section h1",
  ".hero-copy",
  ".hero-note",
  "#certifications .section-heading h2",
  ".cert-card p",
  ".cert-link",
  "#experience .section-heading h2",
  "#experience .section-heading p",
  ".domain-tags span",
  ".experience-card h3",
  ".experience-card p",
  ".experience-tags span",
  "#contact h2",
  "#contact p",
  "#contact .contact-link[target]",
  ".site-footer p",
  ".footer-policy-link",
  "#privacyPolicyTitle",
  ".privacy-modal .modal-body p"
];

const normalizeText = (value) => value.replace(/\s+/g, " ").trim();

document.querySelectorAll(translatableSelectors.join(",")).forEach((element) => {
  element.dataset.originalText = normalizeText(element.textContent);
});

const translateText = (originalText, language) => {
  const languageStrings = translations[language]?.strings || {};

  if (languageStrings[originalText]) {
    return languageStrings[originalText];
  }

  if (originalText.includes("Kiryl Rtsishchau. Professional profile.")) {
    const profileText = languageStrings["Professional profile."] || "Professional profile.";
    return originalText.replace("Professional profile.", profileText);
  }

  const privacyContactText = "For privacy-related questions, you can contact me at:";

  if (originalText.startsWith(privacyContactText) && languageStrings[privacyContactText]) {
    return originalText.replace(privacyContactText, languageStrings[privacyContactText]);
  }

  return originalText;
};

const setLanguage = (language) => {
  const selectedLanguage = translations[language] ? language : "en";
  const languageConfig = translations[selectedLanguage];

  document.documentElement.lang = selectedLanguage;
  document.querySelectorAll("[data-original-text]").forEach((element) => {
    element.textContent = translateText(element.dataset.originalText, selectedLanguage);
  });

  const expertise = window.expertiseTranslations?.[selectedLanguage];

  if (expertise) {
    document.querySelectorAll(".domain-tags span").forEach((element, index) => {
      element.textContent = expertise.domains[index] || element.textContent;
    });
    document.querySelectorAll(".experience-subtitle").forEach((element, index) => {
      element.textContent = expertise.subtitles[index] || element.textContent;
    });
    document.querySelectorAll(".experience-card > p:not(.experience-subtitle)").forEach((element, index) => {
      element.textContent = expertise.descriptions[index] || element.textContent;
    });
  }

  const skillTags = window.skillTagTranslations?.[selectedLanguage] || {};

  document.querySelectorAll(".experience-tags span").forEach((element) => {
    element.textContent = skillTags[element.dataset.originalText] || element.dataset.originalText;
  });

  document.getElementById("currentLanguageFlag").src = languageConfig.flag;
  document.getElementById("currentLanguageCode").textContent = selectedLanguage.toUpperCase();

  document.querySelectorAll("[data-language]").forEach((button) => {
    const isActive = button.dataset.language === selectedLanguage;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem(languageStorageKey, selectedLanguage);
};

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

const savedLanguage = localStorage.getItem(languageStorageKey);
const browserLanguage = navigator.language.slice(0, 2).toLowerCase();
setLanguage(savedLanguage || (translations[browserLanguage] ? browserLanguage : "en"));
