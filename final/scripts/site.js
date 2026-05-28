const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}
