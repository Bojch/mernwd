import React, { Component } from 'react';
import axios from 'axios';
import { AddBook, BooksHead, BooksData } from './appView';

class App extends Component {
    constructor(props) {
        super(props);

        this.book = {
            title: '',
            author: '',
        };

        this.state = {
            books: [],

            book: { ...this.book },

            isNewBook: true,
            bookId: 0,
            index: -1,
        };
    }

    componentDidMount = () => {
        axios
            .get('http://localhost:4000/books')
            .then((res) => {
                this.setState({ books: res.data.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    onChange = (e) => {
        const { value, name } = e.target;
        const book = this.state.book;
        book[name] = value;
        this.setState({ book: book });
    };

    onRemove = (id, i) => {
        axios
            .delete(`http://localhost:4000/books/${id}`)
            .then((res) => {
                console.log(res.data);
                const books = this.state.books;
                books.splice(i, 1);
                this.setState({ books: books });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    initState = (book, isNewBook, id, i) => {
        this.setState({
            book: book,
            isNewBook: isNewBook,
            bookId: id,
            index: i,
        });
    };

    onEdit = (i) => {
        const book = this.state.books[i];
        this.initState({ ...book }, false, book._id, i);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.state.isNewBook ? this.doSave() : this.doUpdate();
    };

    doUpdate = () => {
        axios
            .patch(`http://localhost:4000/books/${this.state.bookId}`, this.state.book)
            .then((res) => {
                const books = this.state.books;
                books[this.state.index] = res.data.data;
                this.setState({ books: books });
                this.initState({ ...this.book }, true, 0, -1);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    doSave = () => {
        axios
            .post('http://localhost:4000/books', this.state.book)
            .then((res) => {
                const books = this.state.books;
                books.unshift(res.data.data);
                this.setState({ books: books });
                this.initState({ ...this.book }, true, 0, -1);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <AddBook book={this.state.book} onChange={this.onChange} onSubmit={this.onSubmit} />

                <hr />

                <h2>Availible Books</h2>
                <table>
                    <BooksHead />
                    <BooksData books={this.state.books} onRemove={this.onRemove} onEdit={this.onEdit} />
                </table>
            </div>
        );
    }
}

export default App;
