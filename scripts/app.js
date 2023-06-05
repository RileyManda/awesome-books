import { getBooksFromStorage, saveBooksToStorage } from './storage.js';
const dataSaved = getBooksFromStorage();
const bookContainer = document.querySelector('.books-container');
const form = document.querySelector('form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
let booksCollection = [];
if (dataSaved) {
  booksCollection = dataSaved;
} else {
  booksCollection = [];
}
function addBookElementsToContainer() {
  bookContainer.innerHTML = '';
  const bookElements = booksCollection.map((book) => {
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
      const parentBookElement = removeButton.closest('.book');
      if (parentBookElement) {
        bookContainer.removeChild(parentBookElement);
        const bookIndex = booksCollection.indexOf(book);
        if (bookIndex !== -1) {
          booksCollection.splice(bookIndex, 1);
          saveBooksToStorage(booksCollection);
        }
      }
    });
    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(removeButton);
    return bookElement;
  });
  bookElements.forEach((bookElement) => {
    bookContainer.appendChild(bookElement);
  });
}
addBookElementsToContainer();
document.addEventListener('DOMContentLoaded', addBookElementsToContainer);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  if (title && author) {
    const newBook = { title, author };
    booksCollection.push(newBook);
    saveBooksToStorage(booksCollection);
    addBookElementsToContainer();
    titleInput.value = '';
    authorInput.value = '';
  }
});
const storedBooks = getBooksFromStorage();