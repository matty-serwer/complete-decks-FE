import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import { Col, Row, Card, Button, Modal } from 'react-bootstrap';
import CartContext from './../context/Context';
import { IItem } from './../context/types';

import '../styles/Item.css'
import { Item } from 'react-bootstrap/lib/Breadcrumb';

interface IItemComponentProps {
  item: IItem;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setDeckStrikeClass: Dispatch<SetStateAction<string>>;
  setTrucksStrikeClass: Dispatch<SetStateAction<string>>;
  setWheelsStrikeClass: Dispatch<SetStateAction<string>>;
}

const ItemComponent: React.FC<IItemComponentProps> = (props) => {
  const { item, setDrawerOpen, setDeckStrikeClass, setTrucksStrikeClass, setWheelsStrikeClass } = props;
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;

  const [showCatModal, setShowCatModal] = useState(false);
  const [showDescModal, setShowDescModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const addHandler = () => {
    let catInCart = cartItems.some((_item) => _item.category === item.category);

    if (catInCart) {
      setShowCatModal(true);
    } else {
      cartContext.cartDispatch({ type: "ADD_CART_ITEM", payload: item });
      setDrawerOpen(true);
    }
  }

  const removeHandler = () => {
    cartContext.cartDispatch({ type: "REMOVE_CART_ITEM", payload: item })
    if (item.category === "decks") {
      setDeckStrikeClass("")
    } else if (item.category === "trucks") {
      setTrucksStrikeClass("")
    } else if (item.category === "wheels") {
      setWheelsStrikeClass("")
    }
    setShowRemoveModal(false);
  }

  const swapHandler = () => {
    const oldPart = cartItems.find((_item) => _item.category === item.category);
    if (oldPart) {
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
          <Card.Img src={item.image_url} className="card-image" onClick={() => setShowDescModal(true)} />
          <div className="card-bottom">
            <Card.Text className="price">
              ${item.price}
            </Card.Text>
            {cartItems.some((_item) => _item.productId === item.productId) ? (
              <Button className="remove-button shop-button" variant="outline-warning"
                onClick={() => setShowRemoveModal(true)}>
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

      {/* Description Modal */}
      <Modal show={showDescModal} className="desc-modal" onHide={() => setShowDescModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="dm-name">{item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Img src={item.image_url} className="dm-image" />
          <Row className="dm-description">{item.description}</Row>
        </Modal.Body>
        <Modal.Footer className="dm-footer">
          <Button className="shop-button" variant="outline-primary" onClick={() => setShowDescModal(false)}>Close</Button>
          {cartItems.some((_item) => _item.productId === item.productId) ? (
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
          <div className="dm-price">${item.price}</div>

        </Modal.Footer>
      </Modal>

      {/* Remove Modal */}
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
    </Col >
  )
}

export default ItemComponent;
