import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { BookGallery } from './BookGallery';
import {GenreDropDown} from './GenreDropDown'; 
import { bookBrowseEndpoint } from '../endpoints';
export const BrowseGenre = () => {
    const {genreID} = useParams();
    const [books, setBooks] = useState([])  
    const [genre, setGenre]  = useState({
        "id": 1,
        "tag": "Fiction",
        "description": "Fiction is the telling of stories which are not real. More specifically, fiction is an imaginative form of narrative, one of the four basic rhetorical modes. Although the word fiction is derived from the Latin fingo, fingere, finxi, fictum, \"to form, create\", works of fiction need not be entirely imaginary and may include real people, places, and events. Fiction may be either written or oral. Although not all fiction is necessarily artistic, fiction is largely perceived as a form of art or entertainment. The ability to create fiction and other artistic works is considered to be a fundamental a",
        "followerCount": 182917,
        "userFollowsGenre": false,
    })
    const getNewBooksInGenre = async () => {
        //#TODO PROPER FETCH ONCE API DONE
        let response = await fetch(bookBrowseEndpoint())
        let jBooks = await response.json()
        console.log('jBooks', jBooks)
        setBooks(jBooks)
    }
    useEffect(()=> {
        getNewBooksInGenre()
    }, [])

    return (
        <Container>
            {genre && 
                <Stack gap={1}>
                    <Stack direction="horizontal" gap={1}>
                        <GenreDropDown selectedID ={genreID}/>
                        <Stack>
                            <h1>{genre.followerCount}</h1>
                            <span>Following</span>
                        </Stack>
                        <Button variant="primary"> Follow </Button>
                    </Stack>
                    <div><p>{genre.description}</p></div>
                    <h3 className='primary-text'>New releases Tagged "{genre.tag}":</h3>
                    <BookGallery books={books}></BookGallery>
                </Stack>
            }
        </Container>
    )
}
