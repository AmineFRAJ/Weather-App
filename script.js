async function fetchWeather() {
  const weatherLocation = document.getElementById("location").value;
  const apiKey = "80beb300ae8057e9ba0dbc91e4857f89";
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${weatherLocation}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Location not found");
      } else if (response.status === 401) {
        throw new Error("Invalid API KEY");
      } else {
        throw new Error("Unable to fetch weather data");
      }
    }
    const data = await response.json();
    console.log(data);
    updateWeather(data);
  } catch (error) {
    alert(error);
  }
}

function updateWeather(data) {
  const city = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  document.getElementById(
    "icon"
  ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById("city").innerHTML = `Weather in ${city}`;
  document.getElementById(
    "temperature"
  ).innerHTML = `Temperature: ${temperature}°C`;
  document.getElementById(
    "description"
  ).innerHTML = `Description:${description}`;

  document.getElementById("weather").style.display = "block";
}
