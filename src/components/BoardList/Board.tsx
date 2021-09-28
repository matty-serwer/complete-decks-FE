import React, { useState, useEffect, SyntheticEvent, Dispatch, SetStateAction } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { IBoard } from './BoardList';
import { IItem } from '../../context/types';
import CartContext from '../../context/Context';
// components
import BoardItem from './BoardItem';

const BACKEND_URL = 'https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev2';

export interface IBoardProps {
  board: IBoard;
  setBoardDeleted: Dispatch<SetStateAction<boolean>>;
  boardDeleted: Boolean;
}

const Board: React.FC<IBoardProps> = (props) => {
  const { board, setBoardDeleted, boardDeleted} = props;
  // const [itemsList, setItemsList] = useState(new Array<IItem>());
  const [boardItems, setBoardItems] = useState(new Array<IItem>());
  const [boardDeck, setBoardDeck] = useState<IItem | undefined>(undefined);
  const [boardTrucks, setBoardTrucks] = useState<IItem | undefined>(undefined);
  const [boardWheels, setBoardWheels] = useState<IItem | undefined>(undefined);

  const fetchBoardItems = () => {
    axios
    .get(`${BACKEND_URL}/products`)
    .then(response => {
      // setItemsList(response.data.products)
      let itemsList: IItem[] = response.data.products;
      let deck = itemsList.find(_item => _item.productId.toString() === board.deckId)
      let trucks = itemsList.find(_item => _item.productId.toString() === board.trucksId)
      let wheels = itemsList.find(_item => _item.productId.toString() === board.wheelsId)
      console.log(deck);
      if (deck && trucks && wheels) {
        setBoardItems([deck, trucks, wheels]);
        console.log('found');
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    console.log(board);
    fetchBoardItems();
  }, []);

  const handleDelete = (event: SyntheticEvent) => {
    event.preventDefault();
    let idToken = localStorage.getItem('idToken');

    axios.delete(`${BACKEND_URL}/board`, {
      headers: {
        "Authorization": idToken
      },
      data: {
        "boardId": board.boardId
      }
    })
      .then((response) => {
        console.log(response);
        alert("Successfully Deleted");
      })
      .then((response) => {
        console.log(response);
        setBoardDeleted(!boardDeleted)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <Card>
      <h3>Board!</h3>
      <Card.Body>
        <Row>
          {boardItems.length ? (
            boardItems.map(_item => <BoardItem key={_item.productId} item={_item} />)
          ) : (
            <p>loading..</p>
          )}
        </Row>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline-primary" className="shop-button" onClick={handleDelete}>Delete</Button>
      </Card.Footer>
    </Card>
  )
}

export default Board;
