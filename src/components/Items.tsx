import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Container, Row, Breadcrumb, Modal, Button } from 'react-bootstrap';
import { PropagateLoader } from 'react-spinners';
import { useQuery } from '../hooks'
import { IItem } from '../context/types';
import CartContext from '../context/Context';
import axios from 'axios';
// components
import ItemComponent from './Item';
import NavbarComponent from './Navbar';
import CartDrawer from './drawer/CartDrawer';
import Backdrop from './drawer/Backdrop';
import Loader from './Loader';
//styles
import '../styles/Items.css';

import itemsData from '../data.json';

interface IItemsProps { }

const BACKEND_URL = "https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev2";

const Items: React.FC<IItemsProps> = (props) => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;
  const deckComplete = cartContext.deckComplete;

  const [itemsList, setItemsList] = useState(new Array<IItem>());
  const [isLoading, setIsLoading] = useState(false);
  const [showCompModal, setShowCompModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [deckStrikeClass, setDeckStrikeClass] = useState("");
  const [trucksStrikeClass, settrucksStrikeClass] = useState("");
  const [wheelsStrikeClass, setWheelsStrikeClass] = useState("");

  let history = useHistory();

  useEffect(() => {
    axios
      .get(`https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev2/products`)
      .then(response => {
        setItemsList(response.data.products)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  useEffect(() => {
    let deck = cartItems.some((_item) => _item.category === "decks");
    let trucks = cartItems.some((_item) => _item.category === "trucks");
    let wheels = cartItems.some((_item) => _item.category === "wheels");

    if (deck) {
      setDeckStrikeClass("strike-thru");
    }
    if (trucks) {
      settrucksStrikeClass("strike-thru");
    }
    if (wheels) {
      setWheelsStrikeClass("strike-thru");
    }

  }, [cartItems])

  // const handleToCart = () => {
  //   setShowCompModal(false);
  //   history.push('/cart');
  // }

  let query = useQuery();
  const category = query.get("category");

  return (
    <div className="items">
      <NavbarComponent colorShift="light" />
      <CartDrawer show={drawerOpen} setDrawerOpen={setDrawerOpen} />
      {drawerOpen ? <Backdrop setDrawerOpen={setDrawerOpen} /> : null}
      <Container>
        <div className="breadcrumb-container">
          <Breadcrumb className="cat-breadcrumb">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/items?category=decks" }} active={category === "decks"} className={deckStrikeClass}>Decks</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/items?category=trucks" }} active={category === "trucks"} className={trucksStrikeClass}>
              Trucks
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/items?category=wheels" }} active={category === "wheels"} className={wheelsStrikeClass}>Wheels</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row>
          {itemsList.length ? 
            (itemsList.filter(item => item.category === category).map(_item => (<ItemComponent key={_item.productId} item={_item} setDrawerOpen={setDrawerOpen} />))) : (
              <Loader/>
            )}
        </Row>

        {/* <Modal show={showCompModal} onHide={() => setShowCompModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Deck Complete!</Modal.Title>
          </Modal.Header>
          <Modal.Body>You&apos;re deck is complete! Go check it out in the cart.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => handleToCart()}>
              Go To Cart
            </Button>
            <Button variant="primary" onClick={() => setShowCompModal(false)}>
              Go Back
            </Button>
          </Modal.Footer>
        </Modal> */}
      </Container>
    </div>
  )
}

export default Items
