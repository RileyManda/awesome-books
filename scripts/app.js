// empty j file for awesome books scripts
const booksCollection = [
  {
    title: 'JavaScript The Good Parts',
    author: 'David Flanagan ',
  },
  {
    title: 'Beginning JavaScript',
    author: 'Paul Wilton et all ',
  },
  {
    title: 'JavaScript and jQuery',
    author: 'Jon Duckett',
  },
];


// Get the books container
const bookContainer = document.querySelector('.books-container');

// Function to display book
const bookElements = booksCollection.map((book) => {
  const bookElement = document.createElement('div');
  bookElement.classList.add('book');

  const titleElement = document.createElement("p");
  titleElement.classList.add("book-title");
  titleElement.textContent = book.title;

  const authorElement = document.createElement("p");
  authorElement.classList.add("book-author");
  authorElement.textContent = book.author;
  
  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "remove");
  removeButton.textContent = "Remove";

  bookContainer.appendChild(titleElement);
  bookContainer.appendChild(authorElement);
  bookContainer.appendChild(removeButton);

  return bookElement;
});

bookElements.forEach((bookElement) => {
  bookContainer.appendChild(bookElement);
});