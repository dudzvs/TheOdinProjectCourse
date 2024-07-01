import '../style.css';
import { loadApi } from './api';
import { updateWeatherInfo } from './view';

const form = document.querySelector('form');
const inputSearch = document.querySelector('input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchResultElement = document.querySelector('.search-result');
  const city = inputSearch.value;

  if (city) {
    const weatherData = await loadApi(city);

    if (weatherData) {
      updateWeatherInfo(weatherData);
      searchResultElement.classList.add('active');
    }
  }
});
