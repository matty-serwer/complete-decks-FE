import React, { useContext } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import CartContext from '../../context/Context';
import { IItem } from '../../context/types';
// styles
import '../../styles/CartDrawerItem.css'

export interface ICartDrawerItemProps {
  item: IItem;
}

const CartDrawerItem: React.FC<ICartDrawerItemProps> = (props) => {
  const { item } = props;
  const cartContext = useContext(CartContext)

  return (
    <>
      <Row className="drawer-item">
        <Col xs={3} className="di-image-container">
          <img src={item.image_url} alt={item.name} className="drawer-item-image" />
        </Col>
        <Col xs={6} className="di-info-container">
          <h3 className="drawer-item-name">{item.name}</h3>
          <h3 className="drawer-item-price">{item.price}</h3>
        </Col>
        <Col xs={3} className="di-button-container">
          <Button variant="outline-warning" className="shop-button drawer-item-button" onClick={() => cartContext.cartDispatch({ type: "REMOVE_CART_ITEM", payload: item })}><span className="di-button-text"></span></Button>
        </Col>
      </Row>
    </>
  )
}

export default CartDrawerItem;