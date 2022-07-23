import React, {useState} from 'react'
import { Button, Container, Row, Col } from 'bootstrap'
import BookCapsule from './BookCapsule'
export const BookShelfTabContent = ({category}) => {
    const [books, setBooks] = useState([])
    /**
     * 
     * @param {*} index 
     */
    const handleBookSet = (index, book) => {
        if(book.category !== category){
            setBooks([
                ...books.slice(0, index),
                ...books.slice(index + 1)
              ]);
        }else{
            const mutatedBooks = [...books];
            mutatedBooks[index] = book;
            setBooks(updatedAreas);
        }
    } 
    return (
        <Container>
            <Row>
                {books.map((book, index) => {
                    <Col xs= {3} key={book.id}>
                        <BookCapsule 
                            book={book} 
                            setBook={(book) => handleBookSet(index, book)}
                        />
                    </Col>
                })}
                
            </Row>
        </Container>
    )
}
