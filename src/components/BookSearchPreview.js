import React from 'react'
import { Stack, Image    } from 'react-bootstrap'
import BookAuthorsBlock from './BookAuthorsBlock'
import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { bookDetailsURL, authorDetailsURL } from '../urls';

export const BookSearchPreview = ({book}) => {
    console.log('book', book)
    console.log('book.authors', book.authors)
    return (
        <Stack direction='horizontal' gap ={1} className="book-search-preview">
            <Link to={bookDetailsURL(book.id)}>
                <Image className='book-search-preview__thumbnail'/>
            </Link>
            <Stack gap={1}>
                <Link to={bookDetailsURL(book.id)}>
                    <h3 className='primary-text'>{book.title}</h3>
                </Link>
                <BookAuthorsBlock book={book}/>
                {book.description.substring(0, 50)}
            </Stack>
        </Stack>
    )
}
