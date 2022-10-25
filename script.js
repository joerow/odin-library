let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return (
    this.title +
    ", " +
    this.author +
    ", number of pages: " +
    this.pages +
    ", " +
    this.read
  );
};

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);

const aBHOT = new Book("A brief history of time", "Stephen Hawking", 256, true);

function addToLibrary(book) {
  myLibrary.push(book);
}

addToLibrary(theHobbit);
addToLibrary(aBHOT);

function checkLibrary(book) {
  if (myLibrary.includes(book)) {
    return;
  } else {
    console.log(book.title + " is not in the library");
    return;
  }
}

checkLibrary(theHobbit);
checkLibrary(aBHOT);

function createBookCard(book) {
  // create book card
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.id = book.title;
  bookCard.innerHTML =
    '<button onclick="removeParents(this);">Delete Book</button>';
  document.getElementById("bookshelf").appendChild(bookCard);

  // add book title to card
  const bookCardTitle = document.createElement("div");
  bookCardTitle.className = "bookcard-title";
  bookCardTitle.innerText = "Title: " + book.title;
  document.getElementById(book.title).appendChild(bookCardTitle);

  // add book author to card
  const bookCardAuthor = document.createElement("div");
  bookCardAuthor.className = "bookcard-author";
  bookCardAuthor.innerText = "Author: " + book.author;
  document.getElementById(book.title).appendChild(bookCardAuthor);

  // add book pages to card
  const bookCardPages = document.createElement("div");
  bookCardPages.className = "bookcard-pages";
  bookCardPages.innerText = "Pages: " + book.pages;
  document.getElementById(book.title).appendChild(bookCardPages);

  // add book read status to card
  const bookCardRead = document.createElement("div");
  bookCardRead.className = "bookcard-read";
  bookCardRead.innerText = "Has been read: " + book.read;
  document.getElementById(book.title).appendChild(bookCardRead);
}

myLibrary.forEach((element) => {
  createBookCard(element);
});

const newSubmit = document.querySelector("#newSubmit");
newSubmit.onclick = function () {
  newTitle = document.querySelector("#newTitle");
  newAuthor = document.querySelector("#newAuthor");
  newPages = document.querySelector("#newPages");
  newRead = document.querySelector("#newRead");
  newBook = newTitle.value;
  newBook = new Book(
    newTitle.value,
    newAuthor.value,
    newPages.value,
    newRead.value
  );
  console.log(newBook);
  addToLibrary(newBook);
  createBookCard(newBook);
};

function removeParents(e) {
  var root = e.parentNode;
  root.parentNode.removeChild(root);
  console.log(root);
}
