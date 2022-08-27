import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack, Button } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom'
import { BookShelfBookGallery } from './Bookshelf_BookGallery';
import { searchEndpoint } from '../endpoints';
import useAxios from "../utils/useAxios";

export const Search = ({userID, pattern, type}) => {
    const [books, setBooks] = useState([])  
    const [authors, setAuthors] = useState([]) 
    const [series, setSeries] = useState([]) 

    const location = useLocation();

    const api = useAxios();

    const [spinner, setSpinner] = useState(true)

    const loc = useLocation();

    const getSearchResults = async () => {
        api()
        .get(searchEndpoint(), {
            "pattern": pattern,
            "type": type
        })
        .then((response) => {
            console.log('search results: ', response.data);
            let wantToReadBooks = response.data
            setBooks(wantToReadBooks)
            setSpinner(false)
        })
        .catch((error)=> {
            console.log('Error during fetch search results:', error)
        });
    }

    useEffect(()=> {
        setSpinner(true);
        getSearchResults();
    }, [loc.pathname])
    

    console.log('pattern: ', location.state.pattern, ', type: ', location.state.type)
    
    return (
        <Container fluid>
            <Row>
                <Stack gap={1} className='bookshelf-wanttoread'>
                    {/* {
                    <div className='bookshelf-wanttoread__body'>
                        {(bookshelfCategory === 0) && <h3 className='primary-text'>Books in want-to-read list</h3>}
                        {(bookshelfCategory === 1) && <h3 className='primary-text'>Books in already-read list</h3>}
                        {(bookshelfCategory === 2) && <h3 className='primary-text'>Books in currently reading list</h3>}
                        {(bookshelfCategory === 3) && <h3 className='primary-text'>Reviews</h3>}
                        <BookShelfBookGallery books={books} booksPerRow={4} setBooks={setBooks} spinner={spinner} setSpinner={setSpinner}></BookShelfBookGallery>
                    </div>
                    } */}
                </Stack>
            </Row>
        </Container>
    )
}

export default Search;