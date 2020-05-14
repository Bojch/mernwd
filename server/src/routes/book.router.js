const express = require('express');
const BookRouter = express.Router();
const BookModel = require('../models/book.model');

// Get all books
BookRouter.get('/', (req, res) => {
    BookModel.find()
        .sort({ _id: -1 })
        .exec()
        .then((books) => {
            res.status(200).send({
                success: true,
                data: books,
            });
        })
        .catch((err) => {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        });
});

// Add single Book
BookRouter.post('/', function (req, res) {
    BookModel.create(req.body)
        .then((book) => {
            res.status(201).send({
                success: true,
                data: book,
                message: 'Book added successfully.',
            });
        })
        .catch((err) => {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        });
});

// Delete single Book
BookRouter.delete('/:id', (req, res) => {
    BookModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).send({
                success: true,
                message: 'Book deleted successfully',
            });
        })
        .catch((err) => {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        });
});

// Edit Single Book
BookRouter.patch('/:id', (req, res) => {
    const fieldsToUpdate = req.body;
    BookModel.findByIdAndUpdate(req.params.id, { $set: fieldsToUpdate }, { new: true })
        .then((result) => {
            res.status(200).send({
                success: true,
                data: result,
                message: 'Book updated successfully',
            });
        })
        .catch((err) => {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        });
});

module.exports = BookRouter;
