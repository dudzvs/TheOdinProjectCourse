function createContact() {
  const contact = document.createElement('div');
  contact.classList.add('contact');

  const contactImg = document.createElement('div');
  contactImg.classList.add('contact-img');

  contact.appendChild(createContactParagraph('Call us: 777 777 777'));
  contact.appendChild(
    createContactParagraph('Hollywood Boulevard 42, Los Angeles, USA')
  );
  contact.appendChild(contactImg);

  return contact;
}

function createContactParagraph(text) {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;

  return paragraph;
}

function loadContact() {
  const main = document.querySelector('main');
  main.textContent = '';
  main.appendChild(createContact());
}

export default loadContact;
