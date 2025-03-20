let books = [];
const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");

function renderBooks() {
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        bookList.innerHTML += `
            <tr>
                <td class="border p-2">${book.title}</td>
                <td class="border p-2">${book.author}</td>
                <td class="border p-2">${book.isbn}</td>
                <td class="border p-2">${book.status}</td>
                <td class="border p-2">
                    <button onclick="editBook(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                    <button onclick="deleteBook(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
            </tr>`;
    });
}

bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    const status = document.getElementById("availability").value;
    books.push({ title, author, isbn, status });
    renderBooks();
    bookForm.reset();
});

function deleteBook(index) {
    books.splice(index, 1);
    renderBooks();
}

function editBook(index) {
    const book = books[index];
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("isbn").value = book.isbn;
    document.getElementById("availability").value = book.status;
    books.splice(index, 1);
    renderBooks();
}
