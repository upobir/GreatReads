import React,{useContext} from 'react'
import { Stack, Row, Col, Container } from 'react-bootstrap'
import BookCapsule from './BookCapsule'
import {Spinner} from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
const numInGroup = 4

function groupBooks (booksToGroup) {
    // console.log('booksInSeries', booksToGroup);
    let books_grouped = [];
    let numInCurGroup = 0;
    let group = [];
    for (const b of booksToGroup) {
        group.push(b);
        if ((++numInCurGroup) >= numInGroup) {
            books_grouped.push(group);
            group = [];
            numInCurGroup = 0;
        }
    }
    if (books_grouped.length === 0) {
        books_grouped.push(group);
    }
    // console.log('books_grouped', books_grouped);
    return books_grouped;
};

export const BookGallery = ({books, booksPerRow, setBooks})=>{
    const { user } = useContext(AuthContext);
    const handleBookSet = (index, book) => {
        // console.log('handlebookset', books, ' index ', index)
        // console.log('user', user)
        if(user){
            let mutatedBooks = [...books];
            mutatedBooks[index] = book;
            setBooks(mutatedBooks);
        }
    } 
    if( books == null || books.length < 0){
        return <Container>
            <Spinner animation="border" variant="primary" />
        </Container>
    }
    // .map((group, groupIndex)=> {
    //     return (<Row key={groupIndex}>
    //         group.map((book, index) => {
    //             return (<Col xs={4} key={index}>
    //                 <BookCapsule 
    //                     book={book} 
    //                     id={book.id} 
    //                     setBook={(book) => handleBookSet(index, book)}
    //                     mini={true}
    //                     />
    //             </Col>)
    //         })
    //         </Row>
    //     )
    return <>
        <Stack gap={4}>
        {groupBooks(books).map((group, groupIndex) => {
                return (<Row key={groupIndex} className='book-gallery__row'>
                {group.map((book, index) =>
                    <Col xs={12/booksPerRow} key={index} className='book-gallery__col'>
                    <BookCapsule
                        book={book}
                        id={book.id}
                        setBook={(book) => handleBookSet(index, book)}
                        mini={true}
                        />
                </Col>)}
            </Row>)
            })
        }
        </Stack>

    </>

    
}