import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';

interface IRegisterFormProps { }

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
 

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newUser = { 
      email: email,
      password: password
    }
    // POST HERE
    console.log("New User: ", newUser);
    setEmail("");
    setPassword("");
    setSecondPassword("");
  }

  return (
    <Container>
      <h2>Sign up to save your boards!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={3}>
            Email
          </Form.Label>
          <Col sm={8}>
            <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
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

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPasswordCheck">
          <Form.Label column sm={3}>
            Re-Type Password
          </Form.Label>
          <Col sm={8}>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setSecondPassword(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Register</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default RegisterForm;