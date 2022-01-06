import React, { useContext, useEffect, useState, SyntheticEvent } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CartContext from '../context/Context';
// icons
import { MdSkateboarding } from "react-icons/md";
// components
import NavbarComponent from './Navbar';
import CartItem from './CartItem';
import LoginModal from '../modals/LoginModal';
import SaveModal from '../modals/SaveModal';
// utils
import axiosWithAuth from '../utils/axiosWithAuth';
// styles
import '../styles/Cart.css';


export interface ICartProps { }

const Cart: React.FC<ICartProps> = props => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;

  const [total, setTotal] = useState("");
  const [deckInCart, setDeckInCart] = useState(false);
  const [trucksInCart, settrucksInCart] = useState(false);
  const [wheelsInCart, setWheelsInCart] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const BACKEND_URL = 'https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev2'

  const { push } = useHistory();


  useEffect(() => {
    let initTotal = cartItems.reduce((acc, _item) => acc + Number(_item.price), 0);
    setTotal(initTotal.toFixed(2));

    let deck = cartItems.some((_item) => _item.category === "decks");
    let trucks = cartItems.some((_item) => _item.category === "trucks");
    let wheels = cartItems.some((_item) => _item.category === "wheels");
    setDeckInCart(deck);
    settrucksInCart(trucks);
    setWheelsInCart(wheels);
  }, [cartItems])

  const handleSaveBoard = (event: SyntheticEvent) => {
    event.preventDefault();
    // let deckId = "";
    // let trucksId = "";
    // let wheelsId = "";
    // let boardId = uuidv4();
    // const userId = localStorage.getItem('sub');
    // cartItems.forEach((_item) => {
    //   if (_item.category === "decks") {
    //     deckId = _item.productId.toString();
    //   } else if (_item.category === "trucks") {
    //     trucksId = _item.productId.toString();
    //   } else if (_item.category === "wheels") {
    //     wheelsId = _item.productId.toString();
    //   }
    // })

    // if (localStorage.getItem('idToken')) {
    //   let idToken = localStorage.getItem('idToken');
    //   axios
    //     .post(`${BACKEND_URL}/board`, {
    //       "boardId": boardId,
    //       "userId": userId,
    //       "deckId": deckId,
    //       "trucksId": trucksId,
    //       "wheelsId": wheelsId
    //     }, {
    //       headers: {
    //         "Authorization": idToken,
    //       }
    //     })
    //     .then((response: any) => {
    //       console.log(response);
    //       push('/boardlist');
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     })
    if (localStorage.getItem('idToken')) {
      setShowSaveModal(true);
    } else {
      setShowLoginModal(true);
    }
  }

  return (
    <>
      <Container className="cart-component">
        <NavbarComponent colorShift="light" />
        <div className="cart-body">
          {cartItems.length === 3 ?
            (<div className="cart-header">
              <h1>Deck Complete!</h1>
              <h3>Checkout to purchase board, or Save Board to add it to your Board List.</h3>
            </div>)
            : null}
          <div className="cart-container">
            <div className="cart-items-container">
              {cartItems.length ?
                <Row>
                  {cartItems.map(_item => <CartItem key={_item.id} item={_item} />)}
                </Row> :
                <h3 className="no-parts">No parts selected yet...</h3>}
            </div>
            <div className="total-container">
              <p className="total"> Total: ${total}</p>
            </div>
            {cartItems.length === 3 ? (
              <div className="cart-button-container">
                <Button variant="outline-primary" className="reg-button shop-button" onClick={handleSaveBoard}>Save Board</Button>
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
                  <Link to='/items?category=decks' className="cart-link"><MdSkateboarding className="chev-icon" /> a deck </Link>
                ) : (
                  null
                )}
                {!trucksInCart ? (
                  <Link to='/items?category=trucks' className="cart-link"><MdSkateboarding className="chev-icon" /> trucks </Link>
                ) : (
                  null
                )}
                {!wheelsInCart ? (
                  <Link to='/items?category=wheels' className="cart-link"><MdSkateboarding className="chev-icon" /> wheels </Link>
                ) : (
                  null
                )}
              </div>
            </div>
          </div>
        </div>
        <LoginModal setShowLoginModal={setShowLoginModal} showLoginModal={showLoginModal} />
        <SaveModal setShowSaveModal={setShowSaveModal} showSaveModal={showSaveModal} />
      </Container>
    </>
  )
}

export default Cart
