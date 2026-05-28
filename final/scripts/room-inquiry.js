const submittedInfo = document.querySelector("#submitted-info");
const params = new URLSearchParams(window.location.search);

const submittedFields = [
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Email Address", "email"],
    ["Phone Number", "phone"],
    ["Business Name", "businessName"],
    ["Primary Service Type", "serviceType"],
    ["Years of Experience", "experience"],
    ["Desired Start Date", "startDate"],
    ["Services", "message"],
    ["Submitted", "timestamp"]
];

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

submittedFields.forEach(([label, key]) => {
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    const value = key === "timestamp" ? formatTimestamp(params.get(key)) : params.get(key);

    term.textContent = label;
    description.textContent = value || "Not provided";
    submittedInfo.append(term, description);
});
