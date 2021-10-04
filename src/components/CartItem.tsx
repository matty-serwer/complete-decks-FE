import React, { useContext, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import CartContext from '../context/Context';
import { IItem } from '../context/types';
// components
import NavbarComponent from './Navbar';
import RemoveModal from '../modals/RemoveModal';
// styles
import '../styles/CartItem.css';

export interface ICartItemProps {
  item: IItem;
}

const CartItem: React.FC<ICartItemProps> = (props) => {
  const { item } = props;
  const cartContext = useContext(CartContext)

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  return (
    <>
      <Row className="cart-item">
        <Col xs={3} className="ci-image-container">
          <img src={item.image_url} alt={item.name} className="cart-item-image" />
        </Col>
        <Col xs={6} className="ci-info-container">
          <h3 className="cart-item-name">{item.name}</h3>
          <h3 className="cart-item-price">{item.price}</h3>
        </Col>
        <Col xs={3} className="ci-button-container">
          <Button variant="outline-warning" className="shop-button cart-item-button" onClick={() => setShowRemoveModal(true)}><span className="ci-button-text"></span></Button>
        </Col>
      </Row>
      <RemoveModal setShowRemoveModal={setShowRemoveModal} showRemoveModal={showRemoveModal} item={item} />
    </>
  )
}

export default CartItem;