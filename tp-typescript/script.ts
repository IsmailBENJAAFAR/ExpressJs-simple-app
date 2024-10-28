import { Book, Status, Format } from './Book';
const booksTable = document.getElementById('booksTable') as HTMLTableElement;


fetch('/books')
  .then((response) => response.json())
  .then((books) => {
    books.forEach((book:any) => {
      addBookToTable(book);
    });
  });

function createBook() {
  const title = (document.getElementById('title') as HTMLInputElement).value;
  const author = (document.getElementById('author') as HTMLInputElement).value;
  const pages = parseInt((document.getElementById('pages') as HTMLInputElement).value);

  fetch('/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      author,
      numberPages: pages,
      status: Status.Read,
      price: 0,
      numberPagesRead: 0,
      format: Format.Print,
      suggestedBy: '',
    }),
  })
    .then((response) => response.json())
    .then((book) => {
      addBookToTable(book);
      (document.getElementById('title') as HTMLInputElement).value = '';
      (document.getElementById('author') as HTMLInputElement).value = '';
      (document.getElementById('pages') as HTMLInputElement).value = '';
    });
}

function addBookToTable(book: Book) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.numberPages}</td>
  `;
  booksTable.appendChild(row);
}

function editBook(id: number) {
  console.log(`Edit book with ID ${id}`);
}

function deleteBook(id: number) {
  console.log(`Delete book with ID ${id}`);
}