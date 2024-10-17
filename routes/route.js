const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, '../package/data.json');

router.get('/', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }
        try {
            const toys = JSON.parse(data);
            res.json(toys);
        } catch (parseError) {
            res.status(500).json({ message: 'Error parsing JSON data' });
        }
    });
});

module.exports = router;
