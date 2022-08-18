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
    const [reviews, setReviews] = useState(null)
    const api = useAxios();

    const [spinner, setSpinner] = useState(true)

    const loc = useLocation();

    const getReviewList = async () => {
        api()
        .get(bookshelfViewReviewsEndpoint(userID), {
        })
        .then((response) => {
            console.log('bookshelf view reviews:', response.data);
            let reviewFeedItemList = response.data
            setReviews(reviewFeedItemList)
            setSpinner(false)
        })
        .catch((error)=> {
            console.log('Error during fetch viewReviews:', error)
        });
    }

    useEffect(()=> {
        setSpinner(true);
        getReviewList();
    }, [loc.pathname])

    console.log('userID in BookShelf_ViewReviews: ', userID)
    return (
        <Container fluid>
            
        </Container>
    )
}
