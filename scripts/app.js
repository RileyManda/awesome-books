// Importing functions from './storage.js'
import { getBooksFromStorage, saveBooksToStorage } from './storage.js';

// Initializing variables
let books = [];
let nextBookId = 1;

// Function to add a new book to the collection
const addBook = (title, author) => {
  // Creating a new book object with an ID and the provided title and author
  const newBook = { id: nextBookId, title, author };

  // Adding the new book to the collection
  books.push(newBook);

  // Incrementing the next book ID for the next book to be added
  nextBookId += 1;
};

// Function to remove a book from the collection based on its ID
const removeBook = (bookID) => {
  // Filtering out the book with the specified ID from the collection
  books = books.filter((book) => book.id !== bookID);
};

// Function to display the books in the book container
const displayBooks = () => {
  // Selecting the book container element
  const bookContainer = document.querySelector('.books-container');

  // Clearing the existing content of the book container
  bookContainer.innerHTML = '';

  // Looping through each book in the collection
  books.forEach((book) => {
    // Creating a new book element
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    // Creating a title element for the book
    const titleElement = document.createElement('p');
    titleElement.classList.add('book-title');
    titleElement.textContent = book.title;

    // Creating an author element for the book
    const authorElement = document.createElement('p');
    authorElement.classList.add('book-author');
    authorElement.textContent = book.author;

    // Creating a remove button for the book
    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'remove');
    removeButton.textContent = 'Remove';

    // Adding a click event listener to the remove button
    removeButton.addEventListener('click', () => {
      // Removing the book from the collection and saving changes to to storage
      removeBook(book.id);
      saveBooksToStorage(books);

      // Redisplaying the updated list of books
      displayBooks();
    });

    // Creating a horizontal divider element
    const hrElement = document.createElement('hr');
    hrElement.classList.add('divider');

    // Appending the elements to the book element
    bookElement.appendChild(hrElement);
    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(removeButton);
    bookElement.appendChild(hrElement);

    // Appending the book element to the book container
    bookContainer.appendChild(bookElement);
  });
};

// Event listener for the 'DOMContentLoaded' event
document.addEventListener('DOMContentLoaded', () => {
  // Retrieving books from storage or initializing an empty array
  books = getBooksFromStorage() || [];

  // Determining the next book ID based on the existing books
  nextBookId = books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;

  // Displaying the books in the book container
  displayBooks();
});

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
    // Adding the book to the collection, saving it to storage, and displaying the updated books
    addBook(title, author);
    saveBooksToStorage(books);
    displayBooks();

    // Resetting the title and author input fields
    titleInput.value = '';
    authorInput.value = '';
  }
});
