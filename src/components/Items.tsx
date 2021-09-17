import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Breadcrumb } from 'react-bootstrap';
import { PropagateLoader } from 'react-spinners';
import { useQuery } from '../hooks'
import { IItem } from '../context/types';
// components
import ItemComponent from './Item';
import NavbarComponent from './Navbar';
//styles
import '../styles/Items.css';

import itemsData from '../data.json';

interface IItemsProps { }

const setItems = (itemsList: IItem[]): void => {
  itemsList = itemsData.PARTS_LIST_DATA;
}


const Items: React.FC<IItemsProps> = (props) => {
  const [itemsList, setItemsList] = useState(new Array<IItem>());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setTimeout(() => setItemsList(itemsData.PARTS_LIST_DATA), 2000)
    setItemsList(itemsData.PARTS_LIST_DATA)
  }, []);

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
      </Container>
    </div>
  )
}

export default Items
