import { React, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { loginEndpoint } from '../endpoints';

import AuthContext, {AuthProvider} from "../context/AuthContext";

export const  LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  let [_userName, setUserName] = useState("UserName") 
  let [_password, setPassword] = useState("Password")

  const handleSubmit = e => {
    e.preventDefault();
    // const username = e.target.username.value;
    // const password = e.target.password.value;
    console.log('userName:', _userName)
    console.log('password:', _password)
    // console.log('userName:', username)
    // console.log('password:', password)

    _userName.length > 0 && loginUser(_userName, _userName);
  };

  return (
    <>
        {/* <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header> */}
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>

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
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Modal.Footer>
        </form>

    </>
  );
}



