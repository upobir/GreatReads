import React,{useContext} from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import BookCapsule from './BookCapsule'
import {Spinner} from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
export const BookShelfBookGallery = ({books, booksPerRow, setBooks, spinner, setSpinner})=>{
    const { user } = useContext(AuthContext);
    console.log('books', books)
    const handleBookSet = (index, book) => {
        // console.log('handlebookset', books, ' index ', index)
        // console.log('user', user)
        if(user){
            let mutatedBooks = [...books];
            mutatedBooks[index] = book;
            setBooks(mutatedBooks);
            setSpinner( ! spinner);
        }
    } 
    if ( spinner )  { // ( books == null || books.length <= 0){
        return <Container>
            <Spinner animation="border" variant="primary" />
        </Container>
    }
    return <Row>
    {
        books.map((book, index) => {
            return (<Col xs={12/booksPerRow} key={index}>
                <BookCapsule book={book} id={book.id} setBook={(book) => handleBookSet(index, book)}/>
            </Col>)
        })
    }
    </Row>
}