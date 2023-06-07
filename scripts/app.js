// Importing functions from './storage.js'
import { getBooksFromStorage, saveBooksToStorage } from './storage.js';

class BookCollection {
  constructor() {
    this.books = [];
    this.nextBookId = 1;
  }

  // Add book method
  addBook(title, author) {
    const newBook = { id: this.nextBookId, title, author };
    this.books.push(newBook);
    this.nextBookId += 1;
  }

  // Save data to the local storage
  saveData() {
    document.addEventListener('DOMContentLoaded', () => {
      this.books = getBooksFromStorage() || [];
      this.nextBookId = this.books.length > 0
        ? Math.max(...this.books.map((book) => book.id)) + 1
        : 1;
      this.displayBooks();
    });
  }

  // Remove book method
  removeBook(bookID) {
    this.books = this.books.filter((book) => book.id !== bookID);
  }

  // Display books method
  displayBooks() {
    const bookContainer = document.querySelector('.books-container');
    bookContainer.innerHTML = '';
    this.books.forEach((book) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');
      const bookItemElement = document.createElement('div');
      bookItemElement.classList.add('book-item');
      const titleElement = document.createElement('p');
      titleElement.classList.add('book-title');
      titleElement.textContent = book.title;
      const authorElement = document.createElement('p');
      authorElement.classList.add('book-author');
      authorElement.textContent = book.author;
      const removeButton = document.createElement('button');
      removeButton.classList.add('btn', 'remove');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(book.id);
        saveBooksToStorage(this.books);
        this.displayBooks();
      });

      bookItemElement.appendChild(titleElement);
      bookItemElement.appendChild(authorElement);

      bookElement.appendChild(bookItemElement);
      bookElement.appendChild(removeButton);

      bookContainer.appendChild(bookElement);
    });
  }
}

const newBook = new BookCollection();
newBook.saveData();

// Event listener for the form submission
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  // Preventing the default form submission behavior
  event.preventDefault();

  // Retrieving the title and author input elements
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  // Extracting the values of the title and author inputs
  const title = titleInput.value;
  const author = authorInput.value;

  // Checking if both title and author have values
  if (title && author) {
    newBook.addBook(title, author);
    saveBooksToStorage(newBook.books);
    newBook.displayBooks();

    // Resetting the title and author input fields
    titleInput.value = '';
    authorInput.value = '';
  }
});

// decare variable to store menulinks
const menulinks = document.querySelectorAll('.row-list li a');
// section navigation
menulinks.forEach((menulink) => {
  menulink.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionId = menulink.dataset.section;
    const sections = document.querySelectorAll('.section-container');

    sections.forEach((section) => {
      section.classList.remove('active');
    });
    menulinks.forEach((link) => {
      link.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    menulink.classList.add('active');
  });
});
