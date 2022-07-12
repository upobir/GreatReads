import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { bookFetchEndpoint } from '../endpoints';
import BookCapsule from './BookCapsule';
import AuthorPreview from './AuthorPreview';
import GenreBlock from './GenreBlock';
import {Row, Col, Container, Tabs, Tab, TabContainer} from 'react-bootstrap'
import 'holderjs'
import Pagination from 'react-bootstrap/Pagination';
import { BookReviews } from './BookReviews';
import { authorDetailsURL } from '../urls';
const BookDetails = () => {
    let {id} = useParams();
    let navigate = useNavigate()
    let [book, setBook] = useState(null)
    let _bookDetails = {
        "isbn": 1,
        "title": "The Way of Kings",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
        "genres": [
            {"name": "lorem", "id":1},
            {"name": "impsum", "id":2},
            {"name": "sit", "id":3},
            {"name": "dor", "id":4},
            {"name": "amet", "id":5}
        ],
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
        <Container fluid>
            <Row>
                <Col xs={2}>
                    <BookCapsule />
                    <Container>
                        <h1> {_bookDetails.avgRating}/5 </h1>
                        <p>from {_bookDetails.reviewCount} reviews</p>
                        <p> Write a review </p>                  
                    </Container>
                </Col>
                <Col>
                    <h1>{_bookDetails.title}</h1>
                    <h6>by <Link to={authorDetailsURL(_author.id)}> </Link> {_author.name}</h6>
                    <p>{_bookDetails.description}</p>
                    <p>ISBN: {_bookDetails.isbn}</p>
                    <GenreBlock genres={_bookDetails.genres}/>
                    <Tabs defaultActiveKey="reviews" onSelect={handleTabChange} id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="reviews" title="Reviews">
                        </Tab>
                        <Tab eventKey="series" title="Series">
                        </Tab>
                        <Tab eventKey="similar_books" title="Similar Books">
                        </Tab>
                    </Tabs>
                    <Routes>
                        <Route path="reviews" element={<BookReviews bookID={id} reviews={_bookDetails.reviews}/>} />
                        <Route path="series" element={"asdasdasdas"} />
                        <Route path="similar_books" element={"zzzz"} />
                    </Routes>                    
                                            
                </Col>
                <Col xs={3}>
                    <AuthorPreview author={_author}/>
                </Col>
            </Row>
            <div>
        </div>
        </Container>

    )
}
export default BookDetails