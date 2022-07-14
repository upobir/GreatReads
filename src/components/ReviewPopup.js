import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Rating} from 'react-simple-star-rating'
export const ReviewPopup = ({showState, handleClose}) => {
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
        <Rating/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="reviewText">
          <Form.Label>Review:</Form.Label>
          <Form.Control type="text" placeholder="Enter Review Text" />
        </Form.Group>

        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



