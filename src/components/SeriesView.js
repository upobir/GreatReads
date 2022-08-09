import { useState, React, useEffect} from 'react'
import {Stack,Row, Col,Container, Carousel, CarouselItem, Button} from 'react-bootstrap'
import BookCapsule from './BookCapsule';
import { seriesFetchEndpoint } from '../endpoints';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
const numInGroup = 3;

function getGroupCount(seriesLen){
    return Math.ceil(seriesLen / numInGroup) ;
}

export const SeriesView = ({book, series, setSeries}) => {
    const [carouselIndex, setIndex] = useState(0);
    const [groupedBooks,setGroupedBooks] = useState([])
    
    const incrementIndex=()=>{
        if(series && groupedBooks.length > 0)
            setIndex((carouselIndex + 1 + groupedBooks.length)%groupedBooks.length);
    }

    const decrementIndex=()=>{
        if(series && groupedBooks.length > 0)
            setIndex((carouselIndex - 1 + groupedBooks.length)%getGroupCount(groupedBooks.length));
    }
    // console.log('seriesView ', series )
    // console.log('seriesView book', book )
  
    const setBook= (book, groupIndex, indexInGroup)=> {
        let index = groupIndex * numInGroup + indexInGroup;
        let seriesBooks = series.books
        let mutatedSeriesBooks = [...seriesBooks];
        mutatedSeriesBooks[index] = book;
        setSeries({books: mutatedSeriesBooks});
    }
    
    const groupBooks = (booksInSeries) => { 
        console.log('booksInSeries', booksInSeries)
        let books_grouped = []
        let numInCurGroup = 0;
        let group = []
        for (const seriesEntry of booksInSeries) { 
            group.push(seriesEntry)
            if((++numInCurGroup) >= numInGroup){
                books_grouped.push(group)
                group = []
            } 
        }
        if(books_grouped.length === 0){
            books_grouped.push(group)
        }
        console.log('books_grouped', books_grouped)
        return books_grouped
    }
    useEffect (()=> {
        if(series)
            setGroupedBooks(groupBooks(series.books))
        console.log('groupedBooks', groupedBooks)
        console.log('groupedBooks.length > 0', (groupedBooks.length > 0))
    }, [series])
  return (
    <Container>
        <Row>
        {series &&
            <>
                <p><strong className='inline-block text-high'>Book {book?.seriesEntry}</strong> <span>of</span></p>
                 <h3 className='primary-text'>{`${series.name} (${series.bookCount} books):`}</h3>
            </>}
        </Row>
        <Row>
        <Stack direction='horizontal' gap ={.5}>
                {groupedBooks.length > 1 && <Button onClick={incrementIndex}>
                      <FaArrowLeft fontSize="1.4rem" />
                </Button>}
            <Carousel  activeIndex={carouselIndex} className='book-carousel'>
                {series &&  series.books && (
                    groupedBooks.map((group, groupIndex) => { 
                    return <Carousel.Item  key={groupIndex} >
                                    <Container fluid>
                                        <Row>

                                            {group.map((seriesEntry, index) => {
                                                return <Col xs={4} key={index}>
                                                    <Stack gap={1}>
                                                        <BookCapsule book={seriesEntry} id={seriesEntry.id} setBook={(b) => setBook(b, groupIndex, index)} />
                                                        <Container >
                                                            <p>
                                                                {seriesEntry.title}
                                                            </p>
                                                            <p>{`(Book ${seriesEntry.seriesEntry})`}</p>
                                                        </Container>
                                                    </Stack>
                                                </Col>
                                            })}
                                        </Row>
                                    </Container>
                                </Carousel.Item>
                            
                }))}
            </Carousel>
            {groupedBooks.length > 1 && <Button onClick={decrementIndex}>
                <FaArrowRight fontSize="1.4rem"/>
            </Button>}
            </Stack>
        </Row>
    </Container>
  )
}

