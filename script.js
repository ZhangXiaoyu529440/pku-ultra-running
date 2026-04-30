const header = document.querySelector("[data-header]");
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector(".lightbox-close");
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

function closeNav() {
  nav.classList.remove("is-open");
  header.classList.remove("nav-active");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function openLightbox(src, caption, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.removeAttribute("src");
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("nav-active", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isActive);
      });
    });
  },
  { rootMargin: "-40% 0px -48% 0px", threshold: 0.01 },
);

observedSections.forEach((section) => sectionObserver.observe(section));

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    openLightbox(item.dataset.full, item.dataset.caption, image.alt);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
    if (lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  }
});
