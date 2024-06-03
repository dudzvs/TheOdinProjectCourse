function createHeader() {
  const header = document.createElement('header');
  const restaurantName = document.createElement('h1');
  restaurantName.textContent = 'Grillus Food';

  header.appendChild(restaurantName);
  header.appendChild(createNav());

  return header;
}

function createNav() {
  const nav = document.createElement('nav');

  const homeBtn = document.createElement('button');
  homeBtn.classList.add('btn-nav');
  homeBtn.textContent = 'Home';

  const menuBtn = document.createElement('button');
  menuBtn.classList.add('btn-nav');
  menuBtn.textContent = 'Menu';

  const contactBtn = document.createElement('button');
  contactBtn.classList.add('btn-nav');
  contactBtn.textContent = 'Contact';

  nav.appendChild(homeBtn);
  nav.appendChild(menuBtn);
  nav.appendChild(contactBtn);

  return nav;
}

function initializeSite() {
  const content = document.getElementById('content');

  content.appendChild(createHeader());
}

export default initializeSite;
