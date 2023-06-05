const storageKey = 'books';

export function getBooksFromStorage() {
  const books = JSON.parse(localStorage.getItem(storageKey));
  return books || [];
}

export function saveBooksToStorage(books) {
  localStorage.setItem(storageKey, JSON.stringify(books));
}

// Retrieve books from local storage
const storedBooks = getBooksFromStorage();
console.log('Stored Books:', storedBooks);
