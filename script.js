const bookList = document.querySelector('#books-list');
const bookForm = document.querySelector('#book-form');

let books;

let savedBooks = JSON.parse(localStorage.getItem('book'));
if (Array.isArray(savedBooks)) {
    books = savedBooks;
} else {
    books = [
        {
            title: 'book 1',
            author: 'author 1',
        },
        {
            title: 'book 2',
            author: 'author 2',
        },
    ]
};

render();

bookForm.addEventListener('submit', addBook);
bookList.addEventListener('click', remove);

function render() {
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const li = document.createElement('li');
        const line = document.createElement('hr');
        line.classList.add('line');
        const title = document.createElement('span');
        title.classList.add('display');
        const author = document.createElement('span');
        author.classList.add('display');
        const btn = document.createElement('button');
        btn.classList.add('display');
        btn.innerHTML = `Remove`;
        btn.id = `${index}`;
        title.innerHTML = `${book.title}`
        author.innerHTML = `${book.author}`;
        li.appendChild(title);
        li.appendChild(author);
        li.appendChild(btn);
        bookList.appendChild(li);
        bookList.appendChild(line);
    });
}


function addBook(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    books.push({ title, author });
    render();
    bookForm.reset();
    saveBook();
}

function remove(event) {
    console.log(event);
    if (event.target.tagName === 'BUTTON') {
        const index = event.target.id;
        books.splice(index, 1);
        render();
    }
    saveBook();
}

function saveBook() {
    localStorage.setItem('book', JSON.stringify(books));
}
