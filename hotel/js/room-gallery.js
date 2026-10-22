document.querySelectorAll("[data-room-gallery]").forEach((gallery) => {
  const track = gallery.querySelector(".room-card__image-track");
  const slides = [...track.children];
  const dotsContainer = gallery.querySelector("[data-gallery-dots]");
  const previousButton = gallery.querySelector("[data-gallery-previous]");
  const nextButton = gallery.querySelector("[data-gallery-next]");

  if (slides.length < 2) return;

  let activeIndex = 0;
  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "room-card__gallery-dot";
    dot.setAttribute("aria-label", `Show photo ${index + 1} of ${slides.length}`);
    dot.setAttribute("aria-current", String(index === activeIndex));
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.append(dot);
    return dot;
  });

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    track.scrollTo({
      left: activeIndex * track.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.setAttribute("aria-current", String(index === activeIndex));
    });
  }

  previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => showSlide(activeIndex + 1));

  track.addEventListener("scroll", () => {
    activeIndex = Math.round(track.scrollLeft / track.clientWidth);
    updateDots();
  }, { passive: true });

  gallery.classList.add("is-ready");
});
