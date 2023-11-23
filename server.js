// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Define the upload folder
const uploadFolder = path.join(__dirname, 'upload');

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Process the uploaded file here (e.g., save it to disk, database, etc.)
        console.log('File received:', req.file);
        res.status(200).json({ message: 'File uploaded successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});