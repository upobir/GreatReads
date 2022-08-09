import { useState, React} from 'react'
import {Stack,Row, Col,Container, Carousel, CarouselItem} from 'react-bootstrap'
import BookCapsule from './BookCapsule';
import { BookCarousel } from './BookCarousel';
export const SimilarBooksView = ({similarBooks,setSimilarBooks}) => {

  return (
    <Container>
        <Row>
            <h3 className='text-high'>Readers also enjoyed:</h3>
        </Row>
        <Row>
            <BookCarousel series={similarBooks} setSimilarBooks={setSimilarBooks}></BookCarousel>
        </Row>
    </Container>
  )
}

