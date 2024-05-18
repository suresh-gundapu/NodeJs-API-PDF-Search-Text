const express = require("express");
const multer = require("multer");
const path = require("path");
const { searchInPDF } = require("./search");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload PDF route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).send("File uploaded successfully.");
});

// Search in PDF route
app.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).send("Query is required.");
  }

  const result = await searchInPDF(query);
  res.status(200).json(result);
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.listen(7070, () => {
  console.log("server started at 7070");
});
