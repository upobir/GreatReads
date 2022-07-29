import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import BookCapsule from './BookCapsule'
import {Spinner} from 'react-bootstrap';

export const BookGallery = ({books, booksPerRow})=>{
    if( books == null || books.length <= 0){
        return <Container>
            <Spinner animation="border" variant="primary" />
        </Container>
    }
    return <Row>
    {
        books.map((book, index) => {
            return (<Col xs={12/booksPerRow} key={index}>
                <BookCapsule book={book} id={book.id}/>
            </Col>)
        })
    }
    </Row>
}