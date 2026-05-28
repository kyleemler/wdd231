const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("nav");
const submittedInfo = document.querySelector("#submitted-info");

const params = new URLSearchParams(window.location.search);
const requiredFields = [
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Email Address", "email"],
    ["Mobile Phone", "phone"],
    ["Business/Organization", "organization"],
    ["Submitted", "timestamp"]
];

menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

function formatTimestamp(timestamp) {
    if (!timestamp) {
        return "Not provided";
    }

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
        return timestamp;
    }

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(date);
}

requiredFields.forEach(([label, key]) => {
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    const value = key === "timestamp" ? formatTimestamp(params.get(key)) : params.get(key);

    term.textContent = label;
    description.textContent = value || "Not provided";
    submittedInfo.append(term, description);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
