let professionals = [];
let serviceCategories = [];

const cardsContainer = document.querySelector("#professional-cards");
const serviceFilters = document.querySelector("#service-filters");
const modal = document.querySelector("#professional-modal");
const modalContent = document.querySelector("#modal-content");
const modalClose = document.querySelector("#modal-close");

function createProfessionalCard(professional) {
    const card = document.createElement("article");

    const heading = document.createElement("h3");
    heading.textContent = professional.business;

    const name = document.createElement("p");
    name.textContent = professional.name;

    const summary = document.createElement("p");
    summary.textContent = professional.summary;

    const specialtyList = document.createElement("ul");
    professional.specialties.forEach((specialty) => {
        const item = document.createElement("li");
        item.textContent = specialty;
        specialtyList.appendChild(item);
    });

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.textContent = "View Details";
    detailsButton.addEventListener("click", () => openProfessionalModal(professional));

    card.append(heading, name, summary, specialtyList, detailsButton);
    return card;
}

function openProfessionalModal(professional) {
    modalContent.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = professional.business;

    const name = document.createElement("p");
    name.textContent = professional.name;

    const details = document.createElement("p");
    details.textContent = professional.details;

    const specialtyHeading = document.createElement("h3");
    specialtyHeading.textContent = "Services and Focus";

    const specialtyList = document.createElement("ul");
    professional.specialties.forEach((specialty) => {
        const item = document.createElement("li");
        item.textContent = specialty;
        specialtyList.appendChild(item);
    });

    const link = document.createElement("a");
    link.href = professional.linkUrl;
    link.textContent = professional.linkText;

    modalContent.append(heading, name, details, specialtyHeading, specialtyList, link);
    modal.showModal();
}

function displayProfessionals(professionalData) {
    cardsContainer.innerHTML = "";

    if (professionalData.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No professionals match that service yet.";
        cardsContainer.appendChild(message);
        return;
    }

    professionalData.forEach((professional) => {
        cardsContainer.appendChild(createProfessionalCard(professional));
    });
}

function setActiveFilter(activeButton) {
    const buttons = serviceFilters.querySelectorAll("button");

    buttons.forEach((button) => {
        button.setAttribute("aria-pressed", button === activeButton);
    });
}

function displayServiceFilters() {
    if (!serviceFilters) {
        return;
    }

    const allButton = document.createElement("button");
    allButton.type = "button";
    allButton.textContent = "All Services";
    allButton.setAttribute("aria-pressed", "true");
    allButton.addEventListener("click", () => {
        displayProfessionals(professionals);
        setActiveFilter(allButton);
    });
    serviceFilters.appendChild(allButton);

    serviceCategories.forEach((serviceCategory) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = serviceCategory.category;
        button.setAttribute("aria-pressed", "false");
        button.addEventListener("click", () => {
            const matchingProfessionals = professionals.filter((professional) =>
                professional.specialties.some((specialty) => serviceCategory.services.includes(specialty))
            );

            displayProfessionals(matchingProfessionals);
            setActiveFilter(button);
        });

        serviceFilters.appendChild(button);
    });
}

function displayProfessionalError() {
    cardsContainer.innerHTML = "";

    const message = document.createElement("p");
    message.textContent = "Professional information is not available right now. Please try again later.";
    cardsContainer.appendChild(message);
}

async function getProfessionals() {
    try {
        const [professionalsResponse, servicesResponse] = await Promise.all([
            fetch("data/professionals.json"),
            fetch("data/services.json")
        ]);

        if (!professionalsResponse.ok) {
            throw new Error(`Unable to load professional data: ${professionalsResponse.status}`);
        }

        if (!servicesResponse.ok) {
            throw new Error(`Unable to load service data: ${servicesResponse.status}`);
        }

        professionals = await professionalsResponse.json();
        serviceCategories = await servicesResponse.json();
        displayServiceFilters();
        displayProfessionals(professionals);
    } catch (error) {
        console.error(error);
        displayProfessionalError();
    }
}

if (cardsContainer && modal && modalContent && modalClose) {
    getProfessionals();

    modalClose.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}
