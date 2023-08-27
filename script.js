let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

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

const form = document.querySelector("form");

const newTitle = document.getElementById("newTitle");
const newTitleError = document.querySelector("#newTitle + span.error");
newTitle.addEventListener("input", (event) => {
  // Each time the user types something, we check if the
  // form fields are valid.
  if (newTitle.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    newTitleError.textContent = ""; // Reset the content of the message
    newTitleError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError("title");
  }
});

const newAuthor = document.getElementById("newAuthor");
const newAuthorError = document.querySelector("#newAuthor + span.error");
newAuthor.addEventListener("input", (event) => {
  if (newAuthor.validity.valid) {
    newAuthorError.textContent = "";
    newAuthorError.className = "error";
  } else {
    showError("author");
  }
});

const newPages = document.getElementById("newPages");
const newPagesError = document.querySelector("#newPages + span.error");
newPages.addEventListener("input", (event) => {
  if (newPages.validity.valid) {
    newPagesError.textContent = "";
    newPagesError.className = "error";
  } else {
    showError("pages");
  }
});

function showError(error) {
  if (error == "title") {
    if (newTitle.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      newTitleError.textContent = "You need to enter a title";
    } else if (newTitle.validity.tooShort) {
      // If the data is too short,
      // display the following error message.
      newTitleError.textContent = `Title should be at least ${title.minLength} characters; you entered ${email.value.length}.`;
    }
    // Set the styling appropriately
    newTitleError.className = "error active";
  }
  if (error == "author") {
    if (newAuthor.validity.valueMissing) {
      newAuthorError.textContent = "You need to enter an author";
    } else if (newAuthor.validity.tooShort) {
      newAuthorError.textContent = `Author should be at least ${newAuthor.minLength} characters; you entered ${newAuthor.value.length}.`;
    }
    newAuthorError.className = "error active";
  }
  if (error == "pages") {
    if (newPages.validity.valueMissing) {
      newPagesError.textContent = "You need to enter the number of pages";
    } else if (newPages.validity.rangeUnderflow) {
      newPagesError.textContent = `Number of pages should be at least ${newPages.min}; you entered ${newPages.value}.`;
    }
    newPagesError.className = "error active";
  }
}
const newSubmit = document.querySelector("#newSubmit");
form.addEventListener("submit", (event) => {
  if (!newTitle.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  } else {
    newRead = document.querySelector("#newRead").checked;
    newBook = newTitle.value;
    newBook = new Book(
      newTitle.value,
      newAuthor.value,
      newPages.value,
      newRead
    );
    addToLibrary(newBook);
    createBookCard(newBook);
    event.preventDefault();
    document.getElementById("newBookModal").style.display = "none";
    newTitle.value = "";
    newAuthor.value = "";
    newPages.value = null;
    newRead = null;
  }
});

const author = document.getElementById("newAuthor");
const authorError = document.getElementById("#newAuthor + span.error");

const pages = document.getElementById("newPages");
const pagesError = document.getElementById("#newPages + span.error");
