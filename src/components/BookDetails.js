import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { bookFetchEndpoint } from '../endpoints';
import BookCapsule from './BookCapsule';
import AuthorPreview from './AuthorPreview';
import GenreBlock from './GenreBlock';
import {Row, Col, Container} from 'react-bootstrap'
import 'holderjs'
import Pagination from 'react-bootstrap/Pagination';

const BookDetails = () => {
    let {id} = useParams();
    let navigate = useNavigate()
    let [book, setBook] = useState(null)
    let _bookDetails = {
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
        "name": "lorem",
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
                    <h1>{book? book.title: "The Way of Kings"}</h1>
                    <h6>by {book?.author}</h6>
                    <p>{book?.description}</p>
                    <p>ISBN: {book?.isbn}</p>
                    <GenreBlock genres={_bookDetails.genres}/>
                </Col>
                <Col xs={3}>
                    <AuthorPreview author={_author}/>
                </Col>
            </Row>
            <div>



x
        </div>
        </Container>

    )
}
export default BookDetails