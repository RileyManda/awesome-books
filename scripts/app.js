import { saveBooksToStorage } from './storage.js';

const dataSaved = JSON.parse(localStorage.getItem('books'));
// Get the books container
const bookContainer = document.querySelector('.books-container');

// Retrieve books from local storage or use the default collection
let booksCollection = [];
if (booksCollection.length === 0) {
  booksCollection = [
    {
      title: 'JavaScript The Good Parts',
      author: 'David Flanagan',
    },
    {
      title: 'Beginning JavaScript',
      author: 'Paul Wilton et all',
    },
    {
      title: 'JavaScript and jQuery',
      author: 'Jon Duckett',
    },
    {
      title: 'JavaScript and jQuery3',
      author: 'Jon Duckett3',
    },
    {
      title: 'JavaScript and jQuery3',
      author: 'Jon Duckett3',
    },
    {
      title: 'Test',
      author: 'Jon Duckett3',
    },
  ];
} else {
  booksCollection = [];
  booksCollection.push(dataSaved);
}

// Function to add book elements to the container
function addBookElementsToContainer() {
  bookContainer.innerHTML = ''; // Clear the container

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
      // Traverse up the DOM to find the parent book element
      const parentBookElement = removeButton.closest('.book');
      if (parentBookElement) {
        bookContainer.removeChild(parentBookElement);

        // Remove the book from the collection
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

// Call the function to add the book elements to the container
addBookElementsToContainer();

document.addEventListener('DOMContentLoaded', addBookElementsToContainer);

// Retrieve books from local storage
// const storedBooks = getBooksFromStorage();
// console.log('Stored Books:', storedBooks);
