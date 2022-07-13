import React from 'react'
import { Container, Stack } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'

export const BookReviews = ({bookID,reviews}) => {
  return (
    <Container>
      
      <Stack gap={2}>
        {
          reviews.map( review => {
              return<BookReviewPreview key={review.id} bookID={bookID} review={review}/>
          })
        }
      </Stack>
    </Container>
  )
}
