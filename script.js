const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const scrollProgress = document.querySelector(".scroll-progress");
let scrollUpdatePending = false;

window.addEventListener(
  "scroll",
  () => {
    if (scrollUpdatePending) return;
    scrollUpdatePending = true;
    requestAnimationFrame(() => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      scrollProgress.style.transform = `scaleX(${progress})`;
      scrollUpdatePending = false;
    });
  },
  { passive: true },
);

const heroArt = document.querySelector(".hero-art");
const canUseParallax =
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (heroArt && canUseParallax) {
  heroArt.addEventListener("pointermove", (event) => {
    const bounds = heroArt.getBoundingClientRect();
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    heroArt.style.setProperty("--parallax-x", `${offsetX}px`);
    heroArt.style.setProperty("--parallax-y", `${offsetY}px`);
  });

  heroArt.addEventListener("pointerleave", () => {
    heroArt.style.setProperty("--parallax-x", "0px");
    heroArt.style.setProperty("--parallax-y", "0px");
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
