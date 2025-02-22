import React from 'react'
import { IItem } from '../../context/types';
import { Row, Col, Card } from 'react-bootstrap';
// styles
import './styles/BoardList.css';

export interface IBoardItemProps {
  item: IItem;
}

const BoardItem: React.FC<IBoardItemProps> = (props) => {
  const { item } = props;

  return (
    <Col sm={12} md={4} className="board-item">
      <p className="bi-name">{item.name}</p>
      <p className="bi-price">${item.price}</p>
      <Card.Img src={item.image_url} className="board-item-image" />
      {!(item.category === "wheels") ? (
        <div className="bottom-line" />
      ): (
        null
      )}
      
    </Col>
  )
}

export default BoardItem;
