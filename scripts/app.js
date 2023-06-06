import { getBooksFromStorage, saveBooksToStorage } from './storage.js';
// import { getBooksFromStorage, saveBooksToStorage } from './storage.js';

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

  // removeBook(bookID) {
  //   books = books.filter((book) => book.id !== bookID);
  // }

  displayBooks() {
    const bookContainer = document.querySelector('.books-container');
    bookContainer.innerHTML = '';
    this.books.forEach((book) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');
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
        // removeBook(book.id);
        saveBooksToStorage(this.books);
        // displayBooks();
      });
      const hrElement = document.createElement('hr');
      hrElement.classList.add('divider');
      bookElement.appendChild(hrElement);
      bookElement.appendChild(titleElement);
      bookElement.appendChild(authorElement);
      bookElement.appendChild(removeButton);
      bookElement.appendChild(hrElement);
      bookContainer.appendChild(bookElement);
    });
  }

  saveData = document.addEventListener('DOMContentLoaded', () => {
    this.books = getBooksFromStorage() || [];
    this.nextBookId = this.books.length > 0
      ? Math.max(...this.books.map((book) => book.id)) + 1 : 1;
    // displayBooks();
  });
}
const newBook = new BookCollection();
newBook.addBook('Book2', 'Author2')
console.log('our books', newBook);
newBook.displayBooks();
newBook.saveData();
// let books = [];
// let nextBookId = 1;
// const removeBook = (bookID) => {
//   books = books.filter((book) => book.id !== bookID);
// };

// const form = document.querySelector('form');
// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const titleInput = document.getElementById('title');
//   const authorInput = document.getElementById('author');
//   const title = titleInput.value;
//   const author = authorInput.value;

//   if (title && author) {
//     addBook(title, author);
//     saveBooksToStorage(books);
//     displayBooks();

//     titleInput.value = '';
//     authorInput.value = '';
//   }
// });
