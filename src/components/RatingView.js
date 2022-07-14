import React from 'react'
import { Container } from 'react-bootstrap'
import {FaStar, FaStarHalf} from 'react-icons/fa'
export const RatingView = ({rating}) => {
  return (
    <div className='inline-block'>
        {rating} / 5
    </div>
  )
}
