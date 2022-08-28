import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack, Button } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom'
import { BookShelfBookGallery } from './Bookshelf_BookGallery';
import { AuthorGallery } from './AuthorGallery';
import { SeriesGallery } from './SeriesGallery';
import { searchEndpoint } from '../endpoints';
import useAxios from "../utils/useAxios";

export const Search = () => {
    const [books, setBooks] = useState([])  
    const [authors, setAuthors] = useState([]) 
    const [series, setSeries] = useState([]) 

    const location = useLocation();

    let pattern = '';
    let type = '';

    if(location.state != null)
    {
        pattern = location.state.pattern;
        type = location.state.type;
    }

    const api = useAxios();

    const [spinner, setSpinner] = useState(true)

    const [displayBookRelatedMessage, setDisplayBookRelatedMessage] = useState("No books found!") 
    const [displayAuthorRelatedMessage, setDisplayAuthorRelatedMessage] = useState("No authors found!")  
    const [displaySeriesRelatedMessage, setDisplaySeriesRelatedMessage] = useState("No series found!")   

    const loc = useLocation();

    console.log('In SearchPage, pattern: ', pattern,', type: ', type)

    const getSearchResults = async () => {
        if(pattern === '')
            return;        
        api()
        .get(searchEndpoint(pattern, type), {
        })
        .then((response) => {
            console.log('search results: ', response.data);
            
            if(type === "book")
            {
                let matchedBooks = response.data
                setBooks(matchedBooks)
                setSpinner(false)
                setDisplayBookRelatedMessage("No books found!")
            }
            else if(type === "author")
            {
                let matchedAuthors = response.data
                setAuthors(matchedAuthors)
                setSpinner(false)
                setDisplayAuthorRelatedMessage("No authors found!")
            }
            else if(type === "series")
            {
                let matchedSeries = response.data
                setSeries(matchedSeries)
                setSpinner(false)
                setDisplaySeriesRelatedMessage("No series found!")
            }
        })
        .catch((error)=> {
            console.log('Error during fetch search results:', error)
            setDisplayBookRelatedMessage("Ops, error fetching books. Please try again later!")
            setDisplayAuthorRelatedMessage("Ops, error fetching authors. Please try again later!")
            setDisplaySeriesRelatedMessage("Ops, error fetching series. Please try again later!")
        });
    }

    useEffect(()=> {
        setSpinner(true);
        getSearchResults();
    }, [pattern, type])

    // console.log('In SearchPage, pattern: ', pattern,', type: ', type)

    if(type === "book")
        return (
            <Container fluid>
                <Row>
                    <Stack gap={1} className='search-result-book'>
                        {
                        <div className='search-result-book__body'>
                            <h3 className='primary-text'>Matched Books:</h3>
                            {(books && books.length <= 0 && !spinner) && <h5 className='primary-text'>{displayBookRelatedMessage}</h5>}
                            <BookShelfBookGallery books={books} booksPerRow={4} setBooks={setBooks} spinner={spinner} setSpinner={setSpinner}></BookShelfBookGallery>

                        </div>
                        }
                    </Stack>
                </Row>
            </Container>
    )

    if(type === "author")
        return (
            <Container fluid>
                <Row>
                    <Stack gap={1} className='search-result-author'>
                        {
                        <div className='search-result-author__body'>
                            <h3 className='primary-text'>Matched Authors:</h3>
                            {(authors && authors.length <= 0 && !spinner) && <h5 className='primary-text'>{displayAuthorRelatedMessage}</h5>}
                            <AuthorGallery authors={authors} authorsPerRow={4} spinner={spinner}></AuthorGallery>
                        </div>
                        }
                    </Stack>
                </Row>
            </Container>
    )

    if(type === "series")
        return (
            <Container fluid>
                <Row>
                    <Stack gap={1} className='search-result-series'>
                        {
                        <div className='search-result-series__body'>
                            <h3 className='primary-text'>Matched Series:</h3>
                            {(series && series.length <= 0 && !spinner) && <h5 className='primary-text'>{displaySeriesRelatedMessage}</h5>}
                            <SeriesGallery seriesList={series} seriesPerRow={4} spinner={spinner}></SeriesGallery>
                        </div>
                        }
                    </Stack>
                </Row>
            </Container>
    )
}

export default Search;