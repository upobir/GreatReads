import React from 'react';
import { Link } from 'react-router-dom';
import { userDetailsURL } from '../urls';
import { Stack, Container } from 'react-bootstrap';
import { BookBlurb } from './BookBlurb';
import { bookDetailsURL } from '../urls';
import { timestampToString } from '../utils/TimestampHelper';
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
export const BookReadUpdate = ({ bookReadUpdateData,setBookReadUpdateData }) => {
  console.log('bookReadUpdateData', bookReadUpdateData);
  console.log('bookReadUpdateData.user.id', bookReadUpdateData.user.id)
  const setBook = (_book) => {
    let mutatedBookReadUpdateData= bookReadUpdateData
    mutatedBookReadUpdateData.book = _book
    setBookReadUpdateData(mutatedBookReadUpdateData)
  }
  return (
  <Container fluid className="feed-item text-decoration-none link-color-unset">
    <Stack gap={1} >
      <Stack direction='horizontal' className='feed-item__header'>
        <Stack direction='horizontal' className='feed-item__header__left' gap={1}>
          <Link to={userDetailsURL(bookReadUpdateData.user.id)}>{bookReadUpdateData.user.username}</Link>
          <span className='light-text'>{bookReadStatusToUpdateText(bookReadUpdateData.readStatus)}</span>
        </Stack>
        <span className='high-text'>{timestampToString(bookReadUpdateData.timeStamp)}</span>
      </Stack>
      <BookBlurb book={bookReadUpdateData.book} setBook={setBook} />
    </Stack>
  </Container>
  );
};
