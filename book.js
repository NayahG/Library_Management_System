document.addEventListener("DOMContentLoaded", displayBooks);

function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function displayBooks() {
    const container = document.getElementById("booksContainer");
    const listBody = document.querySelector("#listViewTable tbody");

    if (container) container.innerHTML = "";
    if (listBody) listBody.innerHTML = "";

    const books = getBooks();

    books.forEach((book, index) => {
        const availabilityText = book.status === "Available" ? "Available" : "Unavailable";
        const availabilityColor = book.status === "Available" ? "text-green-600" : "text-red-600";

        // Card View
        if (container) {
            container.innerHTML += `
                <div class="p-4 border rounded-lg shadow-md bg-gray-200">
                    <img src="${book.image || 'https://via.placeholder.com/150'}" class="w-full h-40 object-cover mb-2 rounded">
                    <h3 class="text-lg font-semibold">${book.title}</h3>
                    <p class="text-gray-700">${book.author}</p>
                    <p class="${availabilityColor} font-semibold">${availabilityText}</p>
                    <button onclick="openModal(${index})" class="mt-2 bg-[#674636] text-[#FFF8E8] px-4 py-2 rounded hover:bg-[#FFF8E8] hover:text-[#674636] border hover:border-[#674636]">View Details</button>
                </div>`;
        }

        // List View
        if (listBody) {
            listBody.innerHTML += `
                <tr class="border-b">
                    <td class="border border-gray-300 px-4 py-2">${book.title}</td>
                    <td class="border border-gray-300 px-4 py-2">${book.author}</td>
                    <td class="border border-gray-300 px-4 py-2">${book.isbn || 'N/A'}</td>
                    <td class="border border-gray-300 px-4 py-2 font-semibold ${availabilityColor}">${availabilityText}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                        <button onclick="openModal(${index})" class="bg-[#674636] text-white px-3 py-1 rounded hover:bg-[#FFF8E8] hover:text-[#674636] border hover:border-[#674636]">View Details</button>
                    </td>
                </tr>`;
        }
    });
}

// Open Full Details Modal
function openModal(index) {
    const book = getBooks()[index];
    const availabilityText = book.status === "Available" ? "Available" : "Unavailable";
    const availabilityColor = book.status === "Available" ? "text-green-600" : "text-red-600";

    document.getElementById("modalBookTitle").textContent = `Title: ${book.title}`;
    document.getElementById("modalBookAuthor").textContent = `Author: ${book.author}`;
    document.getElementById("modalBookDescription").textContent = `${book.description}`;
    document.getElementById("modalBookISBN").textContent = `${book.isbn || 'N/A'}`;
    document.getElementById("modalBookAvailability").innerHTML = `<span class="${availabilityColor} font-semibold">${availabilityText}</span>`;
    document.getElementById("modalBookImage").src = book.image || "https://via.placeholder.com/150";
    document.getElementById("bookModal").classList.remove("hidden");
}

// Close the Modal
function closeModal() {
    document.getElementById("bookModal").classList.add("hidden");
}

// Toggle Between Card and List View
function toggleView() {
    const cardsView = document.getElementById("booksContainer");
    const listView = document.getElementById("listViewTable");
    const viewIcon = document.getElementById("viewIcon");

    if (cardsView.classList.contains("hidden")) {
        cardsView.classList.remove("hidden");
        listView.classList.add("hidden");
        viewIcon.classList.remove("fa-th");
        viewIcon.classList.add("fa-list");
    } else {
        cardsView.classList.add("hidden");
        listView.classList.remove("hidden");
        viewIcon.classList.remove("fa-list");
        viewIcon.classList.add("fa-th");
    }
}
