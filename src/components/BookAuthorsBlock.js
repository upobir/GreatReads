import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { authorDetailsURL } from '../urls';

 
const BookAuthorsBlock = ({book}) => { 
    return book?.authors.map(
        (author, index) => {            
            return (
                <>
                    <Link to={authorDetailsURL(author.id)}
                    key={author.id}
                    className='high-text no-text-effects'>
                    {` ${author.name}`}
                    </Link>
                    {index < (book.authors.length - 1)? ",": ""}
                </>
            )
        }
    )
 }
 
 export default BookAuthorsBlock