import {React, useState, useRef, useContext} from 'react'
import { Stack,Button,ButtonGroup,Overlay, Tooltip,FormGroup,FormControl, Row, Col, Image, Container} from 'react-bootstrap'
import 'holderjs'
import { FaUser, FaBook, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { placeholderBookImage } from '../PlaceHolder'

export default function SeriesCapsule({series, id}) {

  return (
    <Stack className={'series-capsule series-capsule__mini'}>
          
        {
        series?.thumbnail
        ? <Image fluid src={series.thumbnail} />
        : (<div className="series-capsule__thumbnail">
              <Image fluid src={placeholderBookImage} />
              <div className='series-capsule__thumbnail__placeholder'>
                <FaBook />
              </div>
            </div>)
        }

      <Stack className='series-capsule__series-name' direction='horizontal'>
        <div className='series-capsule__series-name-div'>
            <h3 className='primary-text'>{`${series.name}`}</h3>
            <FaBook fontSize={17} /> <span className='primary-text'>{series.bookCount} books</span>   <FaStar fontSize={17} /> <span className='primary-text'>{series?.avgRating.toFixed(2)}</span>
        </div>
      </Stack>

    </Stack>
  )
}