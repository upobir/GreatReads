import React, {useEffect, useState} from 'react'
import { Container, Stack } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'
import {bookReviewsFetchUrl} from '../endpoints'
export const BookReviews = ({bookID}) => {
  const [reviews, setReviews] = useState([])
  
  const getReviews= async () => { 
    let response = await fetch(bookReviewsFetchUrl(bookID))
    let jreviews = await response.json()
    console.log('jreviews', jreviews)
    setReviews(jreviews)
  }

  useEffect(() => {
    getReviews()
  })

  return (
    <Container>
      
      <Stack gap={2}>
        {
          reviews.map( review => {
              return<BookReviewPreview key={review.id} bookID={bookID} review={review} shouldTruncate={true}/>
          })
        }
      </Stack>
    </Container>
  )
}
