import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap';
// context
import CartContext from './../context/Context';
import UIContext from '../context/UIContext';
// types
import { IItem } from './../context/types';

interface IRemoveModalProps {
  setShowRemoveModal: Dispatch<SetStateAction<boolean>>;
  showRemoveModal: boolean;
  item: IItem;
}

const RemoveModal: React.FC<IRemoveModalProps> = (props) => {
  const { setShowRemoveModal, showRemoveModal, item } = props;

  const cartContext = useContext(CartContext);
  const uiContext = useContext(UIContext);

  const removeHandler = () => {
    cartContext.cartDispatch({ type: "REMOVE_CART_ITEM", payload: item })
    if (item.category === "decks") {
      uiContext.uiDispatch({ type: "REMOVE_STRIKE_CLASS", payload: "decks"});
    } else if (item.category === "trucks") {
      uiContext.uiDispatch({ type: "REMOVE_STRIKE_CLASS", payload: "trucks"});
    } else if (item.category === "wheels") {
      uiContext.uiDispatch({ type: "REMOVE_STRIKE_CLASS", payload: "wheels"});
    }
    setShowRemoveModal(false);
    uiContext.uiDispatch({ type: "SET_HIDE_DRAWER" });
  }

  return (
    <Modal show={showRemoveModal} className="remove-modal" onHide={() => setShowRemoveModal(false)}>
      <Modal.Header>
        <Modal.Title>Remove item from cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to remove this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning shop-button" onClick={() => removeHandler()}>
          Yes, Remove item!
        </Button>
        <Button variant="outline-primary shop-button" onClick={() => setShowRemoveModal(false)}>
          Go Back
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveModal
