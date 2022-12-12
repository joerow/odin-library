let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

/* Book.prototype.info = function () {
  return (
    this.title +
    ", " +
    this.author +
    ", number of pages: " +
    this.pages +
    ", " +
    this.read
  );
}; */

function addToLibrary(book) {
  myLibrary.push(book);
}

function checkLibrary(book) {
  if (myLibrary.includes(book)) {
    return;
  } else {
    console.log(book.title + " is not in the library");
    return;
  }
}

function createBookCard(book) {
  // create book card
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.id = book.title;
  bookCard.dataset.index = myLibrary.length - 1;
  bookCard.innerHTML =
    '<button onclick="removeFromLibrary(this.parentNode.dataset.index);removeParents(this);" id="delete"> &times</button>';
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

  //add toggle label to card
  const bookCardToggleLabel = document.createElement("label");
  bookCardToggleLabel.className = "switch";
  bookCardToggleLabel.id = book.title + " toggle";
  document.getElementById(book.title).appendChild(bookCardToggleLabel);

  //add span into input
  if (book.read === true) {
    bookCardToggleLabel.innerHTML =
      '<input type="checkbox" onclick="toggleRead(this.parentNode.parentNode.dataset.index);" checked><span class="slider round"></span>';
  } else {
    bookCardToggleLabel.innerHTML =
      '<input type="checkbox" onclick="toggleRead(this.parentNode.parentNode.dataset.index);"><span class="slider round"></span>';
  }
}

const newSubmit = document.querySelector("#newSubmit");
newSubmit.onclick = function () {
  newTitle = document.querySelector("#newTitle");
  newAuthor = document.querySelector("#newAuthor");
  newPages = document.querySelector("#newPages");
  newRead = document.querySelector("#newRead").checked;
  newBook = newTitle.value;
  newBook = new Book(newTitle.value, newAuthor.value, newPages.value, newRead);
  console.log(newBook);
  addToLibrary(newBook);
  createBookCard(newBook);
  document.getElementById("id01").style.display = "none";
};

function removeParents(e) {
  var root = e.parentNode;
  root.parentNode.removeChild(root);
  console.log(root);
}

function removeFromLibrary(index) {
  if (index > -1) {
    // only splice array when item is found
    myLibrary.splice(index, 1);
  } else {
    // remove the last item
    myLibrary.pop();
  }
}

function toggleRead(index) {
  console.log(index);
  let book = myLibrary[index];

  //invert the read status
  myLibrary[index].read = !myLibrary[index].read;

  //update the card text
  document.getElementById(book.title).childNodes[4].innerText =
    "Has been read: " + book.read;
}

//add default data
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
const aBHOT = new Book("A brief history of time", "Stephen Hawking", 256, true);
addToLibrary(theHobbit);
createBookCard(theHobbit);
addToLibrary(aBHOT);
createBookCard(aBHOT);
