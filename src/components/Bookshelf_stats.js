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
        <Container fluid>
            <Row>
                <Stack gap={1} className='bookshelf-stats'>
                    {
                    <div className='bookshelf-stats__body'>
                        <h5 className='primary-text'>Stats</h5>
                        <p>Books currently reading:</p>
                        <p>{reading_count}</p>
                        <p>Books already read:</p>
                        <p>{read_count}</p>
                        <p>Books to be read:</p>
                        <p>{wantToRead_count}</p>
                        <p>Reviews:</p>
                        <p>{reviews_count}</p>
                        <p>Ratings:</p>
                        <p>{ratings_count}</p>
                    </div>
                    }
                </Stack>
            </Row>
        </Container>
    )
}
