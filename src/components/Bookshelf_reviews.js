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
                                return <ReviewBlurb reviewBlurbData={reviewFeedItem} />
                            })

                            // reviews?.map( (review, index) => {
                            //     return <Container fluid className="feed-item  text-decoration-none link-color-unset" >
                            //     <Stack  gap={2} >

                            //       <Stack direction='horizontal' className='feed-item__header'>
                            //         <Stack direction='horizontal' className='feed-item__header__left' gap={1}>
                            //           <Link to={userDetailsURL(review.user)}>{review.user.name}</Link>
                            //           <span className='light-text'>reviewed</span>
                            //           <Rating readonly={true} size={30} ratingValue={convertRatingTo100Scale(review.review.rating)} />
                            //         </Stack>
                            //         <span className='text-medium'>{review.timeStamp}</span>
                            //       </Stack>

                            //       {/* <Container fluid > */}
                            //       {review.review.blurb &&
                            //         <Stack  direction='horizontal' className='review-blurb__quote-block'>
                            //           <FaQuoteLeft fontSize={30} />
                            //            <div>{review.review.blurb}</div>
                            //           <FaQuoteRight fontSize={30} />
                            //         </Stack>
                            //       }                                  
                            //     </Stack>
                            //   </Container>;
                            // })
                        }
                        </Stack>
                    </div>
                    }
                </Stack>
            </Row>
        </Container>
    )
}
