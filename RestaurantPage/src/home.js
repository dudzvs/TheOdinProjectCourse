function createHome() {
  const home = document.createElement('div');
  home.classList.add('about');

  const homeImg = document.createElement('div');
  homeImg.classList.add('home-img');

  home.appendChild(createText('h4', 'Quality grilled meat'));
  home.appendChild(createText('p', 'With the best beef'));
  home.appendChild(homeImg);
  home.appendChild(createText('p', 'Order online or visit us!'));

  return home;
}

function createText(type, text) {
  const paragraph = document.createElement(type);
  paragraph.textContent = text;

  return paragraph;
}

function loadHome() {
  const main = document.querySelector('main');
  main.textContent = '';
  main.appendChild(createHome());
}

export default loadHome;
