import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
  const [_username, setUserName] = useState("Username");
  const [_password, setPassword] = useState("Password");
  const [_password2, setPassword2] = useState("Confirm Password");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('userName:', _username)
    console.log('password:', _password)
    console.log('confirm password:', _password2)
    
    registerUser(_username, _password, _password2);
  };

  return (
    // <section>
    //   <form onSubmit={handleSubmit}>
    //     <h1>Register</h1>
    //     <hr />
    //     <div>
    //       <label htmlFor="username">Username</label>
    //       <input
    //         type="text"
    //         id="username"
    //         onChange={e => setUsername(e.target.value)}
    //         placeholder="Username"
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         id="password"
    //         onChange={e => setPassword(e.target.value)}
    //         placeholder="Password"
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="confirm-password">Confirm Password</label>
    //       <input
    //         type="password"
    //         id="confirm-password"
    //         onChange={e => setPassword2(e.target.value)}
    //         placeholder="Confirm Password"
    //         required
    //       />
    //       <p>{password2 !== password ? "Passwords do not match" : ""}</p>
    //     </div>
    //     <button>Register</button>
    //   </form>
    // </section>

    <Container>
    <Row>
      <Col xs={{span:4, offset:4}}>
        <h1 className='primary-text'>Sign up:</h1>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="userNameID">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder={_username}
              onChange={e => setUserName(e.target.value)} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="passwordID">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder={_password}
              onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPasswordID">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder={_password2}
              onChange={e => setPassword2(e.target.value)} />
          </Form.Group>

          <Button variant="outline-primary" >
            Sign up
          </Button>
        </form>

      </Col>
    </Row>


    </Container>
  );
}

export default Register;