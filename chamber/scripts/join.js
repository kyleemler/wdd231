const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("nav");
const timestamp = document.querySelector("#timestamp");
const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

timestamp.value = new Date().toISOString();

modalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const modal = document.querySelector(`#${button.dataset.modal}`);
        modal.showModal();
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
