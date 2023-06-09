class BookShelf {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('book')) || [{ title: 'title 1', author: 'author 2' }, { title: 'title 1', author: 'author 2' }];
  }

  add(title, author) {
    this.books.push({ title, author });
    localStorage.setItem('book', JSON.stringify(this.books));
  }

  remove(book) {
    this.books = this.books.filter((b) => b !== book);
    localStorage.setItem('book', JSON.stringify(this.books));
  }

  render() {
    const bookList = document.querySelector('#book-list');
    bookList.innerHTML = '';
    for (let i = 0; i < this.books.length; i += 1) {
      const book = this.books[i];
      const li = document.createElement('li');
      li.innerHTML = `${book.title} by ${book.author}`;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Remove';
      deleteButton.classList.add('deleteButton');
      deleteButton.addEventListener('click', () => {
        this.remove(book);
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

const myBookShelf = new BookShelf();
const addBook = document.querySelector('#add-book');
addBook.addEventListener('click', (event) => {
  event.preventDefault();
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const title = titleInput.value;
  const author = authorInput.value;
  if (title !== '' && author !== '') {
    myBookShelf.add(title, author);
    myBookShelf.render();
    titleInput.value = '';
    authorInput.value = '';
  }
});

myBookShelf.render();

const sections = document.getElementsByTagName('section');
for (let i = 1; i < sections.length; i += 1) {
  sections[i].style.display = 'none';
}

const navLinks = document.querySelectorAll('nav a');
navLinks[0].style.color = 'blue';

for (let i = 0; i < navLinks.length; i += 1) {
  navLinks[i].addEventListener('click', function update(event) {
    event.preventDefault();
    for (let j = 0; j < sections.length; j += 1) {
      sections[j].style.display = 'none';
    }
    const target = this.getAttribute('href').substr(1);
    document.getElementById(target).style.display = 'block';

    for (let k = 0; k < navLinks.length; k += 1) {
      navLinks[k].style.color = 'black';
    }
    this.style.color = 'blue';
  });
}

sections[0].style.display = 'block';

function displayDateTime() {
  const currentDate = new Date();
  const dateTimeString = currentDate.toLocaleString();
  document.querySelector('#date-time').innerHTML = dateTimeString;
}
setInterval(displayDateTime, 1000);