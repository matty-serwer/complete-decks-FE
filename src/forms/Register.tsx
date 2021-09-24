import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React, { useState, SyntheticEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Form, Col, Row, Button, Modal } from 'react-bootstrap';
// import { getEffectiveConstraintOfTypeParameter } from 'typescript';

import UserPool from "./UserPool";
import AWS from 'aws-sdk'; // must be set up for verification.
// components
import NavbarComponent from '../components/Navbar';
// styles
import './styles/forms.css';

interface IRegisterFormProps { }

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [error, setError] = useState("");

  const [clientId, setClientId] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [confError, setConfError] = useState("");
  const [showConfModal, setShowConfModal] = useState(false);

  const history = useHistory();

  var cIDProvider = new AWS.CognitoIdentityServiceProvider({
    region: 'us-east-2'
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: givenName
      }),
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: familyName
      }),
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ]

    UserPool.signUp(username, password, attributeList, null, (err, data) => {
      if (err) {
        console.error(err);
        setError(err.message);
      } else {
        console.log(data);
        setClientId(data?.user.pool.clientId);
        setError("");
        setShowConfModal(true);
      }
    })

  }

  const handleConfirm = (event: SyntheticEvent) => {
    event.preventDefault();
    var params = {
      ClientId: clientId,
      ConfirmationCode: confirmationCode,
      Username: username
    }
    cIDProvider.confirmSignUp(params, (err, data) => {
      if (err) {
        console.error(err)
        setConfError(err.message);
      } else {
        console.log(data)
        setConfError("");
        history.push('/login')
      }
    })
  }

  return (
    <div className="user-form">
      <NavbarComponent colorShift="light" />
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

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalFirstName">
            <Form.Label column sm={3}>
              First Name
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" placeholder="First Name" onChange={(e) => setGivenName(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalLastName">
            <Form.Label column sm={3}>
              Last Name
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" placeholder="Last Name" onChange={(e) => setFamilyName(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" variant="outline-primary" className="shop-button register-button" >Register</Button>
            </Col>
          </Form.Group>
          <div className="form-link-container">
            <Link to='/login' className="form-link">Already have an account? Click here to login!</Link>
          </div>
        </Form>
        {error.length > 0 ? (
          <p className="reg-error">{error}</p>
        ) : (
          null
        )}

        <Modal show={showConfModal} onHide={() => setShowConfModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Please Verify Your Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            A verification code has been sent to your email. Please enter it below to complete your registration.
            <Form onSubmit={handleConfirm}>
              <Form.Group as={Row} className="mb-4" controlId="formHorizontalConfirm">
                <Form.Label column>
                  Enter Code
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" placeholder="#######" onChange={(e) => setConfirmationCode(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col>
                  <Button variant="outline-primary" type="submit" className="shop-button">
                    Enter
                  </Button>
                </Col>
              </Form.Group>
            </Form>
            {confError.length > 0 ? (
              <p className="conf-error">{confError}</p>
            ) : (
              null
            )}
          </Modal.Body>
        </Modal>
      </Container >
    </div>
  )
}

export default RegisterForm;