import { React} from 'react'
import {Row, Container, CarouselItem} from 'react-bootstrap'
import { seriesFetchEndpoint } from '../endpoints';
import { BookCarousel } from './BookCarousel';
import { SimpleSpinner } from './SpinnerWrapper';
export const SeriesView = ({book, series, setSeries}) => {
    const handleSeriesUpdate = (mutatedBooks) => {
        setSeries({books: mutatedBooks});
    }
    if(series == null)
        return <SimpleSpinner />
    
    return (
        <Container>
            <Row>
            {series &&
                <>
                    {book && <p><strong className='inline-block text-high'>Book {book.seriesEntry}</strong> <span>of</span></p>}
                    <h3 className='primary-text'>{`${series.name} (${series.bookCount} books):`}</h3>
                </>}
            </Row>
            <Row>
                <BookCarousel series={series} setSeries={handleSeriesUpdate}/>     
            </Row>
        </Container>
    )
}

