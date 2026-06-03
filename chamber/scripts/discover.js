import { interests } from "../data/discover.mjs";

const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("nav");
const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");
const lastVisitKey = "brokenArrowDiscoverLastVisit";

menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

function createInterestCard(place, index) {
    const card = document.createElement("article");
    card.classList.add("interest-card", `card-${index + 1}`);

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="images/${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button">Learn More</button>
    `;

    return card;
}

function displayInterests() {
    discoverGrid.innerHTML = "";
    interests.forEach((place, index) => {
        discoverGrid.appendChild(createInterestCard(place, index));
    });
}

function displayVisitMessage() {
    const lastVisit = Number(localStorage.getItem(lastVisitKey));
    const today = Date.now();
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    let message = "Welcome! Let us know if you have any questions.";

    if (lastVisit) {
        const daysBetweenVisits = Math.floor((today - lastVisit) / millisecondsInDay);

        if (daysBetweenVisits < 1) {
            message = "Back so soon! Awesome!";
        } else {
            message = `You last visited ${daysBetweenVisits} ${daysBetweenVisits === 1 ? "day" : "days"} ago.`;
        }
    }

    visitMessage.textContent = message;
    localStorage.setItem(lastVisitKey, today);
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

displayInterests();
displayVisitMessage();
