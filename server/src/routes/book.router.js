const express = require('express');
const BookRouter = express.Router();
const BookModel = require('../models/book.model');

// Get all books
BookRouter.get('/', (req, res) => {
    BookModel.find()
        .sort({ _id: -1 })
        .exec(function (err, books) {
            if (err) {
                res.status(400).send({
                    success: false,
                    error: err.message,
                });
            } else {
                res.status(200).send({
                    success: true,
                    data: books,
                });
            }
        });
});

// Add single Book
BookRouter.post('/', function (req, res) {
    let newBook = {
        title: req.body.title,
        author: req.body.author,
    };
    // BookModel.create(newBook)

    const bm = new BookModel(newBook);
    bm.save()
        .then((book) => {
            // res.status(201).json({ boat: 'Boat added successfully.', id: boat._id });
            res.status(201).send({
                success: true,
                data: book,
                message: 'Book added successfully.',
            });
        })
        .catch((err) => {
            // res.status(400).json('Adding new boat failed!!!');
            res.status(400).send({
                success: false,
                error: err.message,
            });
        });
});

// Delete single Book
BookRouter.delete('/:id', (req, res) => {
    BookModel.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            // res.status(400).send('Delete boat failed!!!');
            res.status(400).send({
                success: false,
                error: err.message,
            });
        } else {
            res.status(200).send({
                success: true,
                // data: result,
                message: 'Book deleted successfully',
            });
        }
    });
});

// Edit Single Book
BookRouter.patch('/:id', (req, res) => {
    const fieldsToUpdate = req.body;
    BookModel.findByIdAndUpdate(req.params.id, { $set: fieldsToUpdate }, { new: true }, function (err, result) {
        if (err) {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        } else {
            res.status(200).send({
                success: true,
                data: result,
                message: 'Book updated successfully',
            });
        }
    });
});

module.exports = BookRouter;
