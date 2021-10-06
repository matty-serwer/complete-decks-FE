import React, { Dispatch, SetStateAction, useContext, useState, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import * as yup from "yup";
import saveBoardScheme from '../validation/saveBoardScheme';
// context
import CartContext from './../context/Context';
import UIContext from './../context/UIContext';

interface ISaveModalProps {
  setShowSaveModal: Dispatch<SetStateAction<boolean>>;
  showSaveModal: boolean;
}

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
};

const SaveModal: React.FC<ISaveModalProps> = (props) => {
  const { setShowSaveModal, showSaveModal } = props;

  const [boardName, setBoardName] = useState("");
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const BACKEND_URL = 'https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev2'
  const { push } = useHistory();

  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;

  const uiContext = useContext(UIContext);

  const handleSaveBoard = () => {
    let deckId = "";
    let trucksId = "";
    let wheelsId = "";
    let boardId = uuidv4();
    const userId = localStorage.getItem('sub');
    cartItems.forEach((_item) => {
      if (_item.category === "decks") {
        deckId = _item.productId.toString();
      } else if (_item.category === "trucks") {
        trucksId = _item.productId.toString();
      } else if (_item.category === "wheels") {
        wheelsId = _item.productId.toString();
      }
    })

    if (localStorage.getItem('idToken')) {
      let idToken = localStorage.getItem('idToken');
      axios
        .post(`${BACKEND_URL}/board`, {
          "boardId": boardId,
          "name": boardName,
          "userId": userId,
          "deckId": deckId,
          "trucksId": trucksId,
          "wheelsId": wheelsId
        }, {
          headers: {
            "Authorization": idToken,
          }
        })
        .then((response: any) => {
          // console.log(response);
          cartContext.cartDispatch({ type: "CLEAR_CART" });
          uiContext.uiDispatch({ type: "REMOVE_STRIKE_CLASS", payload: "decks" });
          uiContext.uiDispatch({ type: "REMOVE_STRIKE_CLASS", payload: "trucks" });
          uiContext.uiDispatch({ type: "REMOVE_STRIKE_CLASS", payload: "wheels" });
          push('/boardlist');
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const correctValue = type === "checkbox" ? checked : value;

    yup
      .reach(saveBoardScheme, name)
      .validate(correctValue)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });

    setBoardName(e.target.value);
  };

  return (
    <Modal show={showSaveModal} className="save-modal" onHide={() => setShowSaveModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="save-title">Save Board</Modal.Title>
      </Modal.Header>
      <Modal.Body className="save-body">
        <p>Give your board a name, in order to save it to your account.</p>
        <Form>
          <Form.Group as={Row} controlId="formSearchBar" className="form-group-search">
            <Form.Label column sm="2" className="search-form-label">
              Name 
            </Form.Label>
            <Col xs="12" sm="10">
              <Form.Control type="text" placeholder="Enter a name for this board" name="name" onChange={handleChange} />
            </Col>
          </Form.Group>
        </Form>
        <div className="form-errors">{formErrors.name}</div>
      </Modal.Body>
      <Modal.Footer className="save-footer">
        <Button className="shop-button" variant="outline-primary" onClick={handleSaveBoard}>Save</Button>
        <Button className="add-button shop-button" variant="outline-primary" onClick={() => setShowSaveModal(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SaveModal;
