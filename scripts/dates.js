// Handle dynamic dates in footer
document.addEventListener('DOMContentLoaded', function () {
    // Set current year in copyright
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.innerHTML = `Last modified: ${document.lastModified}`;
    }
});
