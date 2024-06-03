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
  homeBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('active')) return;
    setActiveBtn(homeBtn);
  });

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

function setActiveBtn(button) {
  const buttons = document.querySelectorAll('.btn-nav');

  buttons.forEach((btn) => {
    if (btn !== button) {
      btn.classList.remove('active');
    }
  });

  button.classList.add('active');
}

function initializeSite() {
  const content = document.getElementById('content');

  content.appendChild(createHeader());
}

export default initializeSite;
