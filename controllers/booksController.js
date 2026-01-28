const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
  // #swagger.tags = ['Books']
  const result = await mongodb.getDatabase().db('library').collection('books').find();
  result.toArray()
    .then((books) => {
      res.setHeader('Content-type', 'application/json');
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getBookById = async (req, res) => {
  // #swagger.tags = ['Books']
  const bookId = new objectId(req.params.id);
  const result = await mongodb.getDatabase().db('library').collection('books').find({ _id: bookId });
  result.toArray()
    .then((books) => {
      res.setHeader('Content-type', 'application/json');
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
}

const createBook = async (req, res) => {
  // #swagger.tags = ['Books']
  const book = {
    title: req.body.title,
    author: req.body.author,
    publicationYear: req.body.publicationYear,
    genre: req.body.genre,
    language: req.body.language,
    price: req.body.price,
    ratings: req.body.ratings
  };
  const response = await mongodb.getDatabase().db('library').collection('books').insertOne(book);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the book.');
  }
}

const updateBook = async (req, res) => {
  // #swagger.tags = ['Books']
  const bookId = new objectId(req.params.id);
  const book = {
    title: req.body.title,
    author: req.body.author,
    publicationYear: req.body.publicationYear,
    genre: req.body.genre,
    language: req.body.language,
    price: req.body.price,
    ratings: req.body.ratings
  };
  const response = await mongodb.getDatabase().db('library').collection('books').replaceOne({ _id: bookId }, book);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the book.');
  }
}

const deleteBook = async (req, res) => {
  // #swagger.tags = ['Books']
  const bookId = new objectId(req.params.id);
  const response = await mongodb.getDatabase().db('library').collection('books').deleteOne({ _id: bookId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the book.');
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
}