function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function displayBooks() {
    const container = document.getElementById("booksContainer");
    container.innerHTML = "";

    const books = getBooks();

    books.forEach((book, index) => {
        container.innerHTML += `
            <div class="p-4 border rounded-lg shadow-md bg-gray-200">
                <img src="${book.image ? book.image : "https://via.placeholder.com/150"}" alt="${book.title}" class="w-full h-40 object-cover mb-2 rounded">
                <h3 class="text-lg font-semibold">${book.title}</h3>
                <p class="text-gray-700">${book.author}</p>
                <button onclick="openModal(${index})" class="mt-2 bg-[#674636] text-[#FFF8E8] px-4 py-2 rounded hover:bg-[#FFF8E8] hover:text-[#674636] hover:border hover:border-[#674636] font-[Poppins]">View Details</button>
            </div>`;
    });
}

function openModal(index) {
    const books = getBooks();
    const book = books[index];

    document.getElementById("modalBookTitle").textContent = book.title;
    document.getElementById("modalBookAuthor").textContent = book.author;
    document.getElementById("modalBookDescription").textContent = book.description;
    document.getElementById("modalBookISBN").textContent = book.isbn;

    const availabilityElement = document.getElementById("modalBookAvailability");
    availabilityElement.textContent = book.status;

    if (book.status.toLowerCase() === "available") {
        availabilityElement.classList.remove("text-red-600");
        availabilityElement.classList.add("text-green-600");
    } else {
        availabilityElement.classList.remove("text-green-600");
        availabilityElement.classList.add("text-red-600");
    }

    document.getElementById("bookModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("bookModal").classList.add("hidden");
}

function searchBooks() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const container = document.getElementById("booksContainer");
    container.innerHTML = "";

    const books = getBooks().filter(book =>
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) || 
        book.description.toLowerCase().includes(query)
    );

    books.forEach((book, index) => {
        container.innerHTML += `
            <div class="p-4 border rounded-lg shadow-md bg-gray-200">
                <img src="${book.image ? book.image : "https://via.placeholder.com/150"}" alt="${book.title}" class="w-full h-40 object-cover mb-2 rounded">
                <h3 class="text-lg font-semibold">${book.title}</h3>
                <p class="text-gray-700">${book.author}</p>
                <button onclick="openModal(${index})" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">View Details</button>
            </div>`;
    });
}

document.addEventListener("DOMContentLoaded", displayBooks);
