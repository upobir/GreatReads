import { React, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext, {AuthProvider} from "../context/AuthContext";
import { Container, Row, Col } from 'react-bootstrap';

export const  LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  let [_userName, setUserName] = useState("UserName") 
  let [_password, setPassword] = useState("Password")

  const handleSubmit = e => {
    e.preventDefault();
    console.log('userName:', _userName)
    console.log('password:', _password)

    _userName.length > 0 && loginUser(_userName, _password);
  };

  return (
    <Container>
        <Row>
          <Col xs={{span:4, offset:4}}>
            <h1 className='primary-text'>Login:</h1>
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="userNameID">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={_userName}
                  onChange={e => setUserName(e.target.value)} />
              </Form.Group>


              <Form.Group className="mb-3" controlId="passwordID">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={_password}
                  onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit" >
                Login
              </Button>
              <Button variant="outline-primary" >
                Sign up
              </Button>
            </form>

          </Col>
        </Row>


    </Container>
  );
}



