const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("nav");
const currentWeather = document.querySelector("#current-weather");
const forecast = document.querySelector("#forecast");
const spotlights = document.querySelector("#spotlights");

const openWeatherApiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const brokenArrow = {
    lat: 36.0609,
    lon: -95.7975
};

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

function titleCase(text) {
    return text
        .split(" ")
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(" ");
}

function formatForecastDate(dateText) {
    const date = new Date(`${dateText}T12:00:00`);
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
    }).format(date);
}

async function getWeather() {
    if (openWeatherApiKey === "YOUR_OPENWEATHERMAP_API_KEY") {
        currentWeather.innerHTML = "<p>Add your OpenWeatherMap API key in scripts/index.js to show live weather.</p>";
        forecast.innerHTML = "";
        return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${brokenArrow.lat}&lon=${brokenArrow.lon}&units=imperial&appid=${openWeatherApiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${brokenArrow.lat}&lon=${brokenArrow.lon}&units=imperial&appid=${openWeatherApiKey}`;

    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data is unavailable.");
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        const description = titleCase(weatherData.weather[0].description);

        currentWeather.innerHTML = `
            <p class="weather-temp">${Math.round(weatherData.main.temp)}&deg;F</p>
            <p>${description}</p>
        `;

        const dailyForecasts = forecastData.list
            .filter((item) => item.dt_txt.includes("12:00:00"))
            .slice(0, 3);

        forecast.innerHTML = dailyForecasts
            .map((day) => `
                <article class="forecast-day">
                    <h4>${formatForecastDate(day.dt_txt.split(" ")[0])}</h4>
                    <p>${Math.round(day.main.temp)}&deg;F</p>
                </article>
            `)
            .join("");
    } catch (error) {
        currentWeather.innerHTML = "<p>Weather information is unavailable right now.</p>";
        forecast.innerHTML = "";
        console.error(error);
    }
}

function shuffleMembers(members) {
    return [...members].sort(() => Math.random() - 0.5);
}

function createSpotlightCard(member) {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" loading="lazy" width="320" height="180">
        <div class="spotlight-content">
            <span class="membership">${membershipLabels[member.membershipLevel]}</span>
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a class="member-link" href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        </div>
    `;

    return card;
}

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Unable to load members: ${response.status}`);
        }

        const members = await response.json();
        const premiumMembers = members.filter((member) => member.membershipLevel > 1);
        const selectedMembers = shuffleMembers(premiumMembers).slice(0, 3);

        spotlights.innerHTML = "";
        selectedMembers.forEach((member) => {
            spotlights.appendChild(createSpotlightCard(member));
        });
    } catch (error) {
        spotlights.innerHTML = "<p>Member spotlights are unavailable right now.</p>";
        console.error(error);
    }
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

getWeather();
getSpotlights();
