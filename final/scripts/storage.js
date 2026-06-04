const preferredServiceKey = "sek-preferred-service";

export function getPreferredService() {
    return localStorage.getItem(preferredServiceKey) || "All Services";
}

export function savePreferredService(serviceCategory) {
    localStorage.setItem(preferredServiceKey, serviceCategory);
}
