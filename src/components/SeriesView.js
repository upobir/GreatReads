import { useState, React, useEffect} from 'react'
import {Stack,Row, Col,Container, Carousel, CarouselItem} from 'react-bootstrap'
import BookCapsule from './BookCapsule';
import { seriesFetchEndpoint } from '../endpoints';
export const SeriesView = ({book, series}) => {
    console.log("seriesvi", series)
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

  
    
    const groupBooks = (booksInSeries) => { 
        console.log('booksInSeries', booksInSeries)
        let books_grouped = []
        let groupindex = 0;
        let group = []
        for (const seriesEntry of booksInSeries) { 
            if((groupindex++) >= 3){
                books_grouped.push(group)
                group = []
            } 
            group.push(seriesEntry)
        }
        if(books_grouped.length === 0){
            books_grouped.push(group)
        }
        console.log('books_grouped', books_grouped)
        return books_grouped
    }
  return (
    <Container>
        <Row>
            <p><strong className='inline-block text-high'>Book {book?.seriesEntry}</strong> <span>of</span></p>
            {series && <h3 className='primary-text'>{`${series.name} (${series.bookCount} books):`}</h3>}
        </Row>
        <Row>
            <Carousel className='book-carousel'>
                {series &&  series.books (
                    groupBooks(series.books).map((group) => { 
                    return <Carousel.Item>
                                <Container>
                                    <Row>
                                        {group.map((seriesEntry, index) => {
                                            return <Col xs = {4} key={index}>
                                                    <Stack gap={1}>
                                                        <BookCapsule book={seriesEntry}/>
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
        </Row>
    </Container>
  )
}

