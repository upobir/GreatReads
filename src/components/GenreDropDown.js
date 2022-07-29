import React from 'react'
import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { genreBrowseURL } from '../urls';
import { Link } from 'react-router-dom';
import { _genres } from '../PlaceHolder';
export const GenreDropDown = ({selectedID}) => {
    const getSelectedGenre= () => { 
        for(let i = 0 ; i < _genres.length;i++){
            if(_genres[i].id == selectedID)
                return _genres[i].tag
        }
        return "Select";
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {getSelectedGenre()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {_genres.map((genre)=> {
                    return <Dropdown.Item  as={Link} to={genreBrowseURL(genre.id)} key={genre.id}>
                                {genre.tag}
                            </Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}
