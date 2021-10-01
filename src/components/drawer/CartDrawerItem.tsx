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
      <Card className="drawer-cart-card">
        <Row className="drawer-cart-card-row">
          <Col xs={4}>
            <Card.Img src={item.image_url} className="drawer-cart-card-image" />
          </Col>
          <Col xs={8}>
            <Card.Body className="drawer-card-body">
              <div className="dc-body-left">
                <Card.Title className="drawer-cart-item-title">{item.name}</Card.Title>
                <Card.Text className="drawer-cart-item-price">${item.price}</Card.Text>
              </div>
              <div className="dc-body-right">
                <Button variant="outline-warning" className="shop-button drawer-item-button" onClick={() => cartContext.cartDispatch({ type: "REMOVE_CART_ITEM", payload: item })}>Remove<span className="from-cart"></span></Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default CartDrawerItem;