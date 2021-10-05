import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Form, Col, Row, Button, Modal } from 'react-bootstrap';
import * as yup from "yup";
import registerScheme from '../validation/registerScheme';
import UserPool from "../context/UserPool";
import AWS from 'aws-sdk'; // must be set up for verification.
// components
import NavbarComponent from '../components/Navbar';
// styles
import './styles/forms.css';

interface IRegisterFormProps { }

const initialFormValues = {
  email: "",
  username: "",
  password: "",
  givenName: "",
  familyName: ""
};

const initialFormErrors = {
  email: "",
  username: "",
  password: "",
  givenName: "",
  familyName: ""
};

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [givenName, setGivenName] = useState("");
  // const [familyName, setFamilyName] = useState("");
  const [error, setError] = useState("");

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors)

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
        Value: formValues.givenName
      }),
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: formValues.familyName
      }),
      new CognitoUserAttribute({
        Name: 'email',
        Value: formValues.email
      })
    ]

    UserPool.signUp(formValues.username, formValues.password, attributeList, null, (err, data) => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    const correctValue = type === "checkbox" ? checked : value;

    yup
      .reach(registerScheme, name)
      .validate(correctValue)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((error) => {
        setFormErrors({ ...formErrors, [name]: error.errors[0] });
      });
    setFormValues({ ...formValues, [name]: correctValue });
  };

  const handleConfirm = (event: SyntheticEvent) => {
    event.preventDefault();
    var params = {
      ClientId: clientId,
      ConfirmationCode: confirmationCode,
      Username: formValues.username
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
        <h2 className="register-header">Sign up to save your boards!</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} />
              <div className='form-error'>{formErrors.email}</div>
            </Col>
          </Form.Group>


          <Form.Group as={Row} className="mb-3" controlId="formHorizontalUsername">
            <Form.Label column sm={3}>
              Username
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="username" placeholder="Choose a Username" onChange={handleChange} />
              <div className='form-error'>{formErrors.username}</div>
            </Col>
          </Form.Group>


          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
              <div className='form-error'>{formErrors.password}</div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalFirstName">
            <Form.Label column sm={3}>
              First Name
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="givenName" placeholder="First Name" onChange={handleChange} />
              <div className='form-error'>{formErrors.givenName}</div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalLastName">
            <Form.Label column sm={3}>
              Last Name
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="familyName" placeholder="Last Name" onChange={handleChange} />
              <div className='form-error'>{formErrors.familyName}</div>
            </Col>
          </Form.Group>
          {error.length > 0 ? (
          <p className="reg-error form-error">{error}</p>
        ) : (
          null
        )}

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" variant="outline-primary" className="shop-button register-button" >Register</Button>
            </Col>
          </Form.Group>
          <div className="form-link-container">
            <Link to='/login' className="form-link">Already have an account? Click here to login!</Link>
          </div>
        </Form>
        

        <Modal show={showConfModal} className="conf-modal" onHide={() => setShowConfModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Please Verify Your Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="cm-text">A verification code has been sent to your email. Please enter it below to complete your registration.</div>
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
                <div className="cm-button-container">
                  <Button variant="outline-primary" type="submit" className="shop-button cm-button">
                    Enter
                  </Button>
                </div>

              </Form.Group>
            </Form>
            {/* {confError.length > 0 ? (
              <p className="conf-error">{confError.message}</p>
            ) : (
              null
            )} */}
          </Modal.Body>
        </Modal>
      </Container >
    </div>
  )
}

export default RegisterForm;