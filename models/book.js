const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  authors: String,
  description: String,
  href: String,
  thumbnail: String
});

const Book = mongoose.model("googlebooks", bookSchema);

module.exports = Book;
