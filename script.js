document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const button = document.getElementById("check-btn");
  const displayInfo = document.getElementById("Weather-info");
  const cityName = document.getElementById("city-name");
  const temp = document.getElementById("temperature");
  const desc = document.getElementById("description");
  const errorMsg = document.getElementById("error-msg");
  const API_KEY = "95f4e3387ab72e4b745fe9e672beb09b";
  const loader = document.getElementById('loader')

  button.addEventListener("click", async () => {
    displayInfo.classList.add('hidden')
    errorMsg.classList.add('hidden')
    const city = cityInput.value.trim();
    if (!city) return;
    loader.classList.remove('hidden')
    try {
      const weatherData = await fetchData(city);
      loader.classList.add('hidden')
      displayData(weatherData);
    } catch (error) {
      showError(error);
    }
  });

  async function fetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log("Response", response);
    if (!response.ok) {
      showError();
    }
    const data = await response.json();
    console.log("parsed data", data);
    return data;
  }

  function displayData(data) {
    cityName.textContent = data.name;
    temp.textContent = `Temperature : ${data.main.temp}`;
    desc.textContent = `Weather : ${data.weather[0].description}`;

    displayInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function showError(error) {
    displayInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
