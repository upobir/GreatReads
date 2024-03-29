import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row,Stack, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { BookGallery } from './BookGallery';
import {GenreDropDown} from './GenreDropDown'; 
import { browseGenreEndpoint, genreFetchEndpoint, genreFollowToggleEndpoint } from '../endpoints';
import { _genres } from '../PlaceHolder';
import { FollowBlock } from './FollowBlock';
import useAxios from '../utils/useAxios';
import Placeholder from 'react-bootstrap/Placeholder';

export const BrowseGenre = () => {
    const {genre_id, category} = useParams();//undefined when no genreID is in URL
    const [books, setBooks] = useState(null)  
    const [genre, setGenre]  = useState(null)
    
    const api =  useAxios()
    
    const getNewBooksInGenre = async () => {
        console.log('genre fetch')
        api()
        .get(browseGenreEndpoint(genre_id))
        .then((response) => {
          let _books  = response.data
          console.log('_books', _books)
          setBooks(_books) 
        })
        .catch((error)=>{
          console.log('books fetch error', error)
        })
    }
    const getGenreDetails = ()=> {
        api()
        .get(genreFetchEndpoint(genre_id))
        .then((response)=>{
            let _genre = response.data;
            console.log('genreFetch response', response.data)
            setGenre(_genre)
        })
        .catch((err)=> {console.log('genre fetch err', err)})
    }
    useEffect(()=> {
        setGenre(null)
        getGenreDetails()
        setBooks(null)
        getNewBooksInGenre()
    }, [genre_id])
    

    console.log('genre', genre)
    return (
        <Container fluid>
            <Row>
                <Stack gap={1} className='browse-genre'>
                    <Stack direction="horizontal" gap={2} >
                        <GenreDropDown selectedGenre={genre}  />
                        {genre
                        && (<FollowBlock
                                followContext={genre}
                                followToggleURL={genreFollowToggleEndpoint(genre_id)}
                            />)
                        }
                    </Stack>
                    {genre
                    ?(<div className='browse-genre__body'>
                            <div><p>{genre.desc}</p></div>
                                <h3 className='primary-text'>New releases Tagged "{genre.tag}":</h3>
                            <BookGallery books={books} booksPerRow={4} setBooks={setBooks}></BookGallery>
                        </div>)
                    :(<Placeholder  animation="glow">
                        <Placeholder xs={12} size="lg" />
                        <Placeholder xs={4} size="lg" />
                    </Placeholder>)
                    }
                </Stack>

            </Row>
        </Container>
    )
}
