document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
});

const bookForm = document.getElementById("bookForm");
const bookTable = document.getElementById("manageBooksTable");

function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
}

bookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const status = document.getElementById("status").value;
    const imageFile = document.getElementById("image").files[0];

    if (!title || !author || !isbn) {
        alert("Please fill in all fields.");
        return;
    }

    let imageData = "";
    if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = function () {
            imageData = reader.result;
            addBook(title, author, isbn, status, imageData);
        };
    } else {
        addBook(title, author, isbn, status, imageData);
    }

    bookForm.reset();
});

function addBook(title, author, isbn, status, imageData) {
    const books = getBooks();
    books.push({ title, author, isbn, status, image: imageData });
    saveBooks(books);
    loadBooks();
}

function loadBooks() {
    bookTable.innerHTML = "";
    const books = getBooks();

    books.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-4 py-2">
                ${book.image ? `<img src="${book.image}" class="w-16 h-20 object-cover rounded">` : "No Image"}
            </td>
            <td class="px-4 py-2">${book.title}</td>
            <td class="px-4 py-2">${book.author}</td>
            <td class="px-4 py-2">${book.isbn}</td>
            <td class="px-4 py-2">${book.status}</td>
            <td class="px-4 py-2">
                <button onclick="editBook(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="deleteBook(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
        `;
        bookTable.appendChild(row);
    });
}

function deleteBook(index) {
    let books = getBooks();
    books.splice(index, 1);
    saveBooks(books);
    loadBooks();
}

function editBook(index) {
    const books = getBooks();
    const book = books[index];

    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("isbn").value = book.isbn;
    document.getElementById("status").value = book.status;

    books.splice(index, 1);
    saveBooks(books);
    loadBooks();
}
