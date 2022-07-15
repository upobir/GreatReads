import {React, useState} from 'react'
import {Container, Col,Button, Row} from 'react-bootstrap'
import { LoginPopup } from './LoginPopup'
import { loginEndpoint } from '../endpoints'

export const LandingPage = () => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const handleLoginPopupShow = () => setShowLoginPopup(true);
    const handleLoginPopupClose = () => setShowLoginPopup(false); 
  return (
    
    <Container>
        <Row>
            <Col xs="auto"><Button variant="outline-primary" onClick={handleLoginPopupShow}>Sign in</Button></Col>
            <Col xs="auto"><Button variant="primary">Join</Button></Col>
        </Row>
        <LoginPopup showState={showLoginPopup} handleClose={handleLoginPopupClose} />       
    </Container>
  )
}
