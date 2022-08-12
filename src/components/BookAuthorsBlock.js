import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { authorDetailsURL } from '../urls';

 
const BookAuthorsBlock = ({book}) => { 
    return book?.authors.map(
        (author, index) => {            
            return (
                <span key={author.id}>
                    <Link to={authorDetailsURL(author.id)}
                    
                    
                    className='high-text no-text-effects'>
                    <span  className='author-block-text'>{` ${author.name}`}</span>
                    </Link>
                    {index < (book.authors.length - 1)? ",": ""}
                </span>
            )
        }
    )
 }
 
 export default BookAuthorsBlock