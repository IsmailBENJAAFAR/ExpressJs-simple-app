const express = require('express');
import { Book, Status, Format } from './Book';
const app = express();
const PORT = 3000;

app.use(express.json());
let books : Book[] = [];

app.post('/books',(req:any,res:any)=>{
    const book : Book = new Book(
        books.length + 1,
        req.body.title,
        req.body.author,
        req.body.numberPages,
        req.body.status,
        req.body.price,
        req.body.numberPagesRead,
        req.body.format,
        req.body.suggestedBy
    );
    books.push(book);
    res.status(201).json(book);
});

app.get('/books',(req:any,res:any)=>{
    res.json(books);
});

app.get('/books/:id',(req:any,res:any)=>{
    const book : Book | undefined = books.find(b =>b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).json({ error: 'Book not found' });
    res.json(book);
});

app.put('/books/:id',(req:any,res:any)=>{
    const book : Book | undefined = books.find(b =>b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).json({ error:'book not found'});
    //modify book
    res.json(book);
});

app.delete('/books/:id',(req:any,res:any)=>{
    const index : number = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1)
        return res.status(404).json({error:'book not found' });
    books.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});