import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap';
// context
import CartContext from './../context/Context';
import UIContext from '../context/UIContext';
// types
import { IItem } from './../context/types';

interface IRemoveModalProps {
  setShowCatModal: Dispatch<SetStateAction<boolean>>;
  showCatModal: boolean;
  item: IItem;
}

const CategoryModal: React.FC<IRemoveModalProps> = (props) => {
  const { setShowCatModal, showCatModal, item } = props;

  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;
  const uiContext = useContext(UIContext);

  const swapHandler = () => {
    const oldPart = cartItems.find((_item) => _item.category === item.category);
    if (oldPart) {
      cartContext.cartDispatch({ type: "REMOVE_CART_ITEM", payload: oldPart });
    }
    cartContext.cartDispatch({ type: "ADD_CART_ITEM", payload: item });
    setShowCatModal(false);
    uiContext.uiDispatch({ type: "SET_SHOW_DRAWER" });
  }

  return (
    <Modal show={showCatModal} className="cat-modal" onHide={() => setShowCatModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Uh Oh!</Modal.Title>
      </Modal.Header>
      {item.category === "decks" ? (
        <Modal.Body>It looks like you&apos;ve already selected a deck.</Modal.Body>
      ) : (
        <Modal.Body>It looks like you&apos;ve already selected {item.category}.</Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="outline-warning shop-button" onClick={() => swapHandler()}>
          Swap It Out!
        </Button>
        <Button variant="outline-primary shop-button" onClick={() => setShowCatModal(false)}>
          Go Back
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CategoryModal;
