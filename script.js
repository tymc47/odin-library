let myLibrary = [];
const table = document.querySelector('.library');

function book(name, writer, page, status){
    this.name = name;
    this.writer = writer;
    this.page = page + " pages";
    this.read = status;
    this.info = function() {
        return this.name + " by " + this.writer + ", " + this.page + ", " + (this.read ? "read" : "not read yet");
    }
}



function addBookToLibrary(){
  let name = prompt("Enter Name of the book:")
  let writer = prompt("Enter writer of the book")
  let page = prompt("Enter number of pages of the book")
  let read = prompt("Have you read it? (yes/no)")
  if (read == "yes") {read = true}
  else read = false;


  let record = new book(name, writer, page, read);
  myLibrary.push(record);
}

let record1 = new book("Harry Potter2", "JKR", 252, true);
myLibrary.push(record1);

let record2 = new book("Harry Potter3", "JKR2", 242, false);
myLibrary.push(record2);

myLibrary.forEach(record => {
  let row = table.insertRow(-1);
  row.innerHTML = "<td>" + record.name + "</td>" + "<td>" + record.writer + "</td>" + "<td>" + record.page + "</td>" + "<td>" + record.read + "</td>"
})