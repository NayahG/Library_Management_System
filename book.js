const books = [
    { title: "Book One", author: "Author A", isbn: "12345", availability: "Available", image: "https://via.placeholder.com/150" },
    { title: "Book Two", author: "Author B", isbn: "67890", availability: "Checked Out", image: "https://via.placeholder.com/150" },
    { title: "Book Three", author: "Author C", isbn: "11223", availability: "Available", image: "https://via.placeholder.com/150" }
];

function displayBooks() {
    const container = document.getElementById("booksContainer");
    container.innerHTML = "";
    books.forEach((book, index) => {
        container.innerHTML += `
            <div class="p-4 border rounded-lg shadow-md bg-gray-200">
                <img src="${book.image}" alt="${book.title}" class="w-full h-40 object-cover mb-2 rounded">
                <h3 class="text-lg font-semibold">${book.title}</h3>
                <p class="text-gray-700">${book.author}</p>
                <button onclick="toggleDetails(${index})" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">View Details</button>
            </div>`;
    });
}

function toggleDetails(index) {
    const book = books[index];
    const detailsSection = document.getElementById("bookDetails");
    
    if (detailsSection.classList.contains("hidden")) {
        document.getElementById("tableBookTitle").textContent = book.title;
        document.getElementById("tableBookAuthor").textContent = book.author;
        document.getElementById("tableBookISBN").textContent = book.isbn;
        document.getElementById("tableBookAvailability").textContent = book.availability;
        detailsSection.classList.remove("hidden");
    } else {
        detailsSection.classList.add("hidden");
    }
}

function searchBooks() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const container = document.getElementById("booksContainer");
    container.innerHTML = "";
    books.filter(book => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query))
        .forEach((book, index) => {
            container.innerHTML += `
                <div class="p-4 border rounded-lg shadow-md bg-gray-200">
                    <img src="${book.image}" alt="${book.title}" class="w-full h-40 object-cover mb-2 rounded">
                    <h3 class="text-lg font-semibold">${book.title}</h3>
                    <p class="text-gray-700">${book.author}</p>
                    <button onclick="toggleDetails(${index})" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">View Details</button>
                </div>`;
        });
}

document.addEventListener("DOMContentLoaded", displayBooks);
