import {React, useEffect} from 'react'
import { Container, Stack, Row, Col } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'

export const BookReview = ({bookID,review}) => {
  useEffect(() => {
    console.log('review.comments', review.comments)
  }, [])
  return (
    <Container>
      <Row>
        <BookReviewPreview key={review.id} bookID={bookID} review={review}/>
      </Row>
      <Row>
        
        <Col xs={{span:10, offset:2}}>
          <Stack gap={2}>
            {review.comments.map(comment =>{
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
              <Stack gap={2}>
          {review.comments.map(comment =>{
            <Stack>
              <Stack gap={1} direction="horizontal">
                <span className="high-text">{comment.commenter}</span>
                <span className="light-text">{comment.timestamp}</span>
              </Stack>
              <p>{comment.text}</p>
              <p>xxxxxx</p>
            </Stack>
          })}
        </Stack>
    </Container>
  )
}
