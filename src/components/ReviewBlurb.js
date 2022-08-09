import React from 'react';
import { Link } from 'react-router-dom';
import { userDetailsURL } from '../urls';
import { Rating } from 'react-simple-star-rating';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { Container, Stack } from 'react-bootstrap';
import { BookBlurb } from './BookBlurb';

function convertRatingTo100Scale(rating) {
  return rating * 100 / 5;
}
export const ReviewBlurb = ({ reviewBlurbData }) => {
  return <Stack gap={1}>
    <Stack direction='horizontal' className='FeedItem__header'>
      <Stack direction='horizontal' className='FeedItem__header__left' gap={1}>
        <Link to={userDetailsURL(reviewBlurbData.user)}>{reviewBlurbData.user.name}</Link>
        <span className='light-text'>reviewed</span>
        <Rating readonly={true} ratingValue={convertRatingTo100Scale(reviewBlurbData.review.rating)} />
      </Stack>
      <span className='text-medium'>{reviewBlurbData.timeStamp}</span>
    </Stack>
    <Container>
      <Stack direction='horizontal'>
        <FaQuoteLeft fontSize={20} />
        {reviewBlurbData.review.blurb && <span>{reviewBlurbData.review.blurb}</span>}
        <FaQuoteRight fontSize={20} />
      </Stack>
    </Container>
    <BookBlurb book={reviewBlurbData.book} />
  </Stack>;
};
