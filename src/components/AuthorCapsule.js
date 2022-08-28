import {React, useState, useRef, useContext} from 'react'
import { Stack,Button,ButtonGroup,Overlay, Tooltip,FormGroup,FormControl, Row, Col, Image, Container} from 'react-bootstrap'
import 'holderjs'
import { FaUser, FaBook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { placeholderBookImage } from '../PlaceHolder'
import { authorDetailsURL } from '../urls'

export default function AuthorCapsule({author, id}) {

  return (
    <Stack className={'author-capsule author-capsule__mini'}>
          
      <Link to={id? authorDetailsURL(id) : '#'}>
        {
        author?.picture_url
        ? <Image fluid src={author.picture_url} />
        : (<div className="author-capsule__picture">
              <Image fluid src={placeholderBookImage} />
              <div className='author-capsule__picture__placeholder'>
                <FaBook />
              </div>
            </div>)
        }

      </Link>
      <Stack className='author-capsule__author-name' direction='horizontal'>
        <div className='author-capsule__author-name-div'>
          {author.name}
        </div>
      </Stack>
    </Stack>
  )
}