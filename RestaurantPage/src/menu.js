import costelaImg from './asset/costela.jpg';
import Skewer from './asset/menuimg2.jpg';

function createMenu() {
  const menu = document.createElement('div');
  menu.classList.add('menu');

  menu.appendChild(
    createMenuItem('Pork Plates', 'Carne,Cebola,Tempero especial', costelaImg)
  );
  menu.appendChild(
    createMenuItem('Some Name', 'Lorem Ipsum is simply text', Skewer)
  );
  menu.appendChild(
    createMenuItem('Some Name', 'Lorem Ipsum is not simply', Skewer)
  );
  menu.appendChild(
    createMenuItem('Some Name', 'There are many variations', Skewer)
  );

  return menu;
}

function createMenuItem(name, description, imageUrl) {
  const menuItem = document.createElement('div');
  menuItem.classList.add('menu-content');

  const foodName = document.createElement('h3');
  foodName.textContent = name;

  const foodDescription = document.createElement('p');
  foodDescription.textContent = description;

  const foodImg = document.createElement('div');
  foodImg.style.backgroundImage = `url(${imageUrl})`;
  foodImg.classList.add('menu-img');

  menuItem.appendChild(foodImg);
  foodImg.appendChild(foodName);
  menuItem.appendChild(foodDescription);

  return menuItem;
}

function loadMenu() {
  const main = document.querySelector('main');
  main.textContent = '';
  main.appendChild(createMenu());
}

export default loadMenu;
