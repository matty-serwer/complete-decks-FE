import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';

import CartItem from './CartItem';
import CartContext from '../context/Context';

export interface ICartProps { }

const Cart: React.FC<ICartProps> = props => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;

  return (
    <>
      <Container>
        {cartItems.length > 0 ?
          <Row>
            {cartItems.map(_item => <CartItem key={_item.id} item={_item} quantity={1} />)}
          </Row> :
          <h3>No parts selected yet...</h3>}

      </Container>
    </>
  )
}

export default Cart
