import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import CartContext from '../context/Context';
// components
import NavbarComponent from './Navbar';
import CartItem from './CartItem';
// styles
import '../styles/Cart.css';


export interface ICartProps { }

const Cart: React.FC<ICartProps> = props => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;
  const deckComplete = cartContext.deckComplete;

  const [total, setTotal] = useState(0);
  const [completeDeck, setCompleteDeck] = useState(false);


  useEffect(() => {
    setTotal(
      cartItems.reduce((acc, _item) => acc + Number(_item.price), 0)
    )

    // let decksInCart = cartItems.some((_item) => _item.category === "decks");
    // let trucksInCart = cartItems.some((_item) => _item.category === "trucks");
    // let wheelsInCart = cartItems.some((_item) => _item.category === "wheels");

    // if (decksInCart && trucksInCart && wheelsInCart) {
    //   setCompleteDeck(true);
    // }


  }, [cartItems])

  return (
    <>
      <NavbarComponent colorShift="light" />
      {deckComplete ?
        (<div className="header">
          <h1>Deck Complete!</h1>
          <h3>Checkout to purchase board, or Save Board to add it to your Board List.</h3>
        </div>)
        : null}
      <div className="cart-container">
        <Container className="cart-items-container">
          {cartItems.length ?
            <Row>
              {cartItems.map(_item => <CartItem key={_item.productId} item={_item} />)}
            </Row> :
            <h3>No parts selected yet...</h3>}
        </Container>
        <div className="register">
          <p>Total: S{total}</p>
          <div className="button-container">
            <Button variant="outline-primary" className="reg-button">Checkout</Button>
            <Button variant="outline-primary" className="reg-button">Save Board</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
