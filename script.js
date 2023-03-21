class Bookshelf {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [{ title: 'title', author: 'author' }, { title: 'title2', author: 'author2' }];
  }

  addBook(title, author) {
    this.books.push({ title, author });
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  removeBook(book) {
    this.books = this.books.filter((b) => b !== book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  render() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    for (let i = 0; i < this.books.length; i += 1) {
      const book = this.books[i];
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.textContent = 'Remove';
      deleteButton.addEventListener('click', () => {
        this.removeBook(book);
        this.render();
      });
      li.appendChild(deleteButton);
      bookList.appendChild(li);

      if (i % 2 === 0) {
        li.style.backgroundColor = '#e9e9e9';
      }
    }
  }
}

const myBookshelf = new Bookshelf();

document.getElementById('add-book').addEventListener('click', (event) => {
  event.preventDefault();
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value;
  const author = authorInput.value;
  if (title !== '' && author !== '') {
    myBookshelf.addBook(title, author);
    myBookshelf.render();
    titleInput.value = '';
    authorInput.value = '';
  }
});

myBookshelf.render();
