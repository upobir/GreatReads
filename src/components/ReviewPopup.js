import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Rating} from 'react-simple-star-rating'
import useAxios from '../utils/useAxios';
import { useContext } from 'react';
import { reviewPostEndpoint } from '../endpoints';
import { Navigate } from 'react-router-dom';
import { reviewDetailsURL } from '../urls';
export const ReviewPopup = ({bookID, showState, handleClose}) => {
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(null)
  const api = useAxios()

  const handleRatingUpdate = (ratingVal) => {
    console.log('ratingVal', ratingVal)
    console.log('ratingVal/100', ratingVal/100)
    setReviewRating(ratingVal/ 100) 
  }
  const handleReviewTextUpdate = (e) => { setReviewText(e.target.value) }
  const handleSubmit = (e) => {
    e.preventDefault();
    let actualRating = reviewRating * 5;
    console.log('reviewRating',actualRating )
    console.log('reviewText', reviewText)
    if(reviewRating != null){
      api()
      .post(reviewPostEndpoint(bookID), {
        reviewRating: actualRating,
        reviewText: reviewText,
      })
      .then((response) => {
        let rd = response.data
        console.log('review post response', rd);
        Navigate(reviewDetailsURL(rd.reviewID))
        // window.location.reload(true)
      })
      .catch((error)=> {
        console.log('review post error', error)
      });
    }
  }
  return (
    <>
      <Modal
        show={showState}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        variant="dark"
        className='review-popup'
      >
        <Modal.Header closeButton>
          <Modal.Title>Submit review</Modal.Title>
        </Modal.Header>
        <Modal.Body variant="dark">
          <Form>
            <Form.Group className="mb-3" controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Rating onClick={handleRatingUpdate}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="reviewText">
              <Form.Label>Review:</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={10}  
                placeholder="Enter Review Text"
                onChange={handleReviewTextUpdate}/>
            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



