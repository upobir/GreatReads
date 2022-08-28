import React from 'react'
import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { genreBrowseURL } from '../urls';
import { Link } from 'react-router-dom';
import { _genres } from '../PlaceHolder';
import useAxios from '../utils/useAxios';
import { genresFetchEndpoint } from '../endpoints';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
export const GenreDropDown = ({selectedGenre}) => {
    const [genres, setGenres] = useState(null)
    const [selectedGenreIndex, setSelectedGenreIndex] = useState(null)
    const api = useAxios()
    const getGenres = async () => { 
        console.log('genresFecth' ) 
        api()
        .get(genresFetchEndpoint())
        .then((response)=>{
            let _genres = response.data
            console.log('_genres', _genres)
            setGenres(_genres)
        })
    }
    const handleGenreSelect = (index) => {
        // setGenreID(e.target.value.id)
        console.log('gerne set index',  index)
        console.log('genres[index]', genres[index])
        setSelectedGenreIndex(index)
        // setGenreID(genres[index].id)
    }
    useEffect(()=> {
        getGenres()
    }, [])
    return (
        <DropdownButton
            className='browse-genre__header__dropdown'
            variant="primary"
            title={genres && selectedGenreIndex != null
                ? genres[selectedGenreIndex].name
                : selectedGenre == null
                    ? "Select"
                    : selectedGenre.tag
            }
            disabled={genres == null}
        >
            {
                genres && genres.map((genre, index) => {
                    return <Dropdown.Item
                        key={index}
                        as={Link} to={genreBrowseURL(genre.id)}
                        onClick={() => handleGenreSelect(index)}
                    >
                        {genre.name}
                    </Dropdown.Item>
                })
            }
        </DropdownButton>
    )
}
