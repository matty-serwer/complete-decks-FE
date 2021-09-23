import React, { useState, useContext, SyntheticEvent } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from './UserPool';

import { AccountContext } from '../context/Account';

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
    <Container>
      <h2>Log In</h2>
      <Form onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalUsername">
          <Form.Label column sm={3}>
            Username
          </Form.Label>
          <Col sm={8}>
            <Form.Control type="text" placeholder="Choose a Username" onChange={(e) => setUsername(e.target.value)}/>
          </Col>
        </Form.Group>


        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={3}>
            Password
          </Form.Label>
          <Col sm={8}>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Login</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default LoginForm;