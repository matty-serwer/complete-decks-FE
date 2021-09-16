import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import CartContext from '../context/Context';
// components
import NavbarComponent from './Navbar';
import CartItem from './CartItem';


export interface ICartProps { }

const Cart: React.FC<ICartProps> = props => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;

  return (
    <>
      <NavbarComponent />
      <Container>
        {cartItems.length ?
          <Row>
            {cartItems.map(_item => <CartItem key={_item.id} item={_item} quantity={1} />)}
          </Row> :
          <h3>No parts selected yet...</h3>}

      </Container>
    </>
  )
}

export default Cart
