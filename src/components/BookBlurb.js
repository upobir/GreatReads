import React from 'react';
import BookCapsule from './BookCapsule';
import BookAuthorsBlock from './BookAuthorsBlock';
import { Container, Stack } from 'react-bootstrap';


export const BookBlurb = ({ book, setBook }) => {

  return <Stack direction='horizontal' className='book-blurb'>
    <BookCapsule book={book} setBook={setBook} id={book.id} />
    <Container>
      <Stack gap={1}>
        <h1 className='primary-text'>{book?.title}</h1>
        <BookAuthorsBlock book={book} />
        <p className='medium-text'>{book?.description}</p>
      </Stack>
    </Container>
  </Stack>;
};
