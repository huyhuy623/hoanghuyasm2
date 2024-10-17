const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 4000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/toys', (req, res) => {
    const dataFilePath = path.join(__dirname, 'data.json'); 
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            return res.status(500).json({ message: 'Error reading file' });
        }
        try {
            const toys = JSON.parse(data);
            res.json(toys);
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            res.status(500).json({ message: 'Error parsing JSON data' });
        }
    });
});

app.get('/toys/:id', (req, res) => {
    const toyId = parseInt(req.params.id, 10);
    const dataFilePath = path.join(__dirname, 'data.json');

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            return res.status(500).json({ message: 'Error reading file' });
        }

        try {
            const toys = JSON.parse(data);
            const toy = toys.find(t => t.id === toyId);

            if (toy) {
                res.json(toy);
            } else {
                res.status(404).json({ message: 'Toy not found' });
            }
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            res.status(500).json({ message: 'Error parsing JSON data' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
