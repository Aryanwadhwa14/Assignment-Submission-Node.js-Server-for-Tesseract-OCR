# Tesseract OCR Node.js Server

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [GET /get-text](#get-get-text)
    - [GET /get-bboxes](#get-get-bboxes)
  - [Testing the Server](#testing-the-server)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This project is a Node.js server that utilizes the Tesseract.js library, an Optical Character Recognition (OCR) library, to process images. It provides two API endpoints for extracting text and bounding boxes from uploaded images.

## Features
- Extract text from images using Tesseract.js OCR
- Extract bounding boxes for specific text elements (word, line, paragraph, block, or page) in images
- RESTful API endpoints for easy integration into other applications

## Installation

1. **Prerequisites**:
   - Install [Node.js](https://nodejs.org/) on your system.

2. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/tesseract-ocr-server.git
   cd tesseract-ocr-server
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

The server will start running on `http://localhost:3000`.

## Usage

### API Endpoints

#### `GET /get-text`
- **Description**: Extracts the entire text from an uploaded image.
- **Request**: Multipart form-data, with the `image` field required.
- **Response**: JSON object with the extracted text.

#### `GET /get-bboxes`
- **Description**: Extracts bounding boxes for specific text elements (word, line, paragraph, block, or page) in an uploaded image.
- **Request**: Multipart form-data, with the `image` and `type` fields required.
- **Response**: JSON object with the bounding boxes.

### Testing the Server

You can test the API endpoints using tools like Postman or cURL. Here are some example cURL commands:

- Test `/get-text`:
  ```bash
  curl -X POST -F "image=@/path/to/image.png" http://localhost:3000/get-text
  ```
- Test `/get-bboxes`:
  ```bash
  curl -X POST -F "image=@/path/to/image.png" -F "type=word" http://localhost:3000/get-bboxes
  ```

## Dependencies

The project uses the following dependencies:

- [express](https://www.npmjs.com/package/express): Web framework for Node.js
- [multer](https://www.npmjs.com/package/multer): Middleware for handling multipart/form-data
- [tesseract.js](https://www.npmjs.com/package/tesseract.js): Optical Character Recognition (OCR) library

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).