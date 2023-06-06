import { getBooksFromStorage, saveBooksToStorage } from './storage.js';
// import { getBooksFromStorage, saveBooksToStorage } from './storage.js';

class BookCollection {
  constructor() {
    // Retrieve books from localStorage or initialize an empty array
    this.books = saveBooksToStorage(this.books) || [];
    this.nextBookId = 1;
    
  }

  // Method to add a book from the collection
  addBook(title, author) {
    const newBook = { 
      id: this.nextBookId, 
      title, 
      author 
    };

    this.books.push(newBook);
    this.nextBookId += 1;

    // Save the updated collection to localStorage
    saveBooksToStorage(this.books);
  }

  // Method to remove a book from the collection
  removeBook(bookID) {
    // Remove the book at the specified index from the collection
    this.books = this.books.filter((book) => book.id !== bookID);

    // Save the updated collection to localStorage
    saveBooksToStorage(bookID);
  }

// Display books method
displayBooks() {
  const bookContainer = document.querySelector('.books-container');
  bookContainer.innerHTML = '';
  this.books.forEach((book, index) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    const titleElement = document.createElement('p');
    titleElement.classList.add('book-title');
    titleElement.textContent = book.title;
    const authorElement = document.createElement('p');
    authorElement.classList.add('book-author');
    authorElement.textContent = book.author;

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'remove');
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('data-book-index', index);
    removeButton.addEventListener('click', () => {
      this.removeBook(book.id);
      saveBooksToStorage(this.books);
      this.displayBooks();
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
}

const newBook = new BookCollection();
newBook.addBook('Book3', 'Author3');
console.log('our books', newBook);
newBook.displayBooks();

/* const newBook2 = new BookCollection();
newBook2.addBook('Book4', 'Author4');
console.log('our books', newBook2);
newBook2.displayBooks(); */

// Save data to the local storage
  /* saveData() {
    document.addEventListener('DOMContentLoaded', () => {
    this.books = getBooksFromStorage() || [];
    this.nextBookId = this.books.length > 0
      ? Math.max(...this.books.map((book) => book.id)) + 1
      : 1;
    this.displayBooks();
  });
} */

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
