let myLibrary = [];

function book(name, author, page, status){
    this.name = name;
    this.author = author;
    this.page = page + " pages";
    this.read = status;
  }
  
book.prototype.info = function(){
  return this.name + " by " + this.author + ", " + this.page + ", " + (this.read ? "read" : "not read yet");
}

book.prototype.changeReadStatus = function(){
  this.read ? this.read = false : this.read = true;
} 

function addBookToLibrary(){
  let name = document.getElementById('bookTitle').value;
  let author = document.getElementById('bookAuthor').value;
  let page = document.getElementById('bookPages').value;
  let read = document.getElementById('bookAuthor').checked;

  let record = new book(name, author, page, read);
  myLibrary.push(record);

  document.querySelector('.addbook').reset();
  sortData();
  refreshTable();
}

function createBtn(type, index){
  let btn = document.createElement("button")
  btn.id = index;

  if (type == "delete"){
    btn.innerHTML = "Delete"
    btn.setAttribute("onclick", "delBook(event)")
  } else {
    btn.innerHTML = "Read/Unread"
    btn.setAttribute("onclick", "changeStatus(event)")
  }
  return btn;
}

function delBook(e) {
  const bookId = e.currentTarget.id;

  const action = confirm("Are you sure you want to delete " + myLibrary[bookId].name)
  if (action){
    myLibrary.pop(bookId) 
    refreshTable();
  }
}

function changeStatus(e) {
  const bookId = e.currentTarget.id;
  myLibrary[bookId].changeReadStatus();
  refreshTable();
}


let record1 = new book("Harry Potter4", "JKR", 252, true);
myLibrary.push(record1);

let record2 = new book("Harry Potter3", "JKR2", 242, false);
myLibrary.push(record2);

function refreshTable(){
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = "";

  myLibrary.forEach(record => {
    const delBtn = createBtn("delete", myLibrary.indexOf(record));
    const statusBtn = createBtn("change", myLibrary.indexOf(record));

    let row = tableBody.insertRow(-1);
    row.innerHTML = "<td>" + record.name + "</td>" 
                    + "<td>" + record.author + "</td>" 
                    + "<td>" + record.page + "</td>" 
                    + "<td>" + record.read + "</td>";
    row.appendChild(statusBtn);
    row.appendChild(delBtn);     
  })
}

function sortData(){
  myLibrary.sort((book1, book2) =>  (book1.name).localeCompare(book2.name));
}
