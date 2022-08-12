import React, {useEffect, useState} from 'react'
import { Container, Stack } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'
import {bookReviewsFetchEndpoint} from '../endpoints'
import { useParams } from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
import useAxios from '../utils/useAxios';
/**
 * List of all reviews a book has
 * @returns 
 */
export function BookReviews ()  {
  const {id} = useParams();
  const [reviews, setReviews] = useState(null)
  const api =  useAxios()
  
  const getReviews= async () => { 
    api()
    .get(bookReviewsFetchEndpoint(id))
    .then((response) => {
      let _reviews  = response.data
      setReviews(_reviews)  
    })
    .catch((error)=>{
      console.log('reviews fetch error', error)
    })
  }

  useEffect(() => {
    getReviews()
  }, [])
  if(reviews == null){
    return <Spinner animation="border" variant="primary" />
  }
  if(reviews.length <= 0)
    return "no reviews"

  return (
    <Container>
      
      <Stack gap={2}>
        {
          reviews?.map( (review, index) => {
              return<BookReviewPreview key={index} 
                bookID={id}
                review={review}
                shouldTruncate={true}
                />
          })
        }
      </Stack>
    </Container>
  )
}
