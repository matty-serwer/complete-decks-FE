import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import { Col, Card, Button, Modal } from 'react-bootstrap';
import CartContext from './../context/Context';
import { IItem } from './../context/types';

import '../styles/Item.css'
import { Item } from 'react-bootstrap/lib/Breadcrumb';

interface IItemComponentProps {
  item: IItem;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const ItemComponent: React.FC<IItemComponentProps> = (props) => {
  const { item, setDrawerOpen } = props;
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;

  const [showCatModal, setShowCatModal] = useState(false);

  const addHandler = () => {
    let catInCart = cartItems.some((_item) => _item.category === item.category);

    if (catInCart) {
      setShowCatModal(true);
    } else {
      cartContext.cartDispatch({ type: "ADD_CART_ITEM", payload: item });
      setDrawerOpen(true);
    }
  }

  const swapHandler = () => {
    const oldPart = cartItems.find((_item) => _item.category === item.category);
    if(oldPart) {
      cartContext.cartDispatch({ type: "REMOVE_CART_ITEM", payload: oldPart });
    }
    cartContext.cartDispatch({ type: "ADD_CART_ITEM", payload: item });
    setShowCatModal(false);
    setDrawerOpen(true);
  }

  return (
    <Col sm={12} md={6} lg={4} >
      <Card className="card">
        <Card.Body className="card-body">
          <Card.Title className="card-title">{item.name}</Card.Title>
          <Card.Img src={item.image_url} className="card-image" />
          <div className="card-bottom">
            <Card.Text className="price">
              ${item.price}
            </Card.Text>
            {cartItems.some((_item) => _item.productId === item.productId) ? (
              <Button className="remove-button shop-button" variant="outline-warning"
                onClick={() => {
                  cartContext.cartDispatch({ type: "REMOVE_CART_ITEM", payload: item })
                }}>
                Remove Part
              </Button>
            ) : (
              <Button className="add-button shop-button" variant="outline-primary" onClick={() => addHandler()}>Add This Part</Button>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Category Modal */}
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
    </Col >
  )
}

export default ItemComponent;
