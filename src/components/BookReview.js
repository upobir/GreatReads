import {React, useState, useEffect} from 'react'
import { Container, Stack, Row, Col } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'
import { useParams } from "react-router-dom";
import { reviewFetchUrl } from '../endpoints';

export const BookReview = ({bookID}) => {
  let {review_id} = useParams();
  
    const [review, setReview] = useState(null)
  
  const getReview= async () => { 
    let response = await fetch(reviewFetchUrl(review_id))
    let jreview = await response.json()
    setReview(jreview)  
  }

  useEffect(() => {
    getReview()
  }, [])
  
  return (
    <Container id="review-header" className = "review-details">
      <Row>
        <BookReviewPreview bookID={bookID} review={review} shouldTruncate={false}/>
      </Row>
      <Row>
        
        <Col xs={{span:10, offset:2}}>
          <Stack gap={2}>
            {review?.comments.map(comment =>{
              return (
              <Stack>
                <Stack gap={1} direction="horizontal">
                  <span className="high-text">{comment.Commenter}</span>
                  <span className="light-text">{comment.TimeStamp}</span>
                </Stack>
                <p>{comment.Text}</p>
              </Stack>
              )
            })}
          </Stack>
        </Col> 
      </Row>
    </Container>
  )
  
}
