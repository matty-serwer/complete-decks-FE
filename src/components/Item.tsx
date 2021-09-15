import React, { useContext } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import CartContext from './../context/Context';
import { IItem } from './../context/types';

import '../styles/Item.css'

interface IItemComponentProps {
  item: IItem;
}

const ItemComponent: React.FC<IItemComponentProps> = (props) => {
  const { item } = props;
  const cartContext = useContext(CartContext);

  return (
    <Col sm={12} md={6} lg={4} >
      <Card className="card">
        <Card.Body className="card-body">
          <Card.Title className="card-title">{item.name}</Card.Title>
          <Card.Img src={item.image_url} className="card-image"/>
          <div className="card-bottom">
            <Card.Text className="price">
              ${item.price}
            </Card.Text>
            <Button className="add-button" variant="outline-primary" onClick={() => cartContext.cartDispatch({ type: "ADD_CART_ITEM", payload: item })}>Add This Part</Button>

          </div>
        </Card.Body>
      </Card>
    </Col >
  )
}

export default ItemComponent;
