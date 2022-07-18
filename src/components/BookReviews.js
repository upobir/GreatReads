import React, {useEffect, useState} from 'react'
import { Container, Stack } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'
import {bookReviewsFetchEndpoint} from '../endpoints'
import { useParams } from 'react-router-dom'
export const BookReviews = () => {
  const {id} = useParams();

  const [reviews, setReviews] = useState(null)
  const getReviews= async () => { 
    let response = await fetch(bookReviewsFetchEndpoint(id))
    let jreviews = await response.json()
    console.log('jreviews', jreviews)
    setReviews(jreviews)
  }

  useEffect(() => {
    getReviews()
  }, [])
  if(reviews == null){
    return "loading..."
  }
  if(reviews.length <= 0)
    return "no reviews"

  return (
    <Container>
      
      <Stack gap={2}>
        {
          reviews?.map( (review, index) => {
              return<BookReviewPreview key={index} bookID={id} review={review} shouldTruncate={true}/>
          })
        }
      </Stack>
    </Container>
  )
}
