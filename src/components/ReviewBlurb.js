import React from 'react';
import { Link } from 'react-router-dom';
import { bookDetailsURL, userDetailsURL,reviewDetailsURL } from '../urls';
import { Rating } from 'react-simple-star-rating';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { Container, Stack } from 'react-bootstrap';
import { BookBlurb } from './BookBlurb';
import { timestampToString } from '../utils/TimestampHelper';
function convertRatingTo100Scale(rating) {
  return rating * 100 / 5;
}
function spliceReviewText(text){
  return text?.substring(0, 200);
}
export const ReviewBlurb = ({ reviewBlurbData, setReviewBlurbData }) => {
  const setBook = (_book) => {
    let mutatedReviewBlurbData= reviewBlurbData
    mutatedReviewBlurbData.book = _book
    setReviewBlurbData(mutatedReviewBlurbData)
  }
  return <Container fluid className="feed-item  text-decoration-none link-color-unset" >
    <Stack  gap={2} >
      <Stack direction='horizontal' className='feed-item__header'>
        <Stack direction='horizontal' className='feed-item__header__left' gap={1}>
          <Link to={userDetailsURL(reviewBlurbData.review.reviewerId)}>{reviewBlurbData.review.reviewer}</Link>
          <span className='light-text'>reviewed</span>
          <Rating readonly={true} size={30} ratingValue={convertRatingTo100Scale(reviewBlurbData.review.rating)} />
        </Stack>
        <span className='text-medium'>{timestampToString(reviewBlurbData.review.Timestamp)}</span>
      </Stack>
      {/* <Container fluid > */}
      { reviewBlurbData.review.body &&
        <Stack  direction='horizontal' className='review-blurb__quote-block'>
          <FaQuoteLeft fontSize={30} />
           <div>{ spliceReviewText(reviewBlurbData.review.body)}</div>
          <FaQuoteRight fontSize={30} />
        </Stack>
      }
      {/* </Container> */}
      <BookBlurb book={reviewBlurbData.book} setBook={setBook} />
      
    </Stack>
  </Container>;
};
