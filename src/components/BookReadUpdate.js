import React from 'react';
import { Link } from 'react-router-dom';
import { userDetailsURL } from '../urls';
import { Stack } from 'react-bootstrap';
import { BookBlurb } from './BookBlurb';

function bookReadStatusToUpdateText({ bookReadStatus }) {
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
  return <Stack gap={1}>
    <Stack direction='horizontal' className='FeedItem__header'>
      <Stack direction='horizontal' className='FeedItem__header__left'>
        <Link to={userDetailsURL(bookReadUpdateData.user)}>{bookReadUpdateData.user.name}</Link>
        <span className='light-text'>{bookReadStatusToUpdateText(bookReadUpdateData.readStatus)}</span>
      </Stack>
    </Stack>
    <BookBlurb book={bookReadUpdateData.book} />
  </Stack>;
};
