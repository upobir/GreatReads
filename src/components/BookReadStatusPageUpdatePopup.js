import {React, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const BookReadStatusPageUpdatePopup = ({book, showState, handleClose}) => {
    const [readPages,setReadPages] = useState(book.readPages)
    const updateReadPages = (currentlyReadPages) => {//#read from event
        // #TODO setpages post request  
        setReadPages(currentlyReadPages)
    }
    return (
        <>
            <Modal show={showState} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>ReadPages</Modal.Title>
                        </Modal.Header>
                <Modal.Body>
                    <h3>Pages read:</h3>
                    <h4>{readPages}</h4>
                    <span className="light-text">of</span>
                    <h4>{book.pageCount}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"><Update></Update></Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}

