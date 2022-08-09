import React from 'react';
import { Link } from 'react-router-dom';
import { userDetailsURL } from '../urls';
import { Stack, Container } from 'react-bootstrap';
import { BookBlurb } from './BookBlurb';
import { bookDetailsURL } from '../urls';
function bookReadStatusToUpdateText(bookReadStatus) {
  switch (bookReadStatus) {
    case 'read':
      return 'finished reading';
    case 'reading':
      return 'is reading';
    case 'wishlisted':
      return 'wants to read';
  }
  return '';
}
export const BookReadUpdate = ({ bookReadUpdateData }) => {
  console.log('bookReadUpdateData', bookReadUpdateData);
  return (
  <Container fluid className="feed-item text-decoration-none link-color-unset"
             as={Link} to={bookDetailsURL(bookReadUpdateData.book.id)}>
    <Stack gap={1} >
      <Stack direction='horizontal' className='feed-item__header'>
        <Stack direction='horizontal' className='feed-item__header__left' gap={1}>
          <Link to={userDetailsURL(bookReadUpdateData.user)}>{bookReadUpdateData.user.name}</Link>
          <span className='light-text'>{bookReadStatusToUpdateText(bookReadUpdateData.readStatus)}</span>
        </Stack>
        <span className='high-text'>{bookReadUpdateData.timeStamp}</span>
      </Stack>
      <BookBlurb book={bookReadUpdateData.book} />
    </Stack>
  </Container>
  );
};
