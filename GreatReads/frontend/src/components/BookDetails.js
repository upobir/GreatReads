import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { bookFetchEndpoint } from '../endpoints';

const BookDetails = () => {
    let {id} = useParams();
    let navigate = useNavigate()
    let [book, setBook] = useState(null)

    const getBook = async ()=> {
        console.log('id', id)
        console.log('bookFetchEndpoint(id)', bookFetchEndpoint(id))

        let response = await fetch(bookFetchEndpoint(id))
        let book = await response.json()
        
        console.log('book', book)

        setBook(book)
    }
    
    useEffect(() => {
        getBook()
    }, [])
    

    return (
        <div>
            <h2>{book?.title}</h2>
            <p>{book?.description}</p>
            <p>ISBN: {book?.isbn}</p>
        </div>
    )
}
export default BookDetails