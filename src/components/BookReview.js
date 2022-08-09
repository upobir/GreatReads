import {React, useState, useEffect} from 'react'
import { Container, Stack, Row, Col } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'
import { useParams } from "react-router-dom";
import { reviewFetchEndpoint } from '../endpoints';
import { userDetailsURL } from '../urls';
import { Link } from 'react-router-dom';
export const BookReview = ({bookID}) => {
  let {review_id} = useParams();
  
    const [review, setReview] = useState(null)
  
  const getReview= async () => { 
    let response = await fetch(reviewFetchEndpoint(review_id))
    let jreview = await response.json()
    setReview(jreview)  
  }

  useEffect(() => {
    getReview()
  }, [])
  
  return (
    <Container id="review-header" className = "book-review-details">
        <Stack gap={2}>
          <BookReviewPreview bookID={bookID} review={review} shouldTruncate={false}/>
          
          <Col xs={{span:10, offset:2}} className="book-review-details__comment-container">
              <Stack  gap={2}>
                {review?.comments.map((comment, index) =>{
                  return (
                  <Stack key={index} className="book-review-details__comment">
                    <Stack gap={1} direction="horizontal">
                      <span as={Link} to={userDetailsURL(comment.Commenter)} className="primary-text">{comment.Commenter}</span>
                      <span className="light-text">{comment.Timestamp}</span>
                    </Stack>
                    <p>{comment.Text}</p>
                  </Stack>
                  )
                })}
              </Stack>
          </Col>
        </Stack>
    </Container>
  )
  
}
