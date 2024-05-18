const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const searchInPDF = async (query) => {
  const uploadDir = path.join(__dirname, "uploads");
  const files = fs.readdirSync(uploadDir);
  let searchResults = [];

  for (const file of files) {
    const filePath = path.join(uploadDir, file);
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    if (data.text.includes(query)) {
      searchResults.push({ file: file, content: data.text });
    }
  }

  return searchResults;
};

module.exports = { searchInPDF };
