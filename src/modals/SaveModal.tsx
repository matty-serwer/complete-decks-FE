import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// context
import CartContext from './../context/Context';

interface ISaveModalProps {
  setShowSaveModal: Dispatch<SetStateAction<boolean>>;
  showSaveModal: boolean;
}

const SaveModal: React.FC<ISaveModalProps> = (props) => {
  const { setShowSaveModal, showSaveModal } = props;

  const [boardName, setBoardName] = useState("");

  const BACKEND_URL = 'https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev2'
  const { push } = useHistory();

  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;

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
          push('/boardlist');
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

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
              <Form.Control type="text" placeholder="Enter a name for this board" onChange={(e) => setBoardName(e.target.value)} />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="save-footer">
        <Button className="shop-button" variant="outline-primary" onClick={handleSaveBoard}>Save</Button>
        <Button className="add-button shop-button" variant="outline-primary" onClick={() => setShowSaveModal(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SaveModal;
