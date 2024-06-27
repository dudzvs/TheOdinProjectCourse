export async function loadApi(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=139064061b23404b8d4120259242606&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return processWeatherData(data);
  } catch (error) {
    console.log('Error fetching the weather data:', error);
  }
}

function processWeatherData(data) {
  return {
    city: data.location.name,
    temperature: {
      celsius: data.current.temp_c,
      fahrenheit: data.current.temp_f,
    },
    condition: {
      text: data.current.condition.text,
      icon: data.current.condition.icon,
    },
  };
}
