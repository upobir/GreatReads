import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { authorFetchEndpoint, bookFetchEndpoint, seriesFetchEndpoint } from '../endpoints';
import BookCapsule from './BookCapsule';
import AuthorPreview from './AuthorPreview';
import GenreBlock from './GenreBlock';
import {Row, Col, Container, Tabs, Tab, Stack, TabContainer, Navbar} from 'react-bootstrap'
import 'holderjs'
import Pagination from 'react-bootstrap/Pagination';
import { BookReviews } from './BookReviews';
import { _similar_books } from '../helper';
import { SeriesView } from './SeriesView';
import {SimilarBooksView} from './SimilarBooksView'
import { BookReview } from './BookReview';
import { ReviewPopup } from './ReviewPopup';
import BookAuthorsBlock from './BookAuthorsBlock';
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";   // for private api endpoints

const BookDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [author, setAuthor] = useState(null)
    const [series, setSeries] = useState(null)

    let { user } = useContext(AuthContext);
    const api = useAxios();                 // for private api endpoints

    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const handleReviewPopupShow = () => setShowReviewPopup(true);
    const handleReviewPopupClose = () => setShowReviewPopup(false);
  

    const getIfLoggedIn = async () => { 
        let response = await api(bookFetchEndpoint(id))     // for private api endpoints (api instead of fetch)
        let book = response.data
        console.log('book', book)
        setBook(book)
        
        response = await api(authorFetchEndpoint(book.authors[0].id))      // for private api endpoints (api instead of fetch)
        let author = response.data
        setAuthor(author)
        
        if(book.series != null){
            response = await api(seriesFetchEndpoint(book.series))      // for private api endpoints (api instead of fetch)
            let jseries = response.data
            console.log('series', jseries)
            setSeries(jseries) 
        } 
     }

     const getIfNotLoggedIn = async () => { 
        let response = await fetch(bookFetchEndpoint(id))     // for private api endpoints (api instead of fetch)
        let book = await response.json()
        console.log('book', book)
        setBook(book)
        
        response = await fetch(authorFetchEndpoint(book.authors[0].id))      // for private api endpoints (api instead of fetch)
        let author = await response.json()
        setAuthor(author)

        if(book.series != null){
            response = await fetch(seriesFetchEndpoint(book.series))      // for private api endpoints (api instead of fetch)
            let jseries = await response.json()
            console.log('series', jseries)
            setSeries(jseries)  
        }
     }

    useEffect(() => {
        if (user) {
            getIfLoggedIn();
        } else {
            getIfNotLoggedIn();
        }
    }, [])

    
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
                            {
                                (book?.series) && <Tab eventKey="series" title="Series"></Tab>
                            }
                            <Tab eventKey="similar_books" title="Similar Books">
                            </Tab>
                        </Tabs>
                        <Routes>                            
                            {
                                (book?.series) && <Route path="/series" element={<SeriesView book={book} series={series} />} />
                            }
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
