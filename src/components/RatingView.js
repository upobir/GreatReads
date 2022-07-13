import React from 'react'
import { Container } from 'react-bootstrap'

export const RatingView = ({rating}) => {
  return (
    <div className='inline-block'>
        {rating} / 5
    </div>
  )
}
