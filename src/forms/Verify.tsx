import React, { useState, useContext, SyntheticEvent, useEffect } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from './UserPool';

import { AccountContext } from '../context/Account';

interface IVerificationFormProps { }

const VerificationForm: React.FC<IVerificationFormProps> = (props) => {
  const [veriCode, setVeriCode] = useState("");
  const [clientId, setClientId] = useState("");
  const [username, setUsername] = useState("");

 
  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session: any) => {
      setClientId(session.accessToken.payload.client_id);
      setUsername(session.accessToken.payload.username);
      console.log(clientId, username);
    })
  }, []);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    // authenticate(username, password)
    //   .then(data => {
    //     console.log("Logged in!", data);
    //   })
    //   .catch(err => {
    //     console.error("Failed to login", err);
    //   })

  }

  return (
    <Container>
      <h2>Enter Confirmation Code</h2>
      <Form onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalUsername">
          <Form.Label column sm={3}>
            Confirmation Code
          </Form.Label>
          <Col sm={8}>
            <Form.Control type="text" placeholder="####" onChange={(e) => setVeriCode(e.target.value)}/>
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

export default VerificationForm;