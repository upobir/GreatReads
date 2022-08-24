import { useState, React, useEffect } from 'react';
import { Stack, Row, Col, Container, Carousel, Button } from 'react-bootstrap';
import BookCapsule from './BookCapsule';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const numInGroup = 3;
function getGroupCount(seriesLen) {
    return Math.ceil(seriesLen / numInGroup);
}
//because bootstrap carousel is shitty
export const BookCarousel = ({ books, setBooks, showSeriesEntry }) => {
    const [carouselIndex, setIndex] = useState(0);
    const [groupedBooks, setGroupedBooks] = useState([]);

    const incrementIndex = () => {
        if (books && groupedBooks.length > 0)
            setIndex((carouselIndex + 1 + groupedBooks.length) % groupedBooks.length);
    };

    const decrementIndex = () => {
        if (books && groupedBooks.length > 0)
            setIndex((carouselIndex - 1 + groupedBooks.length) % groupedBooks.length);
    };
    console.log('carousel   seriesView ', books )
    // console.log('seriesView book', book )
    const setBook = (book, groupIndex, indexInGroup) => {
        let index = groupIndex * numInGroup + indexInGroup;
        let _books = books;
        let mutatedBooks = [..._books];
        mutatedBooks[index] = book;
        setBooks(mutatedBooks);
    };

    const groupBooks = (booksToGroup) => {
        console.log('booksInSeries', booksToGroup);
        let books_grouped = [];
        let numInCurGroup = 0;
        let group = [];
        for (const b of booksToGroup) {
            group.push(b);
            if ((++numInCurGroup) >= numInGroup) {
                books_grouped.push(group);
                group = [];
            }
        }
        if (books_grouped.length === 0) {
            books_grouped.push(group);
        }
        console.log('books_grouped', books_grouped);
        return books_grouped;
    };
    useEffect(() => {
        if (books){
            console.log('books', books)
            setGroupedBooks(groupBooks( books));
        }//hack
    }, [books]);

    return <Stack direction='horizontal' gap={.5}>
        {groupedBooks.length > 1 && <Button onClick={decrementIndex}>
            <FaArrowLeft fontSize="1.4rem" />
        </Button>}
        <Carousel activeIndex={carouselIndex} className='book-carousel'>
            {books && (
                groupedBooks.map((group, groupIndex) => {
                    return <Carousel.Item key={groupIndex}>
                        <Container fluid>
                            <Row>
                                {group.map((b, index) => {
                                    return <Col xs={4} key={index}>
                                        <Stack gap={1} className='book-carousel__book-group'>
                                            <BookCapsule 
                                                mini 
                                                book={b} 
                                                id={b.id} 
                                                setBook={(b) => setBook(b, groupIndex, index)} />
                                            {showSeriesEntry && b.seriesEntry && <Container>
                                                <p>
                                                    {b.title}
                                                </p>
                                                <p>{`(Book ${b.seriesEntry})`}</p>
                                            </Container>}
                                        </Stack>
                                    </Col>;
                                })}
                            </Row>
                        </Container>
                    </Carousel.Item>;

                }))}
        </Carousel>
        {groupedBooks.length > 1 && <Button onClick={incrementIndex}>
            <FaArrowRight fontSize="1.4rem" />
        </Button>}
    </Stack>;
};
