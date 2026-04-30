const header = document.querySelector("[data-header]");
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const raceButtons = Array.from(document.querySelectorAll("[data-race]"));
const raceCards = Array.from(document.querySelectorAll(".race-card"));
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const tabPanels = Array.from(document.querySelectorAll("[data-panel]"));
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const faqButtons = Array.from(document.querySelectorAll(".faq-item button"));
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector(".lightbox-close");
const transparentPixel =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const raceData = {
  team: {
    kicker: "Team Trail",
    title: "半马组越野赛",
    description:
      "以团队协作为核心的山地越野组别，适合具备耐力基础、能在复杂地形中稳定推进的跑者。",
    distance: "22 km",
    ascent: "1500 m+",
    format: "3 人团队",
    bars: ["88%", "76%", "92%"],
    note: "团队须共同完成路线，成绩以最后一名队员到达终点的时间为准。",
  },
  mini: {
    kicker: "Mini Trail",
    title: "Mini 越野赛",
    description:
      "保留爬升、下降、林道与草甸体验的入门组别，适合希望完整感受山地越野节奏的个人跑者。",
    distance: "10 km",
    ascent: "600 m+",
    format: "个人赛",
    bars: ["58%", "48%", "62%"],
    note: "建议具备连续徒步或跑步基础，并提前熟悉补水、下坡和天气应对。",
  },
  family: {
    kicker: "Family Trail",
    title: "亲子体验赛",
    description:
      "以陪伴和体验为主的家庭路线，让更多参与者在安全节奏下走进崇礼山野。",
    distance: "10 km",
    ascent: "600 m+",
    format: "家庭同行",
    bars: ["52%", "38%", "48%"],
    note: "不以竞速为核心，建议根据同行成员体能控制节奏，优先保障安全与体验。",
  },
};

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

function closeNav() {
  nav.classList.remove("is-open");
  header.classList.remove("nav-active");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function setRace(raceKey) {
  const race = raceData[raceKey];
  if (!race) return;

  document.querySelector("[data-race-kicker]").textContent = race.kicker;
  document.querySelector("[data-race-title]").textContent = race.title;
  document.querySelector("[data-race-description]").textContent = race.description;
  document.querySelector("[data-race-distance]").textContent = race.distance;
  document.querySelector("[data-race-ascent]").textContent = race.ascent;
  document.querySelector("[data-race-format]").textContent = race.format;
  document.querySelector("[data-race-note]").textContent = race.note;

  document.querySelectorAll(".terrain-bars span").forEach((bar, index) => {
    bar.style.setProperty("--bar", race.bars[index]);
  });

  raceButtons.forEach((button) => {
    const selected = button.dataset.race === raceKey;
    button.setAttribute("aria-pressed", String(selected));
    button.closest(".race-card").classList.toggle("is-selected", selected);
  });
}

function setTab(tabKey) {
  tabButtons.forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.tab === tabKey));
  });
  tabPanels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== tabKey;
  });
}

function setGalleryFilter(filterKey) {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filterKey);
  });
  galleryItems.forEach((item) => {
    const visible = filterKey === "all" || item.dataset.category === filterKey;
    item.classList.toggle("is-hidden", !visible);
  });
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
  lightboxImage.src = transparentPixel;
  lightboxImage.alt = "";
}

function toggleFaq(button) {
  const expanded = button.getAttribute("aria-expanded") === "true";
  const answer = button.nextElementSibling;
  button.setAttribute("aria-expanded", String(!expanded));
  answer.hidden = expanded;
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

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

raceButtons.forEach((button) => {
  button.addEventListener("click", () => setRace(button.dataset.race));
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setTab(button.dataset.tab));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setGalleryFilter(button.dataset.filter));
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    openLightbox(item.dataset.full, item.dataset.caption, image.alt);
  });
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => toggleFaq(button));
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
