const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML file
app.use(express.static(path.join(__dirname, '/')));

// Route to handle form submission
app.post('/submit-name', (req, res) => {
    const name = req.body.name;
    if (name) {
        // Append name to names.txt
        fs.appendFile('names.txt', `${name}\n`, (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).send('Lỗi lưu đánh giá - Vui lòng liên hệ admin');
            }
            res.send('Đã lưu đánh giá');
        });
    } else {
        res.status(400).send('Cần nhập tên');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
