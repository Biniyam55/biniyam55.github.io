const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

function setMenuOpen(isOpen) {
  navigation.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("click", (event) => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  const clickedInsideNavigation = navigation.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);

  if (isOpen && !clickedInsideNavigation && !clickedMenuButton) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
    menuButton.focus();
  }
});
