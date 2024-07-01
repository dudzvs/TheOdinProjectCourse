export function updateWeatherInfo(data) {
  document.getElementById('cityName').textContent = data.city;
  document.getElementById('conditionText').textContent = data.condition.text;
  document.getElementById(
    'temperature'
  ).textContent = `Temperature: ${data.temperature.celsius}°C / ${data.temperature.fahrenheit}°F`;
  document.getElementById(
    'feelsLike'
  ).textContent = `Feels Like: ${data.temperature.fellsLike}°C`;
  document.getElementById(
    'humidity'
  ).textContent = `Humidity: ${data.humidity}%`;
  document.getElementById(
    'weatherIco'
  ).innerHTML = `<img src="${data.condition.icon}" alt="Weather icon">`;
}
