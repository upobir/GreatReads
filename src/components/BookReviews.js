import React from 'react'
import { Container } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'

export const BookReviews = ({bookID,reviews}) => {
  return (
    reviews.map( review => {
        return <BookReviewPreview key={review.id} bookID={bookID} review={review}/>;
    })
  )
}
