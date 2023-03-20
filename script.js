const btn = document.getElementById('submit');
let title, author;

btn.addEventListener("click", ()=> {
    title = document.querySelector('#title').value;
    author = document.querySelector('#author').value;

    var books = [];
    books.push(
        {
            title: title,
            author: author
        }
    );

    localStorage.setItem("books", books);
    var ans = localStorage.getItem("books");
    console.log(ans.title);
    console.log(ans.author);


});