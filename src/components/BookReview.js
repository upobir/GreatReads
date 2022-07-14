import React from 'react'
import { Container, Stack, Row, Col } from 'react-bootstrap'
import { BookReviewPreview } from '../BookReviewPreview'

export const BookReview = ({bookID,review}) => {
  return (
    <Container>
      <Row>
        <BookReviewPreview key={review.id} bookID={bookID} review={review}/>
      </Row>
      <Row>
        <Stack gap={2}>
          {review.comments.map(comment =>{
            <Stack>
              <Stack gap={1} direction="horizontal">
                <span className="high-text">{comment.commenter}</span>
                <span className="light-text">{comment.timestamp}</span>
              </Stack>
              <p>{comment.text}</p>
            </Stack>
          })}
        </Stack>
      </Row>
    </Container>
  )
}
