
function filterBooks(category, element) {
    const books = document.querySelectorAll('.book-card');

    const categoryButtons = document.querySelectorAll('.category-tag');

    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    if (element) {
        element.classList.add('active');
    }
 
    books.forEach(book => {
        const bookCategory = book.getAttribute('data-category');

        if (category === 'all' || bookCategory === category) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}

function searchBooks(searchTerm) {
    const books = document.querySelectorAll('.book-card');
    const searchLower = searchTerm.toLowerCase();

    books.forEach(book => {
        const title = book.querySelector('.book-title').textContent.toLowerCase();
        const author = book.querySelector('.book-author').textContent.toLowerCase();
        const bookName = book.getAttribute('name') || '';

        if (title.includes(searchLower) || author.includes(searchLower) || bookName.includes(searchLower)) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const searchTerm = searchInput.value;
            searchBooks(searchTerm);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                const searchTerm = searchInput.value;
                searchBooks(searchTerm);
            }
        });
    }
});

