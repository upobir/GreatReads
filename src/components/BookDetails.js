import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { bookFetchEndpoint } from '../endpoints';
import BookCapsule from './BookCapsule';
import AuthorPreview from './AuthorPreview';
import GenreBlock from './GenreBlock';
import {Row, Col, Container, Tabs, Tab, Stack, TabContainer, Navbar} from 'react-bootstrap'
import 'holderjs'
import Pagination from 'react-bootstrap/Pagination';
import { BookReviews } from './BookReviews';
import { authorDetailsURL } from '../urls';
import { SeriesView } from './SeriesView';
import {SimilarBooksView} from './SimilarBooksView'
import { BookReview } from './BookReview';
import { ReviewPopup } from './ReviewPopup';
const BookDetails = () => {
    let {id} = useParams();
    let navigate = useNavigate()
    const [book, setBook] = useState(null)
    
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const handleReviewPopupShow = () => setShowReviewPopup(true);
    const handleReviewPopupClose = () => setShowReviewPopup(false);

    let _book = {
        "isbn": 1,
        "title": "The Way of Kings",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
        "pageCount": 1011,
        "released": "15th March, 2020", 
        "genres": [
            {"name": "lorem", "id":1},
            {"name": "impsum", "id":2},
            {"name": "sit", "id":3},
            {"name": "dor", "id":4},
            {"name": "amet", "id":5}
        ],
        "readStatus":"reading",
        "readPages": 10,
        "seriesEntry": 3,
        "avgRating": 4.6,
        "userRating": 4.6,
        "reviewCount": 1520,
        "reviews":[
            {
                "id": 1,
                "reviewer": "Vraig",
                "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
                "rating":4.5,
                "likes": 58,
                "commentCount": 19,
                "comments": [
                    {
                        "Commenter": "Tamahome",
                        "TimeStamp": "Oct 05, 2010 08:10PM" ,
                        "Text": "You go girl! (the audiobook is 45 hours)"
                    },
                    {
                        "Commenter": "Tamahome",
                        "TimeStamp": "Oct 05, 2010 08:10PM" ,
                        "Text": "You go girl! (the audiobook is 45 hours)"
                    },
                    {
                        "Commenter": "Tamahome",
                        "TimeStamp": "Oct 05, 2010 08:10PM" ,
                        "Text": "You go girl! (the audiobook is 45 hours)"
                    }
                ]
            },
            {
                "id": 2,
                "reviewer": "Vraig",
                "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
                "rating":4.5,
                "likes": 58,
                "commentCount": 19,
                "comments": [
                    {
                        "Commenter": "Tamahome",
                        "TimeStamp": "Oct 05, 2010 08:10PM" ,
                        "Text": "You go girl! (the audiobook is 45 hours)"
                    },
                    {
                        "Commenter": "Tamahome",
                        "TimeStamp": "Oct 05, 2010 08:10PM" ,
                        "Text": "You go girl! (the audiobook is 45 hours)"
                    },
                    {
                        "Commenter": "Tamahome",
                        "TimeStamp": "Oct 05, 2010 08:10PM" ,
                        "Text": "You go girl! (the audiobook is 45 hours)"
                    }
                ]
            },{
                "id": 3,
                "reviewer": "Vraig",
                "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
                "rating":4.5,
                "likes": 58,
                "commentCount": 19,
                "comments": [
                    {
                        "Commenter": "Tamahome",
                        "TimeStamp": "Oct 05, 2010 08:10PM" ,
                        "Text": "You go girl! (the audiobook is 45 hours)"
                    },
                    {
                        "Commenter": "Tamahome",
                        "TimeStamp": "Oct 05, 2010 08:10PM" ,
                        "Text": "You go girl! (the audiobook is 45 hours)"
                    },
                    {
                        "Commenter": "Tamahome",
                        "TimeStamp": "Oct 05, 2010 08:10PM" ,
                        "Text": "You go girl! (the audiobook is 45 hours)"
                    }
                ]
            },{
                "id": 4,
                "reviewer": "Vraig",
                "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
                "rating":4.5,
                "likes": 58,
                "commentCount": 19,
                "comments": [
                    {
                        "commenter": "Tamahome",
                        "timeStamp": "Oct 05, 2010 08:10PM" ,
                        "text": "You go girl! (the audiobook is 45 hours)"
                    },
                    {
                        "commenter": "Tamahome",
                        "timeStamp": "Oct 05, 2010 08:10PM" ,
                        "text": "You go girl! (the audiobook is 45 hours)"
                    },
                    {
                        "commenter": "Tamahome",
                        "timeStamp": "Oct 05, 2010 08:10PM" ,
                        "text": "You go girl! (the audiobook is 45 hours)"
                    }
                ]
            }
        ]
    }
    let _author = {
        "followCount": 178000,
        "isFollowedByUser": false,
        "description": "Duis fermentum velit orci, sit amet laoreet libero faucibus ac. Aliquam erat volutpat. Sed et rutrum orci, vitae mattis mi. Cras eget maximus lacus, id dictum neque. Quisque fermentum neque nunc, at iaculis mauris pellentesque eu. Aliquam erat volutpat. Fusce eu tellus ut tellus consequat condimentum. Aenean congue mollis turpis, quis volutpat metus sagittis malesuada. Etiam ornare leo egestas, placerat sem non, faucibus ex.",
        "name": "Brandon Sanderson",
        "id": 1,
    }
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
    const getBook = async ()=> {
        console.log('id', id)
        console.log('bookFetchEndpoint(id)', bookFetchEndpoint(id))

        let response = await fetch(bookFetchEndpoint(id))
        let book = await response.json()
        


        setBook(book)
    }
    
    useEffect(() => {
        getBook()
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
                        <BookCapsule book={_book}/>
                        <div className='review-summary-block'>
                            <h1> {_book.avgRating}/5 </h1>
                            <p>from {_book.reviewCount} reviews</p>
                            <button className='review-summary-block__write-review-btn' onClick={handleReviewPopupShow}> Write a review </button>
                        </div>
                    </Col>
                </Container>
                <Container fluid  className='book-details__right-col'>
                    <Col xs={{span:3,offset:9 }} className='allow-click-self'>
                        <AuthorPreview author={_author}/>
                    </Col>
                </Container>

                <Container fluid  className='book-details__mid-col-top'>
                    <Col xs={{span:7,offset:2 }} className='book-details__mid-col-top-header' id='book-details-mid-header'>
                        <h1 className='primary-text'>{_book.title}</h1>
                        <span className='inline-block light-text'>by</span>
                        <Link to={authorDetailsURL(_author.id)}
                            className='high-text no-text-effects'>
                            {` ${_author.name}`}
                        </Link>
                    </Col>
                </Container>
                <Container fluid className='book-details__mid-col-bottom'>
                    <Col xs={{span:7,offset:2 }}>
     
                        <p>{_book.description}</p>
                        <Row><Col xs={2}className="medium-text">ISBN:</Col><Col>{_book.isbn}</Col></Row>
                        <Row><Col xs={2}className="medium-text">Pages:</Col><Col>{_book.pageCount}</Col></Row>
                        <Row><Col xs={2}className="medium-text">Released:</Col><Col>{_book.released}</Col></Row>
                        {/* <p><span className="medium-text">Language:</span> {_book.isbn}</p> */}
                        <GenreBlock genres={_book.genres}/>

                        <Tabs defaultActiveKey="reviews" onSelect={handleTabChange} className="book-details__tab-bar">
                            <Tab eventKey="reviews" title="Reviews">
                            </Tab>
                            <Tab eventKey="series" title="Series">
                            </Tab>
                            <Tab eventKey="similar_books" title="Similar Books">
                            </Tab>
                        </Tabs>
                        <Routes>
                            <Route path="/" element={<BookReviews bookID={id} reviews={_book.reviews}/>} />
                            <Route path="/reviews" element={<BookReviews bookID={id} reviews={_book.reviews}/>} />
                            <Route path="/series" element={<SeriesView book={_book} series={_series}/>} />
                            <Route path="/similar_books" element={<SimilarBooksView similarBooks={_similar_books}/>} />
                            <Route path="/review/:review_id" element={<BookReview review={_book.reviews[0]}/>}></Route>
                        </Routes>                    
                    </Col>
                </Container>
            </div>
            <ReviewPopup showState={showReviewPopup} handleClose={handleReviewPopupClose} />
        </>

    )
}
export default BookDetails
