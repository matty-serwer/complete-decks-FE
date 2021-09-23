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
//styles
import '../styles/Items.css';

import itemsData from '../data.json';

interface IItemsProps { }

const BACKEND_URL = "https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev";

const fetchItems = () => {
  axios
    .get(`https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev/items`)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })

}

const Items: React.FC<IItemsProps> = (props) => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;
  const deckComplete = cartContext.deckComplete;

  const [itemsList, setItemsList] = useState(new Array<IItem>());
  const [isLoading, setIsLoading] = useState(false);
  const [showCompModal, setShowCompModal] = useState(false);

  let history = useHistory();

  useEffect(() => {
    // setItemsList(itemsData.PARTS_LIST_DATA)
    fetchItems();
  }, []);

  useEffect(() => {
    setShowCompModal(deckComplete);
  }, [cartItems])

  const handleToCart = () => {
    setShowCompModal(false);
    // return <Redirect to='/cart' />;
    history.push('/cart');
  }

  let query = useQuery();
  const category = query.get("category");

  return (
    <div className="items">
      <NavbarComponent colorShift="light" />
      <Container>
        <div className="breadcrumb-container">
          <Breadcrumb className="cat-breadcrumb">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/items?category=decks" }} active={category === "decks"}>Decks</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/items?category=trucks" }} active={category === "trucks"}>
              Trucks
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/items?category=wheels" }} active={category === "wheels"}>Wheels</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row>
          {isLoading ?
            <PropagateLoader size={20} color="#1cdbce" />
            :
            itemsList.filter(item => item.category === category).map(_item => (<ItemComponent key={_item.id} item={_item} />)
            )}
        </Row>

        <Modal show={showCompModal} onHide={() => setShowCompModal(false)}>
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
      </Modal>
      </Container>
    </div>
  )
}

export default Items
