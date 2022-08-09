import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { authorFetchEndpoint, bookFetchEndpoint, seriesFetchEndpoint } from '../endpoints';
import BookCapsule from './BookCapsule';
import AuthorPreview from './AuthorPreview';
import GenreBlock from './GenreBlock';
import {Row, Col, Container, Tabs, Tab, Stack, Button,TabContainer, Navbar} from 'react-bootstrap'
import { BookReviews } from './BookReviews';
import { _similar_books } from '../PlaceHolder';
import { SeriesView } from './SeriesView';
import {SimilarBooksView} from './SimilarBooksView'
import { BookReview } from './BookReview';
import { ReviewPopup } from './ReviewPopup';
import BookAuthorsBlock from './BookAuthorsBlock';
import useAxios from "../utils/useAxios";   // for private api endpoints
import { SpinnerWrapper } from './SpinnerWrapper';

const BookDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [author, setAuthor] = useState(null)
    const [series, setSeries] = useState(null)
    const [similarBooks, setSimilarBooks] = useState(_similar_books)

    const api = useAxios();                 // for private api endpoints

    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const handleReviewPopupShow = () => setShowReviewPopup(true);
    const handleReviewPopupClose = () => setShowReviewPopup(false);
  

    const getData = async () => { 
        api()
        .get(bookFetchEndpoint(id))
        .then((response) => {
            let _book = response.data;
            console.log('book', _book);
            setBook( _book);

            if(_book.authors && _book.authors.length > 0){
                api()
                .get(authorFetchEndpoint(_book.authors[0].id))
                .then((response) => {
                    let _author = response.data
                    console.log('_author', _author);
                    setAuthor(_author)
                })
                .catch(error => {
                    console.log('author fetch error', error)
                });
            }

            if(_book.series != null){
                api()
                .get(seriesFetchEndpoint(_book.series))
                .then((response) => {
                    let _series = response.data
                    console.log('_series', _series)
                    setSeries(_series)
                })   // for private api endpoints (api instead of fetch)
                .catch(error => {
                    console.log('series fetch error', error)
                });
            } 
        })
     }


    useEffect(() => {
        getData()
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
                        <BookCapsule book={book} id={id} setBook={setBook} />
                        <div className='review-summary-block'>
                            <h1> {book?.avgRating.toFixed(2)}/5 </h1>
                            <p>from {book?.reviewCount} reviews</p>
                            <Button className='review-summary-block__write-review-btn' variant="Link" onClick={handleReviewPopupShow}> Write a review </Button>
                        </div>
                    </Col>
                </Container>
                <Container fluid  className='book-details__right-col'>
                    <Col xs={{span:3,offset:9 }} className='allow-click-self book-details__right-col__inner'>
                        <AuthorPreview author={author}/>
                    </Col>
                </Container>

                <Container fluid  className='book-details__mid-col-top'>
                    <Col xs={{span:7,offset:2 }} className='book-details__mid-col-top-header' id='book-details-mid-header'>
                        <SpinnerWrapper Component={<h1 className='primary-text'>{book?.title}</h1>} isLoading={book==null}/>
                        
                        
                        <Stack direction="horizontal" gap = {1}>
                            <span className='inline-block light-text'>by</span>
                            <BookAuthorsBlock book={book}/>
                        </Stack>

                    </Col>
                </Container>
                <Container fluid className='book-details__mid-col-bottom'>
                    <Col xs={{span:7,offset:2 }}>
     
                        <p className='medium-text'>{book?.description}</p>
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
                                (book?.series) && <Route path="/series" element={<SeriesView book={book} series={series} setSeries={setSeries}/>} />
                            }
                            <Route path="/similar_books" element={<SimilarBooksView similarBooks={similarBooks} setSimilarBooks={setSimilarBooks} />} />
                            <Route path="/review/:review_id/*" element={<BookReview bookID={id}/>}></Route>
                            <Route path="" element={<BookReviews book={book}/>} />
                            <Route path="/reviews" element={<BookReviews bookID={id}/>} />
                            
                        </Routes>                    
                    </Col>
                </Container>
            </div>
            <ReviewPopup showState={showReviewPopup} bookID={id} handleClose={handleReviewPopupClose} />
        </>

    )
}
export default BookDetails
