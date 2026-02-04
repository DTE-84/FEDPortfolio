let isMainModalOpen = false;
let isProjectModalOpen = false;

function toggleModal() {
  const mainModal = document.querySelector(".main-modal");
  isMainModalOpen = !isMainModalOpen;

  if (isMainModalOpen) {
    document.body.classList.add("modal--open");
  } else {
    document.body.classList.remove("modal--open");
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  const submitBtn = document.querySelector(".form__submit");
  const originalBtnText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.style.cursor = "not-allowed";
  submitBtn.disabled = true;

  loading.classList.add("modal__overlay--visible");

  emailjs
    .sendForm(
      "service_akgmg6r",
      "template_nx4fvkb",
      event.target,
      "zmPiRmxRkScwdiYFX",
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList.add("modal__overlay--visible");

      setTimeout(() => {
        success.classList.remove("modal__overlay--visible");

        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.cursor = "pointer";
        submitBtn.disabled = false;
        toggleModal();
      }, 2000);

      event.target.reset();
    })
    .catch((err) => {
      loading.classList.remove("modal__overlay--visible");

      submitBtn.innerHTML = originalBtnText;
      submitBtn.style.cursor = "pointer";
      submitBtn.disabled = false;

      console.error(err);
      alert(
        "Problem sending message. Please contact me at drew.t.ernst@gmail.com",
      );
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const linkTexts = ["Home", "About", "Projects", "Contact"];

  navLinks.forEach((link, index) => {
    const text = linkTexts[index];
    if (text) {
      link.innerHTML = text
        .split("")
        .map(
          (letter, i) =>
            `<span class="letter" style="--sibling-index: ${i}">${letter}</span>`,
        )
        .join("");
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".section-title, .about-content, .project-card")
    .forEach((el) => {
      observer.observe(el);
    });

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isMainModalOpen) {
    toggleModal();
  }
});
