import { getBooksFromStorage } from './storage.js';

const dataSaved = JSON.parse(localStorage.getItem('books'));
const bookContainer = document.querySelector('.books-container');

let booksCollection = [];

if (dataSaved) {
  booksCollection = dataSaved;
} else {
  booksCollection = [
  ];
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
          localStorage.setItem('books', JSON.stringify(booksCollection));
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

const storedBooks = getBooksFromStorage();
console.log('Stored Books:', storedBooks);
