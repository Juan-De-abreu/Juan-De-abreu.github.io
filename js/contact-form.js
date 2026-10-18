// Inicializar EmailJS con tu Public Key
// (si el CDN de EmailJS no cargó, el formulario avisa en vez de romperse)
(function () {
  if (window.emailjs && typeof emailjs.init === 'function') {
    emailjs.init("FdZqEK1eQxBoOz6Sh"); // ej: "PUBLIC_XXXXXXXXXXXX"
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const errorEl = document.getElementById("form-error");
  const successEl = document.getElementById("form-success");
  const spinner = document.getElementById("form-spinner");

  function t(key) {
    if (!window.translations || !window.currentLang) return key;
    return window.translations[window.currentLang][key] || key;
  }

  function showError(msgKey) {
    errorEl.textContent = t(msgKey);
    errorEl.classList.remove("hidden");
    successEl.classList.add("hidden");
  }

  function showSuccess(msgKey) {
    successEl.textContent = t(msgKey);
    successEl.classList.remove("hidden");
    errorEl.classList.add("hidden");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      showError("contact.error.required");
      return;
    }

    if (!emailRegex.test(email)) {
      showError("contact.error.email");
      return;
    }

    if (!window.emailjs || typeof emailjs.sendForm !== "function") {
      showError("contact.error.server");
      return;
    }

    spinner.classList.remove("hidden");

    emailjs
      .sendForm("service_vq4ijio", "template_lrrkhpa", "#contact-form")
      .then(
        () => {
          spinner.classList.add("hidden");
          showSuccess("contact.success");
          form.reset();
        },
        () => {
          spinner.classList.add("hidden");
          showError("contact.error.server");
        }
      );
  });
});
