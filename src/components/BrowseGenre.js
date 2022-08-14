import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { BookGallery } from './BookGallery';
import {GenreDropDown} from './GenreDropDown'; 
import { browseGenreEndpoint, genreFollowToggleEndpoint } from '../endpoints';
import { _genres } from '../PlaceHolder';
import { FollowBlock } from './FollowBlock';
import useAxios from '../utils/useAxios';

export const BrowseGenre = () => {
    const {genreID, category} = useParams();//undefined when no genreID is in URL
    const [books, setBooks] = useState([])  
    const [genre, setGenre]  = useState(null)
    const api =  useAxios()
    
    useEffect(()=>{
        if(genreID >= 0 && genreID < _genres.length){
            setGenre(_genres[genreID])
        }
    }, [genreID])
    const getNewBooksInGenre = async () => {
        api()
        .get(browseGenreEndpoint(genreID))
        .then((response) => {
          let _books  = response.data
          console.log('_books', _books)
          setBooks(_books) 
        })
        .catch((error)=>{
          console.log('books fetch error', error)
        })
    }
    useEffect(()=> {
        getNewBooksInGenre()
    }, [])
    

    console.log('category', category)
    return (
        <Container fluid>
            <Row>
                        <Stack gap={1} className='browse-genre'>
                                <div gap={0} className='browse-genre__header'>
                                    <Stack direction="horizontal" gap={1} >
                                        <GenreDropDown selectedID={genreID} />
                                        {genreID && genre && <>
                                            <FollowBlock 
                                                followContext={genre}
                                                followToggleURL={genreFollowToggleEndpoint(genreID)} 
                                                />
                                            </>
                                        }
                                    </Stack>
                                    <hr style={{marginBlockStart: "0.25em",marginBlockEnd: "0.25em"}}/>
                                </div>
                            {genreID && genre &&
                            <div className='browse-genre__body'>
                                <div><p>{genre.description}</p></div>
                                <h3 className='primary-text'>New releases Tagged "{genre.tag}":</h3>
                                <BookGallery books={books} booksPerRow={4} setBooks={setBooks}></BookGallery>
                            </div>
                            }
                        </Stack>

            </Row>
        </Container>
    )
}
