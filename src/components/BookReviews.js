import React, {useEffect, useState} from 'react'
import { Container, Stack } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'
import {bookReviewsFetchUrl} from '../endpoints'
import { useParams } from 'react-router-dom'
export const BookReviews = () => {
  const {id} = useParams();

  const [reviews, setReviews] = useState([])
  const getReviews= async () => { 
    let response = await fetch(bookReviewsFetchUrl(id))
    let jreviews = await response.json()
    console.log('jreviews', jreviews)
    setReviews(jreviews)
  }

  useEffect(() => {
    getReviews()
  }, [])

  if(reviews.length <= 0)
    return "..."

  return (
    <Container>
      
      <Stack gap={2}>
        {
          reviews.map( review => {
              return<BookReviewPreview key={review.id} bookID={id} review={review} shouldTruncate={true}/>
          })
        }
      </Stack>
    </Container>
  )
}
