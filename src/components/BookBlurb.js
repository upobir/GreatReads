import React from 'react';
import BookCapsule from './BookCapsule';
import BookAuthorsBlock from './BookAuthorsBlock';
import { Col,Row, Container, Stack } from 'react-bootstrap';


export const BookBlurb = ({ book, setBook }) => {

  return <Row className='book-blurb'>
    <Col xs ={3}>
      <BookCapsule book={book} setBook={setBook} id={book.id} />
    </Col>
    <Col xs={9} className='book-blurb__details'>
      <Stack gap={1} fluid >
        <h1 className='primary-text'>{book?.title}</h1>
        <BookAuthorsBlock book={book} />
        <p className='medium-text'>{book?.description}</p>
      </Stack>
    </Col>
  </Row>;
};
