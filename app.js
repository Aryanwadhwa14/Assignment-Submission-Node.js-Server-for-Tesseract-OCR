// Import required modules
const express = require('express');
const multer = require('multer');
const tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');

// Initialize the Express app
const app = express();

// Configure Multer to handle image uploads
const upload = multer({ dest: 'uploads/' });

// --------------------------------------
// POST /get-text: Extract the text from an image
// --------------------------------------
app.post('/get-text', upload.single('image'), (req, res) => {
    // Ensure an image file is provided
    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
    }

    // Get the image path from the uploaded file
    const imagePath = path.join(__dirname, req.file.path);

    // Use Tesseract to recognize the text in the image
    tesseract.recognize(imagePath, 'eng')
        .then(result => {
            // Clean up: delete the image after processing
            fs.unlinkSync(imagePath);

            // Send the extracted text as the response
            res.json({ text: result.data.text });
        })
        .catch(err => {
            // In case of an error, return a 500 response with the error message
            res.status(500).json({ error: err.message });
        });
});

// --------------------------------------
// POST /get-bboxes: Extract bounding boxes from an image
// --------------------------------------
app.post('/get-bboxes', upload.single('image'), (req, res) => {
    // Ensure an image file and a type are provided
    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
    }
    const { type } = req.body;
    const validTypes = ["word", "line", "paragraph", "block", "page"];
    
    // Check if the provided type is valid
    if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid type provided. Choose one of "word", "line", "paragraph", "block", "page"' });
    }

    // Get the image path from the uploaded file
    const imagePath = path.join(__dirname, req.file.path);

    // Use Tesseract to extract bounding boxes for the specified type
    tesseract.recognize(imagePath, 'eng')
        .then(result => {
            // Clean up: delete the image after processing
            fs.unlinkSync(imagePath);

            // Extract bounding boxes based on the requested type
            const levelMap = {
                word: result.data.words,
                line: result.data.lines,
                paragraph: result.data.paragraphs,
                block: result.data.blocks,
                page: [result.data]
            };

            const boxes = levelMap[type].map(item => ({
                text: item.text || '',
                bbox: item.bbox || item.bounds,
                confidence: item.confidence || 0
            }));

            // Send bounding boxes as response
            res.json({ bboxes: boxes });
        })
        .catch(err => {
            // In case of an error, return a 500 response with the error message
            res.status(500).json({ error: err.message });
        });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
