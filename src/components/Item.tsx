import React, { useContext } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import CartContext from './../context/Context';
import { IItem } from './../context/types';

export interface IItemComponentProps {
  item: IItem;
}

const ItemComponent: React.FC<IItemComponentProps> = (props) => {
  const { item } = props;
  const cartContext = useContext(CartContext);

  return (
    <Col sm={12} md={6} lg={4} >
      <Card>
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Img src={item.image_url} />
          <Card.Text>
            {item.description}
          </Card.Text>
          <Button variant="primary" onClick={() => cartContext.cartDispatch({ type: 'add_item', payload: item})}>Add This Part</Button>
        </Card.Body>
      </Card>
    </Col >
  )
}

export default ItemComponent;
