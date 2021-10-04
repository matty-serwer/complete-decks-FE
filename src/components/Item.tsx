import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import { Col, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CartContext from './../context/Context';
import UIContext from '../context/UIContext';
import { IItem } from './../context/types';
// components
import RemoveModal from '../modals/RemoveModal';
import DescriptionModal from '../modals/DescriptionModal';
import CategoryModal from '../modals/CategoryModal';

import '../styles/Item.css'

interface IItemComponentProps {
  item: IItem;
}

const ItemComponent: React.FC<IItemComponentProps> = (props) => {
  const { item } = props;

  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;

  const uiContext = useContext(UIContext);

  const [showCatModal, setShowCatModal] = useState(false);
  const [showDescModal, setShowDescModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

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
    <Col sm={12} md={6} lg={4} >
      <Card className="card">
        <Card.Body className="card-body">
          <Card.Title className="card-title">{item.name}</Card.Title>
          <OverlayTrigger placement="right" overlay={
            <Tooltip id={`tooltip-info`}>
              Click for info.
            </Tooltip>
          }>
            <Card.Img src={item.image_url} alt={item.name} className="card-image" onClick={() => setShowDescModal(true)} />
          </OverlayTrigger>
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

      <CategoryModal setShowCatModal={setShowCatModal} showCatModal={showCatModal} item={item} />

      <DescriptionModal setShowDescModal={setShowDescModal} showDescModal={showDescModal} setShowCatModal={setShowCatModal} item={item} />

      <RemoveModal setShowRemoveModal={setShowRemoveModal} showRemoveModal={showRemoveModal} item={item} />
    </Col >
  )
}

export default ItemComponent;
