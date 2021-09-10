import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';

import CartItem from './CartItem';
import CartContext from '../context/Context';

export interface ICartProps { }

const Cart: React.FC<ICartProps> = props => {
  const cartContext = useContext(CartContext);

  return (
    <>
      <Container>
        {Object.keys(cartContext.cartState.items).length > 0 ?
          <Row>
            {Object.keys(cartContext.cartState.items).map((value, index) => {
              let _items = cartContext.cartState.items[value];

              if (_items.length > 0) {
                return (
                  <CartItem key={index} item={_items[0]} quantity={_items.length} />
                )
              }
              else { return null }
            })}
          </Row>
          :
          <h3>Your cart is empty...</h3>

        }
      </Container>
    </>
  )
}

export default Cart
