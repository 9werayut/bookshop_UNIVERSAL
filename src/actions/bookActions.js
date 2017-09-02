import axios from 'axios';

//GET A BOOKS
export function getBooks() {
    // return {
    //     type: "GET_BOOKS"
    // }
    return dispatch => {
        axios.get('/api/books')
            .then(response => {
                dispatch({
                    type: "GET_BOOKS",
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: "GET_BOOK_REJECTED",
                    payload: err
                });
            });
    }
}

//POST A BOOK
export function postBooks(book) {
    // return {
    //     type: "POST_BOOK",
    //     payload: book
    // }
    return dispatch => {
        axios.post('/api/books', book)
            .then(response => {
                dispatch({
                    type: "POST_BOOK",
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: "POST_BOOK_REJECTED",
                    payload: "there was an error while posting a new book"
                });
            });
    }
}

//DELETE A BOOK
export function deleteBooks(id) {
    // return {
    //     type: "DELETE_BOOK",
    //     payload: id
    // }
    return dispatch => {
        axios.delete('/api/books/' + id)
            .then(response => {
                dispatch({
                    type: "DELETE_BOOK",
                    payload: id
                })
            })
            .catch(err => {
                dispatch({
                    type: "DELETE_BOOK_REJECTED",
                    payload: err
                })
            })
    }
}

//UPDATE A BOOK
export function updateBooks(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}

//RESET FORM BUTTON
export function resetButton(book) {
    return {
        type: "RESET_BUTTON"
    }
}
