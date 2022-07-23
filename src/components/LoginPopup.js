import { React, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { loginEndpoint } from '../endpoints';

import AuthContext, {AuthProvider} from "../context/AuthContext";
/**
 * We will not use the popup since it's redirecting upon login is easier with a normal page
 * @param {*} param0 
 * @returns 
 */
export const  LoginPopup = ({showState, handleClose}) => {
  let { loginUser } = useContext(AuthContext);
  let [_userName, setUserName] = useState("UserName") 
  let [_password, setPassword] = useState("Password")

  const postLoginRequest= (e) => {
    e.preventDefault()//prevent refresh on submit event
    console.log('e', e)
    console.log('userName', _userName)
    console.log('password', _password)
    _userName.length > 0 && loginUser(_userName, _password);
  }  
  return (
    <>
      <Modal
        show={showState}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        variant="dark"
        className='login-popup'
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <form onSubmit={postLoginRequest}>

        <Modal.Body variant="dark">

        <Form.Group className="mb-3" controlId="reviewText">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            type="text"
            placeholder={_userName}
            onChange={e => setUserName(e.target.value)}  />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="reviewText">
          <Form.Label>Password:</Form.Label>
          <Form.Control 
              type="text" 
              placeholder={_password}
              onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Modal.Footer>
        </form>

      </Modal>
    </>
  );
}



