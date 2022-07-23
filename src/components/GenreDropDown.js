import React from 'react'
import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { genreBrowseURL } from '../urls';
import { Link } from 'react-router-dom';

export const GenreDropDown = ({selectedID}) => {
    const [genres, setGenres] = useState([
        {id: 1, tag: "Fiction"}, 
        {id: 2, tag: "Sci-fi"}, 
        {id: 3, tag: "Documentary"} 
    ])

    const getSelectedGenre= () => { 
        for(let i = 0 ; i < genres.length;i++){
            if(genres[i].id == selectedID)
                return genres[i]
        }
        return null;
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {getSelectedGenre()?.tag}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {genres.map((genre)=> {
                    return <Dropdown.Item  as={Link} to={genreBrowseURL(genre.id)} key={genre.id}>
                                {genre.tag}
                            </Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}
