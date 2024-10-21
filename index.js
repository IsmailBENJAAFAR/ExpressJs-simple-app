const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
let items = [];

app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});