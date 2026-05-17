const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");
const directory = document.querySelector("#member-directory");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

const membershipLabels = {
    1: "Member",
    2: "Silver",
    3: "Gold"
};

menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

function setDirectoryView(view) {
    const isGrid = view === "grid";

    directory.classList.toggle("grid-view", isGrid);
    directory.classList.toggle("list-view", !isGrid);
    gridButton.classList.toggle("active", isGrid);
    listButton.classList.toggle("active", !isGrid);
    gridButton.setAttribute("aria-pressed", isGrid);
    listButton.setAttribute("aria-pressed", !isGrid);
}

function createMemberCard(member) {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const websiteLink = member.website ? `<a class="member-link" href="${member.website}" target="_blank" rel="noopener">Visit Website</a>` : "";

    card.innerHTML = `
        <figure class="member-figure">
            <img src="images/${member.image}" alt="Placeholder image for ${member.name}" loading="lazy" width="640" height="360">
            <figcaption>${member.name}</figcaption>
        </figure>
        <div class="member-content">
            <div>
                <h3>${member.name}</h3>
                <p class="member-tagline">${member.description}</p>
            </div>
            <p class="member-address">${member.address}</p>
            <p class="member-phone">${member.phone}</p>
            <span class="membership">${membershipLabels[member.membershipLevel]}</span>
            ${websiteLink}
        </div>
    `;

    return card;
}

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Unable to load members: ${response.status}`);
        }

        const members = await response.json();
        directory.replaceChildren(...members.map(createMemberCard));
    } catch (error) {
        directory.innerHTML = `<p>Business directory information is unavailable right now.</p>`;
        console.error(error);
    }
}

gridButton.addEventListener("click", () => setDirectoryView("grid"));
listButton.addEventListener("click", () => setDirectoryView("list"));

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

getMembers();
