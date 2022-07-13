import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { bookFetchEndpoint } from '../endpoints';
import BookCapsule from './BookCapsule';
import AuthorPreview from './AuthorPreview';
import GenreBlock from './GenreBlock';
import {Row, Col, Container, Tabs, Tab, TabContainer, Navbar} from 'react-bootstrap'
import 'holderjs'
import Pagination from 'react-bootstrap/Pagination';
import { BookReviews } from './BookReviews';
import { authorDetailsURL } from '../urls';
import { SeriesView } from './SeriesView';
const BookDetails = () => {
    let {id} = useParams();
    let navigate = useNavigate()
    let [book, setBook] = useState(null)
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
                    <Col xs={2}>
                        <BookCapsule />
                        <Container>
                            <h1> {_book.avgRating}/5 </h1>
                            <p>from {_book.reviewCount} reviews</p>
                            <p> Write a review </p>                  
                        </Container>
                    </Col>
                </Container>
               

                <Container fluid  className='book-details__right-col'>
                    <Col xs={{span:3,offset:9 }}>
                        <AuthorPreview author={_author}/>
                    </Col>
                </Container>
                <Container fluid className='book-details__mid-col'>
                    {/* <h1 className='primary-text'>{_book.title}</h1>
                    <span className='inline-block light-text'>by</span>
                    <Link to={authorDetailsURL(_author.id)} 
                        className='high-text no-text-effects'>
                            {` ${_author.name}`}
                    </Link> */}

                    <Col xs={{span:7,offset:2 }}>
                        <h1 className='primary-text'>{_book.title}</h1>
                        <span className='inline-block light-text'>by</span>
                        <Link to={authorDetailsURL(_author.id)}
                            className='high-text no-text-effects'>
                            {` ${_author.name}`}
                        <Navbar sticky="top">
                            <Container fluid>
                                <Col xs={3}>
                                    adsdasd
                                </Col>
                                <Col xs={3}>
                                    adsddccxzczc
                                </Col>
                                <Col xs={3}>
                                    zcxc
                                </Col>
                            </Container>    
                        </Navbar> 
                        </Link>
                        <p>{_book.description}</p>
                        <div><span className="medium-text">ISBN:</span> {_book.isbn}</div>
                        <div><span className="medium-text">Pages:</span> {_book.pageCount}</div>
                        <div><span className="medium-text">Released:</span> {_book.released}</div>
                        {/* <p><span className="medium-text">Language:</span> {_book.isbn}</p> */}
                        <GenreBlock genres={_book.genres}/>
                        <Navbar sticky="top">
                            <Container fluid>
                                <Col xs={3}>
                                    adsdasd
                                </Col>
                                <Col xs={3}>
                                    adsddccxzczc
                                </Col>
                                <Col xs={3}>
                                    zcxc
                                </Col>
                            </Container>    
                        </Navbar> 
                        <Tabs defaultActiveKey="reviews" onSelect={handleTabChange} id="book-details-tab-bar" >
                            <Tab eventKey="reviews" title="Reviews">
                            </Tab>
                            <Tab eventKey="series" title="Series">
                            </Tab>
                            <Tab eventKey="similar_books" title="Similar Books">
                            </Tab>
                        </Tabs>
                        <Routes>
                            <Route path="reviews" element={<BookReviews bookID={id} reviews={_book.reviews}/>} />
                            <Route path="series" element={<SeriesView book={_book} series={_series}/>} />
                            <Route path="similar_books" element={"zzzz"} />
                        </Routes>                    
                    </Col>
                </Container>
            </div>
        </>

    )
}
export default BookDetails