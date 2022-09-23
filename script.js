let myLibrary = [];

class book {
  constructor(name, author, page, status) {
    this.name = name;
    this.author = author;
    this.page = page;
    this.read = status;
  }

  get info() {
    return (
      this.name +
      " by " +
      this.author +
      ", " +
      this.page +
      "pages, " +
      (this.read ? "read" : "not read yet")
    );
  }

  changeReadStatus() {
    this.read ? (this.read = false) : (this.read = true);
  }
}

function addBookToLibrary() {
  let name = document.getElementById("bookTitle");
  let author = document.getElementById("bookAuthor");
  let page = document.getElementById("bookPages");
  let read = document.getElementById("bookRead");
  const msg = "This field is required!";

  if (name.validity.valueMissing) {
    name.setCustomValidity(msg);
    name.reportValidity();
    return;
  }

  if (author.validity.valueMissing) {
    name.setCustomValidity(msg);
    name.reportValidity();
    return;
  }

  if (page.validity.valueMissing) {
    name.setCustomValidity(msg);
    name.reportValidity();
    return;
  }

  document.querySelector(".addbook").reset();
  let record = new book(name, author, page, read);
  myLibrary.push(record);
  sortData();
  refreshTable();
}

function createBtn(type, index) {
  let btn = document.createElement("button");
  btn.id = index;

  if (type == "delete") {
    btn.innerHTML = "Delete";
    btn.setAttribute("onclick", "delBook(event)");
  } else {
    btn.innerHTML = "Read/Unread";
    btn.setAttribute("onclick", "changeStatus(event)");
  }
  return btn;
}

function delBook(e) {
  const bookId = e.currentTarget.id;

  const action = confirm(
    "Are you sure you want to delete " + myLibrary[bookId].name
  );
  if (action) {
    myLibrary.splice(bookId, 1);
    refreshTable();
  }
}

function changeStatus(e) {
  const bookId = e.currentTarget.id;
  myLibrary[bookId].changeReadStatus();
  refreshTable();
}

let record1 = new book(
  "Harry Potter and the Philosopher's Stone",
  "J. K. Rowling",
  223,
  false
);
myLibrary.push(record1);

let record2 = new book(
  "Harry Potter and the Chamber of Secrets",
  "J. K. Rowling",
  251,
  false
);
myLibrary.push(record2);

let record3 = new book(
  "Harry Potter and the Prisoner of Azkaban",
  "J. K. Rowling",
  317,
  false
);
myLibrary.push(record3);

function refreshTable() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  myLibrary.forEach((record) => {
    const delBtn = createBtn("delete", myLibrary.indexOf(record));
    const statusBtn = createBtn("change", myLibrary.indexOf(record));
    let bookStatus = false;

    if (record.read) {
      bookStatus = "Yes";
    } else {
      bookStatus = "No";
    }

    let row = tableBody.insertRow(-1);
    row.innerHTML =
      "<td>" +
      record.name +
      "</td>" +
      "<td>" +
      record.author +
      "</td>" +
      "<td>" +
      record.page +
      "</td>" +
      "<td>" +
      bookStatus +
      "</td>";
    row.insertCell(-1).append(statusBtn);
    row.insertCell(-1).append(delBtn);
  });
}

function sortData() {
  myLibrary.sort((book1, book2) => book1.name.localeCompare(book2.name));
}

//add form validation
const pageNum = document.getElementById("bookPages");

pageNum.addEventListener("input", () => {
  if (!Number.isInteger(+pageNum.value)) {
    pageNum.setCustomValidity("An Integer is expected!");
    pageNum.reportValidity();
  } else {
    pageNum.setCustomValidity("");
  }
});

refreshTable();
