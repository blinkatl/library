const myLibrary = []; //Array to hold books
//Buttons
const addBtn = document.querySelector(".addBtn");
const dialog = document.querySelector(".bookDialog");
const closeDialogBtn = document.querySelector(".closeDialogBtn");
const submitBtn = document.getElementById("submit");
//Input fields
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

//Constructor
function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Add book to library array
function addBookTolibrary(book) {
    myLibrary.push(book);
}

//Print new table row for book
function displayNewBook(book, index) {
    const table = document.querySelector("table"); //Get the table element from the DOM
    const newRow = document.createElement("tr"); //Create a new table row

    //Create table cells for each book property
    //Title
    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;
    newRow.appendChild(titleCell);

    //Author
    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    newRow.appendChild(authorCell);

    //Pages
    const pagesCell = document.createElement("td");
    pagesCell.textContent = book.pages;
    newRow.appendChild(pagesCell);

    //Read/Unread
    const statusCell = document.createElement("td");
    statusCell.textContent = book.read ? "read" : "unread";
    newRow.appendChild(statusCell);

    //Create change read status button
    const changeBtn = document.createElement("button");
    changeBtn.textContent = "Change read status";
    changeBtn.addEventListener("click", () => {
        book.read = !book.read;
        statusCell.textContent = book.read ? "read" : "unread";
    });

    //Add change read status button
    const changeCell = document.createElement("td");
    changeCell.appendChild(changeBtn);
    newRow.appendChild(changeBtn);

    //Create delete book button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        deleteBook(index); //Call the deleteBook function with the index of the book to be deleted
        table.removeChild(newRow); //Remove the row from the table
    });

    //Add delete button
    const deleteCell = document.createElement("td");
    deleteCell.appendChild(deleteBtn);
    newRow.appendChild(deleteCell);

    //Append the new row to the table
    table.appendChild(newRow);
}

//Delete book from library array
function deleteBook(index) {
    myLibrary.splice(index, 1);
}

//Open dialog
addBtn.addEventListener("click", () => {
    dialog.showModal();
});

//Close dialog
closeDialogBtn.addEventListener("click", () => {
    dialog.close();
});

//Submit data
submitBtn.addEventListener("click", () => {
    event.preventDefault();  //Prevent the default form submission

    //Get value from input fields
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = parseInt(pagesInput.value);
    const status = readInput.checked ? true : false;

    newBook = new book("title", "author", pages, status);
    addBookTolibrary(newBook);
    displayNewBook(newBook, myLibrary.length - 1);

    event.target.closest('form').reset();
    dialog.close();
});