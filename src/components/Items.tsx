import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { PropagateLoader } from 'react-spinners';
import { useQuery } from '../hooks'
import { IItem } from '../context/types';
import ItemComponent from './Item';

import itemsData from '../data.json';

interface IItemsProps { }

const setItems = (itemsList: IItem[]): void => {
  itemsList = itemsData.PARTS_LIST_DATA;
}


const Items: React.FC<IItemsProps> = (props) => {
  const [itemsList, setItemsList] = useState(new Array<IItem>());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true)
    setTimeout(() => setItemsList(itemsData.PARTS_LIST_DATA), 2000)
    // setIsLoading(false)
  }, []);

  let query = useQuery();
  const category = query.get("category");

  return (
    <>
      <Container>

        <h2>Items Page</h2>
        <h3>{category}</h3>
        <Row>
          {isLoading ?
            <PropagateLoader size={20} color="#1cdbce"/>
          :
          itemsList.filter(item => item.category === category).map(_item => (<ItemComponent key={_item.id} item={_item} />)
          )}
        </Row>
      </Container>
    </>
  )
}

export default Items
