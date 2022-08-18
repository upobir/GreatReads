import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack, Button } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom'
import { BookShelfBookGallery } from './Bookshelf_BookGallery';
import { bookshelfStatsEndpoint } from '../endpoints';
import useAxios from "../utils/useAxios";

export const BookShelf_stats = ({userID}) => {
    const [reading_count, setReading_count] = useState(0)  
    const [read_count, setRead_count] = useState(0) 
    const [wantToRead_count, setWantToRead_count] = useState(0) 
    const [reviews_count, setReviews_count] = useState(0) 
    const [ratings_count, setRatings_count] = useState(0)

    const api = useAxios();

    const [spinner, setSpinner] = useState(true)

    const loc = useLocation();

    const getBookShelfStats = async () => {
        api()
        .get(bookshelfStatsEndpoint(userID), {
        })
        .then((response) => {
            console.log('stats', response.data);
            let bookShelfStats = response.data
            setRead_count(bookShelfStats.read_count)
            setReading_count(bookShelfStats.reading_count)
            setWantToRead_count(bookShelfStats.wantToRead_count)
            setReviews_count(bookShelfStats.reviews_count)
            setRatings_count(bookShelfStats.ratings_count)
            setSpinner(false)
        })
        .catch((error)=> {
            console.log('Error during fetch bookshelf stats:', error)
        });
    }

    useEffect(()=> {
        setSpinner(true);
        getBookShelfStats();
    }, [loc.pathname])

    console.log('userID in BookShelf_Stats: ', userID)
    return (
        <Container fluid className='bookshelf-stats'>
            <Row>
                <Stack gap={1}>
                    {
                    <Stack gap={2} className='bookshelf-stats__body'>
                        <h3 className='primary-text'>Stats</h3>
                        <h5 className='medium-text'>Currently reading:</h5>
                        <h5 className='high-text'>{reading_count}</h5>
                        <h5 className='medium-text'>Read:</h5>
                        <h5>{read_count}</h5>
                        <h5 className='medium-text'>Want to read:</h5>
                        <h5>{wantToRead_count}</h5>
                        <h5 className='medium-text'>Reviewed:</h5>
                        <h5>{reviews_count}</h5>
                        <h5 className='medium-text'>Rated:</h5>
                        <h5>{ratings_count}</h5>
                    </Stack>
                    }
                </Stack>
            </Row>
        </Container>
    )
}
