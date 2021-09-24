import React, { useState, useContext, SyntheticEvent } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from './UserPool';
// components 
import NavbarComponent from '../components/Navbar';
// context
import { AccountContext } from '../context/Account';
// styles
import './styles/forms.css';

interface ILoginFormProps { }

const LoginForm: React.FC<ILoginFormProps> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    // const user = new CognitoUser({
    //   Username: username,
    //   Pool: UserPool
    // })

    // const authDetails = new AuthenticationDetails({
    //   Username: username,
    //   Password: password
    // })

    // user.authenticateUser(authDetails, {
    //   onSuccess: (data) => {
    //     console.log("onSuccess: ", data);
    //   },
    //   onFailure: (err) => {
    //     console.error("onFailure: ", err);
    //   },
    //   newPasswordRequired: (data) => {
    //     console.log("newPasswordRequired: ", data);
    //   }
    // })

    authenticate(username, password)
      .then(data => {
        console.log("Logged in!", data);
      })
      .catch(err => {
        console.error("Failed to login", err);
      })

  }

  return (
    <div className="user-form">
      <NavbarComponent colorShift='light'/>
      <Container className="user-form">
        <h2>Log In</h2>
        <Form onSubmit={handleSubmit}>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalUsername">
            <Form.Label column sm={3}>
              Username
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" placeholder="Choose a Username" onChange={(e) => setUsername(e.target.value)} />
            </Col>
          </Form.Group>


          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" className="shop-button signup-button" variant="outline-primary">Login</Button>
            </Col>
          </Form.Group>
          <div className="form-link-container">
            <Link to='/register' className="form-link">Don&apos;t have an account? Click here to sign up!</Link>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default LoginForm;