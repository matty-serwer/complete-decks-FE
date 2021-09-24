import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
  const [deckInCart, setDeckInCart] = useState(false);
  const [trucksInCart, settrucksInCart] = useState(false);
  const [wheelsInCart, setWheelsInCart] = useState(false);
  const [completeDeck, setCompleteDeck] = useState(false);


  useEffect(() => {
    setTotal(
      cartItems.reduce((acc, _item) => acc + Number(_item.price), 0)
    )

    let deck = cartItems.some((_item) => _item.category === "decks");
    let trucks = cartItems.some((_item) => _item.category === "trucks");
    let wheels = cartItems.some((_item) => _item.category === "wheels");

    setDeckInCart(deck);
    settrucksInCart(trucks);
    setWheelsInCart(wheels);

  }, [cartItems])

  return (
    <div className="cart-component">
      <NavbarComponent colorShift="light" />
      <div className="cart-body">
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
          <div className="total-container">
            <p className="total"> Total: ${total}</p>
          </div>
          {cartItems.length === 3 ? (
            <div className="button-container">
              <Button variant="outline-primary" className="reg-button shop-button">Save Board</Button>
              <Button variant="outline-primary" className="reg-button shop-button">Checkout</Button>
            </div>
          ) : (
            null
          )}
          <div className="still-need">
            {cartItems.length < 3 ? (
              <span>Looks like you still need: </span>
            ) : (
              null
            )}
            <div className="need-items">
              {!deckInCart ? (
                <Link to='/items?category=decks' className="cart-link">a deck &nbsp;&nbsp;&nbsp;&nbsp;</Link>
              ) : (
                null
              )}
              {!trucksInCart ? (
                <Link to='/items?category=trucks' className="cart-link">trucks &nbsp;&nbsp;&nbsp;&nbsp;</Link>
              ) : (
                null
              )}
              {!wheelsInCart ? (
                <Link to='/items?category=wheels' className="cart-link">wheels &nbsp;&nbsp;&nbsp;&nbsp;</Link>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
