import {React, useState, useContext} from 'react'
import {Container, Col,Button, Row} from 'react-bootstrap'
import { LoginPopup } from './LoginPopup'
import { loginEndpoint } from '../endpoints'
import AuthContext from "../context/AuthContext";
import GreatReadsNavbar from '../components/Navbar';

import { useEffect } from "react";
import useAxios from "../utils/useAxios";

export const LandingPage = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const [res, setRes] = useState("");
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/books/");
        setRes(response.data.response);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  return (
    <>
      <GreatReadsNavbar />
      
        <Container fluid className='app-body'>
          <Row>
              {/* <Col xs="auto"><Button variant="outline-primary" onClick={logoutUser}>Log out</Button></Col>
              <Col xs="auto"><Button variant="primary">Join</Button></Col> */}
          </Row>
          {/* <LoginPopup showState={showLoginPopup} handleClose={handleLoginPopupClose} />        */}
      </Container>
    </>
  )
}
