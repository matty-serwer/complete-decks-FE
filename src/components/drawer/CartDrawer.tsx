import React, { Dispatch, SetStateAction, useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Row } from 'react-bootstrap';
import CartContext from '../../context/Context';
import UIContext from '../../context/UIContext';
// icons
import { MdSkateboarding } from "react-icons/md";
// components 
import CartDrawerItem from './CartDrawerItem';
// styles
import '../../styles/CartDrawer.css'

export interface ICartDrawerProps {
  show: boolean;
  // setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const CartDrawer: React.FC<ICartDrawerProps> = (props) => {
  const { show } = props;
  let drawerClass = "cart-drawer";
  if (show) {
    drawerClass = "cart-drawer open";
  }

  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;

  const uiContext = useContext(UIContext);
  const drawerOpen = uiContext.uiState.drawerOpen;

  const [total, setTotal] = useState(0);
  const [deckInCart, setDeckInCart] = useState(false);
  const [trucksInCart, settrucksInCart] = useState(false);
  const [wheelsInCart, setWheelsInCart] = useState(false);

  const history = useHistory();

  const handleGoToCart = () => {
    history.push('/cart');
    uiContext.uiDispatch({ type: "SET_HIDE_DRAWER" });
  }

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
    <div className={drawerClass}>
      <div className="cart-body">
        {cartItems.length === 3 ?
          (<div className="drawer-header">
            <h1 className="animate-flicker">Deck Complete!</h1>
          </div>)
          : null}
        <div className="cart-container">
          <Container className="cart-items-container">
            {cartItems.length ?
              <Row>
                {cartItems.map(_item => <CartDrawerItem key={_item.productId} item={_item} />)}
              </Row> :
              <h3>No parts selected yet...</h3>}
          </Container>
          <div className="total-container">
            <p className="total"> Total: ${total}</p>
          </div>

          <div className="still-need">
            {cartItems.length < 3 ? (
              <span>Looks like you still need: </span>
            ) : (
              null
            )}
            <div className="need-items">
              {!deckInCart ? (
                <Link to='/items?category=decks' className="cart-link" onClick={() => uiContext.uiDispatch({ type: "SET_HIDE_DRAWER" })}><MdSkateboarding className="chev-icon" /> a deck</Link>
              ) : (
                null
              )}
              {!trucksInCart ? (
                <Link to='/items?category=trucks' className="cart-link" onClick={() => uiContext.uiDispatch({ type: "SET_HIDE_DRAWER" })}><MdSkateboarding className="chev-icon" /> trucks</Link>
              ) : (
                null
              )}
              {!wheelsInCart ? (
                <Link to='/items?category=wheels' className="cart-link" onClick={() => uiContext.uiDispatch({ type: "SET_HIDE_DRAWER" })}><MdSkateboarding className="chev-icon" /> wheels</Link>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
        <div className="drawer-button-container">
          <Button variant="outline-primary" className="shop-button" onClick={() => uiContext.uiDispatch({ type: "SET_HIDE_DRAWER" })}>Close</Button>
          {cartItems.length === 3 ? (
            <Button variant="outline-primary" className="shop-button" onClick={() => handleGoToCart()}>Go To Cart!</Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
