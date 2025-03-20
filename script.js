document.addEventListener("DOMContentLoaded", () => {
    let books = JSON.parse(localStorage.getItem("books")) || [];

    function saveBooks() {
        localStorage.setItem("books", JSON.stringify(books));
    }

    function displayBooks(tableId) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        tableBody.innerHTML = "";
        books.forEach((book, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${book.image}" alt="Book Image" class="book-img"></td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${book.status}</td>
                ${tableId === "manageBooksTable" ? `
                    <td>
                        <button onclick="editBook(${index})">Edit</button>
                        <button onclick="deleteBook(${index})">Delete</button>
                    </td>
                ` : ""}
            `;
            tableBody.appendChild(row);
        });
    }

    function addBook(event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;
        const status = document.getElementById("status").value;
        const imageInput = document.getElementById("image").files[0];

        if (imageInput) {
            const reader = new FileReader();
            reader.readAsDataURL(imageInput);
            reader.onload = function () {
                const image = reader.result;
                books.push({ title, author, isbn, status, image });
                saveBooks();
                displayBooks("manageBooksTable");
                document.getElementById("bookForm").reset();
            };
        } else {
            alert("Please upload an image.");
        }
    }

    function editBook(index) {
        const book = books[index];
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("isbn").value = book.isbn;
        document.getElementById("status").value = book.status;
        books.splice(index, 1);
        saveBooks();
        displayBooks("manageBooksTable");
    }

    function deleteBook(index) {
        books.splice(index, 1);
        saveBooks();
        displayBooks("manageBooksTable");
    }

    if (document.getElementById("bookForm")) {
        document.getElementById("bookForm").addEventListener("submit", addBook);
        displayBooks("manageBooksTable");
    } else if (document.getElementById("booksTable")) {
        displayBooks("booksTable");
    }
});
