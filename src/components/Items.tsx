import React, { useEffect, useState, useContext, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb, Form } from 'react-bootstrap';
import { useQuery } from '../hooks'
import { IItem } from '../context/types';
import CartContext from '../context/Context';
import UIContext from '../context/UIContext';
import axios from 'axios';
// icons 
import { MdOutlineSearch } from 'react-icons/md';
// components
import ItemComponent from './Item';
import NavbarComponent from './Navbar';
import CartDrawer from './drawer/CartDrawer';
import Backdrop from './drawer/Backdrop';
import Loader from './Loader';
import ScrollButton from '../utils/ScrollButton';
//styles
import '../styles/Items.css';

interface IItemsProps { }

const BACKEND_URL = "https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev2";

const Items: React.FC<IItemsProps> = (props) => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartState.cartItems;

  const uiContext = useContext(UIContext);
  const drawerOpen = uiContext.uiState.drawerOpen;
  const deckStrikeClass = uiContext.uiState.deckStrikeClass;
  const trucksStrikeClass = uiContext.uiState.trucksStrikeClass;
  const wheelsStrikeClass = uiContext.uiState.wheelsStrikeClass;

  const [itemsList, setItemsList] = useState(new Array<IItem>());
  const [printItemsList, setPrintItemsList] = useState(new Array<IItem>());
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  let history = useHistory();

  useEffect(() => {
    axios
      .get(`https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev2/products`)
      .then(response => {
        setItemsList(response.data.products);
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
      uiContext.uiDispatch({ type: "ADD_STRIKE_CLASS", payload: "decks" });
    }
    if (trucks) {
      uiContext.uiDispatch({ type: "ADD_STRIKE_CLASS", payload: "trucks" });
    }
    if (wheels) {
      uiContext.uiDispatch({ type: "ADD_STRIKE_CLASS", payload: "wheels" });
    }

  }, [cartItems])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (searchTerm) {
      setItemsList
    }

  }

  let query = useQuery();
  const category = query.get("category");

  return (
    <div className="items">
      <Container>
        <NavbarComponent colorShift="light" />
        <CartDrawer show={drawerOpen} />
        {drawerOpen ? <Backdrop /> : null}
        <div className="breadcrumb-container">
          <div className="space" />
          <Breadcrumb className="cat-breadcrumb">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/items?category=decks" }} active={category === "decks"} className={deckStrikeClass}>Decks</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/items?category=trucks" }} active={category === "trucks"} className={trucksStrikeClass}>
              Trucks
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/items?category=wheels" }} active={category === "wheels"} className={wheelsStrikeClass}>Wheels</Breadcrumb.Item>
          </Breadcrumb>
          <div className="search-icon-container">
            <MdOutlineSearch className="search-icon" onClick={() => setShowSearch(!showSearch)} />
          </div>
        </div>
        {showSearch ? (
          <div className="search-container">
            <Form>
              <Form.Group as={Row} controlId="formSearchBar" className="form-group-search">
                <Form.Label column sm="1" className="search-form-label">
                  <MdOutlineSearch className="search-label-icon" />
                </Form.Label>
                <Col xs="12" sm="11">
                  <Form.Control type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
                </Col>
              </Form.Group>
            </Form>
          </div>
        ) : (
          null
        )}

        <Row className="items-list-conainer">
          {/* {itemsList.length ?
            (itemsList.filter(item => item.category === category).map(_item => (<ItemComponent key={_item.productId} item={_item} />))) : (
              <Loader />
            )} */}
          {itemsList.length ?
            [
              (searchTerm.length ?
                itemsList.filter(item => item.category === category && item.name.toLowerCase().includes(searchTerm.toLowerCase())).map(_item => (<ItemComponent key={_item.productId} item={_item} />)
                ) : (
                  itemsList.filter(item => item.category === category).map(_item => (<ItemComponent key={_item.productId} item={_item} />))
                )
              )
            ] : (
              <Loader />
            )}
          {itemsList.length && searchTerm.length && itemsList.filter(item => item.category === category && item.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
            <div className="empty-search">
              <h3>No Matches.</h3>
            </div>
          ) : (
            null
          )}
        </Row>
      </Container>
      <ScrollButton />
    </div>
  )
}

export default Items
