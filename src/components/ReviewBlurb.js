import React from 'react';
import { Link } from 'react-router-dom';
import { bookDetailsURL, userDetailsURL,reviewDetailsURL } from '../urls';
import { Rating } from 'react-simple-star-rating';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { Container, Stack } from 'react-bootstrap';
import { BookBlurb } from './BookBlurb';

function convertRatingTo100Scale(rating) {
  return rating * 100 / 5;
}
export const ReviewBlurb = ({ reviewBlurbData, setReviewBlurbData }) => {
  // console.log('reviewBlurbData.review.id', reviewBlurbData.review)
  const setBook = (_book) => {
    let mutatedReviewBlurbData= reviewBlurbData
    mutatedReviewBlurbData.book = _book
    setReviewBlurbData(mutatedReviewBlurbData)
  }
  return <Container fluid className="feed-item  text-decoration-none link-color-unset" >
    <Stack  gap={2} >
      <Stack direction='horizontal' className='feed-item__header'>
        <Stack direction='horizontal' className='feed-item__header__left' gap={1}>
          <Link to={userDetailsURL(reviewBlurbData.user)}>{reviewBlurbData.user.name}</Link>
          <span className='light-text'>reviewed</span>
          <Rating readonly={true} size={30} ratingValue={convertRatingTo100Scale(reviewBlurbData.review.rating)} />
        </Stack>
        <span className='text-medium'>{reviewBlurbData.timeStamp}</span>
      </Stack>
      {/* <Container fluid > */}
      {reviewBlurbData.review.blurb &&
        <Stack fluid direction='horizontal' className='review-blurb__quote-block'>
          <FaQuoteLeft fontSize={30} />
           <div>{reviewBlurbData.review.blurb}</div>
          <FaQuoteRight fontSize={30} />
        </Stack>
      }
      {/* </Container> */}
      <BookBlurb book={reviewBlurbData.book} setBook={setBook} />
      
    </Stack>
  </Container>;
};
