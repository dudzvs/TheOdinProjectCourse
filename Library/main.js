class Book {
  constructor(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.bookshell = document.querySelector(".bookshell");
    this.modal = document.querySelector(".modal");
    this.bookForm = document.querySelector("form");

    document.getElementById("open-modal").addEventListener("click", () => {
      this.modal.classList.remove("hidden");
    });

    this.bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addBookToLibrary();
      this.displayBooks();
      this.modal.classList.add("hidden");
    });
  }

  addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("IsRead").checked;

    const newBook = new Book(title, author, pages, isRead);
    this.books.push(newBook);
  }

  displayBooks() {
    this.bookshell.innerHTML = "";

    this.books.forEach((book, i) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");

      const removeBtnElement = document.createElement("div");
      removeBtnElement.classList.add("remove-book");
      removeBtnElement.innerHTML = '<img src="./remove.svg" alt="Remove Book">';
      removeBtnElement.addEventListener("click", () => {
        this.books.splice(i, 1); // Remove the book from the array
        this.displayBooks(); // Refresh the display
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
      this.bookshell.appendChild(bookElement);
      bookElement.appendChild(removeBtnElement);
      bookElement.appendChild(bookDetailsElement);
      bookElement.appendChild(readButton);
    });
  }
}

const myLibrary = new Library();
