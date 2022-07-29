import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { BookGallery } from './BookGallery';
import {GenreDropDown} from './GenreDropDown'; 
import { bookBrowseEndpoint } from '../endpoints';
import { _genres } from '../PlaceHolder';
import { FollowBlock } from './FollowBlock';
export const BrowseGenre = () => {
    const {genreID, category} = useParams();//undefined when no genreID is in URL
    const [books, setBooks] = useState([])  
    const [genre, setGenre]  = useState(null)

    useEffect(()=>{
        if(genreID >= 0 && genreID < _genres.length){
            setGenre(_genres[genreID])
        }
    }, [genreID])
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
    

    console.log('category', category)
    return (
        <Container fluid>
            <Row>
                        <Stack gap={1}>
                                <Stack direction="horizontal" gap={1}>
                                    <GenreDropDown selectedID={genreID} />
                                    {genreID && genre && <>
                                        <FollowBlock followContext={genre} />
                                        {/* <Button variant="primary"> Follow </Button> */}
                                        </>
                                    }
                                </Stack>
                            {genreID && genre &&
                            <>
                                <div><p>{genre.description}</p></div>
                                <h3 className='primary-text'>New releases Tagged "{genre.tag}":</h3>
                                <BookGallery books={books} booksPerRow={4}></BookGallery>
                            </>
                            }
                        </Stack>

            </Row>
        </Container>
    )
}
