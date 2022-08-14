import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack, Button } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom'
import { BookShelfBookGallery } from './Bookshelf_BookGallery';
import { bookshelfViewEndpoint } from '../endpoints';
import useAxios from "../utils/useAxios";

export const BookShelf_WantToRead = ({userID, bookshelfCategory}) => {
    const [books, setBooks] = useState([])  
    const api = useAxios();

    const [spinner, setSpinner] = useState(true)

    const loc = useLocation();

    const getWantToReadBooks = async () => {
        api()
        .get(bookshelfViewEndpoint(userID, bookshelfCategory), {
        })
        .then((response) => {
            console.log('wantToReadBooks', response.data);
            let wantToReadBooks = response.data
            setBooks(wantToReadBooks)
            setSpinner(false)
        })
        .catch((error)=> {
            console.log('Error during fetch wantToReadBooks:', error)
        });
    }

    useEffect(()=> {
        setSpinner(true);
        getWantToReadBooks();
    }, [loc.pathname])
    

    console.log('userID, bookshelfCategory in BookShelf_WantToRead: ', userID, ', ', bookshelfCategory)
    return (
        <Container fluid>
            <Row>
                <Stack gap={1} className='bookshelf-wanttoread'>
                    {
                    <div className='bookshelf-wanttoread__body'>
                        {(bookshelfCategory === 0) && <h3 className='primary-text'>Books in want-to-read list</h3>}
                        {(bookshelfCategory === 1) && <h3 className='primary-text'>Books in already-read list</h3>}
                        {(bookshelfCategory === 2) && <h3 className='primary-text'>Books in currently reading list</h3>}
                        {(bookshelfCategory === 3) && <h3 className='primary-text'>Reviews</h3>}
                        <BookShelfBookGallery books={books} booksPerRow={4} setBooks={setBooks} spinner={spinner} setSpinner={setSpinner}></BookShelfBookGallery>
                    </div>
                    }
                </Stack>
            </Row>
        </Container>
    )
}
