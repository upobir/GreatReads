import React, {useState} from 'react'
import { Button, Container, Row, Col } from 'bootstrap'
import BookCapsule from './BookCapsule'
import useAxios from '../utils/useAxios'
import { bookshelfViewEndpoint } from '../endpoints'
import { useParams } from 'react-router-dom'
export const BookShelfTabContent = ({category}) => {
    const {bookShelf} = useParams()
    const [books, setBooks] = useState([])
    const api = useAxios();
    const { user } = useContext(AuthContext);

    const getBooks= () => {
        // api()
        // .get(bookshelfViewEndpoint())
    }
    const handleBookSet = (index, book) => {
        //check user_id and compare with one in URL to determing if we need an immediate removal
        if(user && user.user_id){
            if(book.category !== category){
                setBooks([
                    ...books.slice(0, index),
                    ...books.slice(index + 1)
                ]);
            }else{
                const mutatedBooks = [...books];
                mutatedBooks[index] = book;
                setBooks(mutatedBooks);
            }
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
