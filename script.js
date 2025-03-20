document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
});

const bookForm = document.getElementById("bookForm");
const booksContainer = document.getElementById("booksContainer");
const editModal = document.getElementById("editModal");
const addModal = document.getElementById("addModal");
const searchInput = document.getElementById("searchInput");

let editingIndex = null;

function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
}

// Open Add Modal
function openAddModal() {
    addModal.classList.remove("hidden");
}

// Close Add Modal
function closeAddModal() {
    addModal.classList.add("hidden");
    bookForm.reset();
}

// Submit New Book
bookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").value;
    const imageFile = document.getElementById("image").files[0];

    if (!title || !author || !isbn) {
        Swal.fire("Error", "Please fill in all fields.", "error");
        return;
    }

    let imageData = "";
    if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = function () {
            imageData = reader.result;
            addBook(title, author, isbn, description, status, imageData);
        };
    } else {
        addBook(title, author, isbn, description, status, imageData);
    }

    closeAddModal();
    Swal.fire("Success", "You have successfully added a book!", "success");
});

function addBook(title, author, isbn, description, status, imageData) {
    const books = getBooks();
    books.push({ title, author, isbn, description, status, image: imageData });
    saveBooks(books);
}

// Load Books and Display in Container
function loadBooks() {
    booksContainer.innerHTML = "";
    const books = getBooks();

    books.forEach((book, index) => {
        booksContainer.innerHTML += `
            <div class="p-4 border rounded-lg shadow-md bg-gray-200">
                <img src="${book.image || 'https://via.placeholder.com/150'}" class="w-full h-40 object-cover mb-2 rounded">
                <h3 class="text-lg font-semibold">${book.title}</h3>
                <p class="text-gray-700">${book.author}</p>
                <button onclick="openEditModal(${index})" 
                    class="mt-2 bg-[#706D54] text-white px-4 py-2 rounded transition hover:bg-white hover:text-[#706D54] hover:border hover:border-[#706D54]">
                    Edit
                </button>

                <button onclick="deleteBook(${index})" 
                    class="mt-2 bg-[#A31D1D] text-white px-4 py-2 rounded transition hover:bg-white hover:text-[#A31D1D] hover:border hover:border-[#A31D1D]">
                    Delete
                </button>

            </div>
        `;
    });
}

// Open Edit Modal
function openEditModal(index) {
    const books = getBooks();
    const book = books[index];

    document.getElementById("editTitle").value = book.title;
    document.getElementById("editAuthor").value = book.author;
    document.getElementById("editISBN").value = book.isbn;
    document.getElementById("editDescription").value = book.description;
    document.getElementById("editStatus").value = book.status;

    editingIndex = index;
    editModal.classList.remove("hidden");
}

// Update Book
function updateBook() {
    const books = getBooks();

    books[editingIndex].title = document.getElementById("editTitle").value;
    books[editingIndex].author = document.getElementById("editAuthor").value;
    books[editingIndex].isbn = document.getElementById("editISBN").value;
    books[editingIndex].description = document.getElementById("editDescription").value;
    books[editingIndex].status = document.getElementById("editStatus").value;

    saveBooks(books);
    closeModal();

    Swal.fire({
        title: "Success",
        text: "Book has been updated!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
    });
}

// Close Edit Modal
function closeModal() {
    editModal.classList.add("hidden");
}

// Delete Book with Confirmation
function deleteBook(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this book!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            let books = getBooks();
            books.splice(index, 1);
            saveBooks(books);
            Swal.fire("Deleted!", "The book has been deleted.", "success");
        }
    });
}

// Search Books in Real-Time (Only Title & Author)
function searchBooks() {
    const query = searchInput.value.toLowerCase();
    const books = getBooks();
    booksContainer.innerHTML = "";

    books
        .filter(book => 
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        )
        .forEach((book, index) => {
            booksContainer.innerHTML += `
                <div class="p-4 border rounded-lg shadow-md bg-gray-200">
                    <img src="${book.image || 'https://via.placeholder.com/150'}" class="w-full h-40 object-cover mb-2 rounded">
                    <h3 class="text-lg font-semibold">${book.title}</h3>
                    <p class="text-gray-700">${book.author}</p>
                    <button onclick="openEditModal(${index})" class="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">Edit</button>
                    <button onclick="deleteBook(${index})" class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
                </div>
            `;
        });
}

// Go Back
function goBack() {
    window.history.back();
}