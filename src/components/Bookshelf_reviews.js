import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import { bookshelfViewReviewsEndpoint } from '../endpoints';
import useAxios from "../utils/useAxios";
import { ReviewBlurb } from './ReviewBlurb';
import {Spinner} from 'react-bootstrap';
import { SimpleSpinner } from './SpinnerWrapper';
function convertRatingTo100Scale(rating) {
    return rating * 100 / 5;
}

export const BookShelf_ViewReviews = ({userID}) => {
    const [reviewFeedItems, setReviewFeedItems] = useState(null)
    const api = useAxios();

    const [spinner, setSpinner] = useState(true)

    const [displayMessage, setDisplayMessage] = useState("No reviews are here, yet. Try reviewing some books!")  

    const loc = useLocation();
    console.log('reviewFeedItems', reviewFeedItems)
    const getReviewFeedItemList = async () => {
        api()
        .get(bookshelfViewReviewsEndpoint(userID), {
        })
        .then((response) => {
            console.log('bookshelf view reviews:', response.data);
            let reviewFeedItemList = response.data
            setReviewFeedItems(reviewFeedItemList)
            setSpinner(false)
            setDisplayMessage("No reviews are here, yet. Try reviewing some books!")
        })
        .catch((error)=> {
            console.log('Error during fetch viewReviews:', error)
            setSpinner(false)
            setDisplayMessage("Ops, error fetching reviews. Please try again later!")
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

    if ( spinner )  { // ( books == null || books.length <= 0){
        return <Container>
            <Spinner animation="border" variant="primary" />
        </Container>
    }

    return (
        <Container fluid>
            <Row>
                <Stack gap={1} className='bookshelf-viewreviews'>
                    {
                    <div className='bookshelf-viewreviews__body'>
                        <h3 className='primary-text'>Reviews by this user:</h3>

                        {(reviewFeedItems && reviewFeedItems.length <= 0 && !spinner) && <h5 className='primary-text'>{ displayMessage }</h5>}
                        
                        {reviewFeedItems
                        ? <Stack gap={2}>
                        {
                            reviewFeedItems?.map( (reviewFeedItem, index) => {
                                return <ReviewBlurb reviewBlurbData={reviewFeedItem} setReviewBlurbData={setReviewBlurbData} />
                            })
                        }
                        </Stack>
                        : <SimpleSpinner/>}
                        
                    </div>
                    }
                </Stack>
            </Row>
        </Container>
    )
}
