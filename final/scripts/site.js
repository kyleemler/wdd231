const yearElement = document.querySelector("#year");
const menuButton = document.querySelector("#menu-button");
const primaryNavigation = document.querySelector("#primary-navigation");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

if (menuButton && primaryNavigation) {
    menuButton.addEventListener("click", () => {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isExpanded));
        primaryNavigation.classList.toggle("open", !isExpanded);
    });
}
