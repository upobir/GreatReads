import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import { bookshelfViewReviewsEndpoint } from '../endpoints';
import useAxios from "../utils/useAxios";
import { ReviewBlurb } from './ReviewBlurb';

function convertRatingTo100Scale(rating) {
    return rating * 100 / 5;
}

export const BookShelf_ViewReviews = ({userID}) => {
    const [reviewFeedItems, setReviewFeedItems] = useState(null)
    const api = useAxios();

    const [spinner, setSpinner] = useState(true)

    const loc = useLocation();

    const getReviewFeedItemList = async () => {
        api()
        .get(bookshelfViewReviewsEndpoint(userID), {
        })
        .then((response) => {
            console.log('bookshelf view reviews:', response.data);
            let reviewFeedItemList = response.data
            setReviewFeedItems(reviewFeedItemList)
            setSpinner(false)
        })
        .catch((error)=> {
            console.log('Error during fetch viewReviews:', error)
        });
    }

    useEffect(()=> {
        setSpinner(true);
        getReviewFeedItemList();
    }, [loc.pathname])

    console.log('userID in BookShelf_ViewReviews: ', userID)

    const setReviewBlurbData = (feedItem, index) => {
        let mutatedReviewFeed = [...reviewFeedItems];
        mutatedReviewFeed[index] = feedItem;
        setReviewFeedItems(mutatedReviewFeed);
    }

    return (
        <Container fluid>
            <Row>
                <Stack gap={1} className='bookshelf-viewreviews'>
                    {
                    <div className='bookshelf-viewreviews__body'>
                        <h3 className='primary-text'>Reviews by this user:</h3>
                        
                        <Stack gap={2}>
                        {
                            reviewFeedItems?.map( (reviewFeedItem, index) => {
                                return <ReviewBlurb reviewBlurbData={reviewFeedItem} setReviewBlurbData={setReviewBlurbData} />
                            })
                        }
                        </Stack>
                    </div>
                    }
                </Stack>
            </Row>
        </Container>
    )
}
