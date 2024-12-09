const apiKey = "69ccfe1d12b8a0221a94f6ceeda5c22e"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherDetails = document.getElementById("weather-details");
const errorMessage = document.getElementById("error-message");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
async function getWeather(city) {
  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}
function displayWeather(data) {
  errorMessage.classList.add("hidden");
  weatherDetails.classList.remove("hidden");

  cityName.textContent = `Weather in ${data.name}, ${data.sys.country}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  weatherDescription.textContent = `Condition: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Function to show error message
function showError(message) {
  weatherDetails.classList.add("hidden");
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});
