import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { authorFetchEndpoint, bookFetchEndpoint } from '../endpoints';
import BookCapsule from './BookCapsule';
import AuthorPreview from './AuthorPreview';
import GenreBlock from './GenreBlock';
import {Row, Col, Container, Tabs, Tab, Stack, TabContainer, Navbar} from 'react-bootstrap'
import 'holderjs'
import Pagination from 'react-bootstrap/Pagination';
import { BookReviews } from './BookReviews';
import { SeriesView } from './SeriesView';
import {SimilarBooksView} from './SimilarBooksView'
import { BookReview } from './BookReview';
import { ReviewPopup } from './ReviewPopup';
import BookAuthorsBlock from './BookAuthorsBlock';

const BookDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [author, setAuthor] = useState(null)
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const handleReviewPopupShow = () => setShowReviewPopup(true);
    const handleReviewPopupClose = () => setShowReviewPopup(false);
    console.log(' BookDetails id', id)
    const getAll = async () => { 
        let response = await fetch(bookFetchEndpoint(id))
        let book = await response.json()
        console.log('book', book)
        setBook(book)
        
        response = await fetch(authorFetchEndpoint(book.authors[0].id))
        let author = await response.json()
        setAuthor(author)
     }
    useEffect(() => {
        getAll()
    }, [])

    let _series =
    { 
        "name": "The Stormlight Archive",
        "avgRating": 4.45,    
        "entries": [        
            {
                "seriesEntry" : 0,
                "title": "lorem",
                "readStatus": "read",
                "avgRating" : 4,
            },
            {
                "seriesEntry" : 1,
                "title": "ipsum",
                "readStatus": "read",
                "avgRating" : 4
            },
            {
                "seriesEntry" : 3,
                "title": "The Way of Kings",
                "readStatus": "reading",
                "avgRating" : 4
            },
            {
                "seriesEntry" : 4,
                "title": "sit",
                "readStatus": "read",
                "avgRating" : 4
            },
            {
                "seriesEntry" : 5,
                "title": "ipsum",
                "readStatus": "read",
                "avgRating" : 5
            }
        ]
    }
    let _similar_books = _series.entries

    
    const handleTabChange = (eventKey, e) => {
        console.log('eventKey', eventKey)
        console.log('e', e)
        navigate(eventKey); // "/home/firsttab" <-> "/home/secondtab"
      };
    return (
        <>
            <div className='book-details'>
                <Container fluid className='book-details__left-col'>
                    <Col xs={2} className='allow-click-self book-details__left-col__inner' >
                        <BookCapsule book={book}/>
                        <div className='review-summary-block'>
                            <h1> {book?.avgRating}/5 </h1>
                            <p>from {book?.reviewCount} reviews</p>
                            <button className='review-summary-block__write-review-btn' onClick={handleReviewPopupShow}> Write a review </button>
                        </div>
                    </Col>
                </Container>
                <Container fluid  className='book-details__right-col'>
                    <Col xs={{span:3,offset:9 }} className='allow-click-self'>
                        <AuthorPreview author={author}/>
                    </Col>
                </Container>

                <Container fluid  className='book-details__mid-col-top'>
                    <Col xs={{span:7,offset:2 }} className='book-details__mid-col-top-header' id='book-details-mid-header'>
                        <h1 className='primary-text'>{book?.title}</h1>
                        
                        <Stack direction="horizontal" gap = {1}>
                        <span className='inline-block light-text'>by</span>
                            <BookAuthorsBlock book={book}/>
                        </Stack>

                    </Col>
                </Container>
                <Container fluid className='book-details__mid-col-bottom'>
                    <Col xs={{span:7,offset:2 }}>
     
                        <p>{book?.description}</p>
                        <Row><Col xs={2}className="medium-text">ISBN:</Col><Col>{book?.isbn}</Col></Row>
                        <Row><Col xs={2}className="medium-text">Pages:</Col><Col>{book?.pageCount}</Col></Row>
                        <Row><Col xs={2}className="medium-text">Released:</Col><Col>{book?.released}</Col></Row>
                        {/* <p><span className="medium-text">Language:</span> {book.isbn}</p> */}
                        <GenreBlock genres={book?.genres}/>

                        <Tabs defaultActiveKey="reviews" onSelect={handleTabChange} className="book-details__tab-bar">
                            <Tab eventKey="reviews" title="Reviews">
                            </Tab>
                            <Tab eventKey="series" title="Series">
                            </Tab>
                            <Tab eventKey="similar_books" title="Similar Books">
                            </Tab>
                        </Tabs>
                        <Routes>
                            <Route path="/series" element={<SeriesView book={book} series={_series}/>} />
                            <Route path="/similar_books" element={<SimilarBooksView similarBooks={_similar_books}/>} />
                            <Route path="/review/:review_id/*" element={<BookReview bookID={id}/>}></Route>
                            <Route path="" element={<BookReviews book={book}/>} />
                            <Route path="/reviews" element={<BookReviews bookID={id}/>} />
                            
                        </Routes>                    
                    </Col>
                </Container>
            </div>
            <ReviewPopup showState={showReviewPopup} handleClose={handleReviewPopupClose} />
        </>

    )
}
export default BookDetails
