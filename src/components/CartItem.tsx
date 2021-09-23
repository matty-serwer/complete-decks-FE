import React, { useContext } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import CartContext from '../context/Context';
import { IItem } from '../context/types';
// components
import NavbarComponent from './Navbar';
// styles
import '../styles/CartItem.css';

export interface ICartItemProps {
  item: IItem;
}

const CartItem: React.FC<ICartItemProps> = (props) => {
  const { item } = props;
  const cartContext = useContext(CartContext)

  return (
    <>
      <Card className="cart-card">
        <Row className="cart-card-row">
          <Col md={4}>
            <Card.Img src={item.image_url} className="cart-card-image" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="cart-item-title">{item.name}</Card.Title>
              <Card.Text className="cart-item-price">${item.price}</Card.Text>
              <Button variant="outline-warning" className="shop-button" onClick={() => cartContext.cartDispatch({ type: "REMOVE_CART_ITEM", payload: item })}>Remove From Cart?</Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default CartItem;