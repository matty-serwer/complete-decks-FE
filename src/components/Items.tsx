import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { useQuery } from '../hooks'
import { IItem } from '../context/types';
import ItemComponent from './Item';

import itemsData from '../data.json';

interface IItemsProps { }

const itemsList: IItem[] = itemsData.PARTS_LIST_DATA;

const Items: React.FC<IItemsProps> = (props) => {

  let query = useQuery();
  const category = query.get("category");

  return (
    <>
      <Container>

        <h2>Items Page</h2>
        <h3>{category}</h3>
        <Row>
          {itemsList.filter(item => item.category === category).map(_item => (<ItemComponent key={_item.id} item={_item} />)
          )}
        </Row>
      </Container>
    </>
  )
}

export default Items
