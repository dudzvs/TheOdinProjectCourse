const myLibrary = [];
const btnOpenModal = document.getElementById("open-modal");
const bookForm = document.querySelector("form");
const modal = document.querySelector(".modal");

btnOpenModal.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  displayBooks();
  modal.classList.add("hidden");
  console.log(myLibrary);
});

// Book constructor
function Book(title, author, pages, isRead = "false") {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  // Get the input values from the form
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("IsRead").checked;

  const newBook = new Book(title, author, pages, isRead);
  console.log(isRead);
  myLibrary.push(newBook);
}

function displayBooks() {
  const bookshell = document.querySelector(".bookshell");
  bookshell.innerHTML = "";

  myLibrary.forEach((book, i) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    const removeBtnElement = document.createElement("div");
    removeBtnElement.classList.add("remove-book");
    removeBtnElement.innerHTML = '<img src="./remove.svg" alt="Remove Book">';
    removeBtnElement.addEventListener("click", () => {
      myLibrary.splice(i, 1); // Remove the book from the array
      displayBooks(); // Refresh the display
    });

    const bookDetailsElement = document.createElement("div");
    bookDetailsElement.classList.add("info");

    bookDetailsElement.innerHTML = `
    <h3>${book.title}</h3>
    <p><i>Author:</i> <span>${book.author}</span></p>
    <p><i>Pages:</i> <span>${book.pages}</span></p>
    `;

    const readButton = document.createElement("button");
    readButton.classList.add(book.isRead ? "read" : "not-read");
    readButton.textContent = book.isRead ? "Read" : "Unread"; // Toggle text based on isRead
    readButton.addEventListener("click", () => {
      book.isRead = !book.isRead; // Toggle the isRead property
      readButton.classList.toggle("read"); // Toggle button class
      readButton.textContent = book.isRead ? "Read" : "Unread"; // Update button text
    });
    bookshell.appendChild(bookElement);
    bookElement.appendChild(removeBtnElement);
    bookElement.appendChild(bookDetailsElement);
    bookElement.appendChild(readButton);
  });
}
