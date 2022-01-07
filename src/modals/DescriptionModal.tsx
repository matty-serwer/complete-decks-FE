import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Modal, Button, Card, Row } from 'react-bootstrap';
// context
import CartContext from './../context/Context';
import UIContext from '../context/UIContext';
// types
import { IItem } from './../context/types';

interface IRemoveModalProps {
  setShowDescModal: Dispatch<SetStateAction<boolean>>;
  showDescModal: boolean;
  setShowCatModal: Dispatch<SetStateAction<boolean>>;
  item: IItem;
}

const DescriptionModal: React.FC<IRemoveModalProps> = (props) => {
  const { setShowDescModal, showDescModal, setShowCatModal, item } = props;

  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;
  const uiContext = useContext(UIContext);

  const addHandler = () => {
    let catInCart = cartItems.some((_item) => _item.category === item.category);

    if (catInCart) {
      setShowCatModal(true);
    } else {
      cartContext.cartDispatch({ type: "ADD_CART_ITEM", payload: item });
      uiContext.uiDispatch({ type: "SET_SHOW_DRAWER" });
    }
  }

  return (
    <Modal show={showDescModal} className="desc-modal" onHide={() => setShowDescModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="dm-name">{item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dm-body">
        <div className="dm-image-container">
          <Card.Img src={item.image_url} className="dm-image" />
        </div>
        <div className="dm-description-container">
          <Row className="dm-description">{item.description}</Row>
        </div>
      </Modal.Body>
      <Modal.Footer className="dm-footer">
        <div className="dm-price-container">
          <div className="dm-price">${item.price}</div>
        </div>
        <div className="dm-button-container">
          <Button className="shop-button" variant="outline-primary" onClick={() => setShowDescModal(false)}>Close</Button>
          {cartItems.some((_item) => _item.id === item.id) ? (
            <Button className="remove-button shop-button" variant="outline-warning"
              onClick={() => {
                cartContext.cartDispatch({ type: "REMOVE_CART_ITEM", payload: item })
                setShowDescModal(false);
              }}>
              Remove Part
            </Button>
          ) : (
            <Button className="add-button shop-button" variant="outline-primary" onClick={() => {
              addHandler();
              setShowDescModal(false);
            }}>Add This Part</Button>
          )}
        </div>


      </Modal.Footer>
    </Modal>
  )
}

export default DescriptionModal;
