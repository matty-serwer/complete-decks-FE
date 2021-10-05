import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import NavbarComponent from '../Navbar';
import IItem from '../../context/types';
// components
import Board from './Board';
// styles
import '../../styles/BoardList.css';
import axios from 'axios';

export interface IBoardListProps { }

export interface IBoard {
  boardId: string;
  name: string;
  userId: string;
  deckId: string;
  trucksId: string;
  wheelsId: string;
};



const BoardList: React.FC<IBoardListProps> = () => {
  // const [boardList, setBoardList] = useState<IBoard[]>([]);
  const [boardList, setBoardList] = useState(new Array<IBoard>());
  const [userId, setUserId] = useState("");
  const [boardDeleted, setBoardDeleted] = useState(false);


  const BACKEND_URL = 'https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev2'

  useEffect(() => {
    let idToken = localStorage.getItem('idToken');
    let userSub = localStorage.getItem('sub');
    if(userSub) {
      setUserId(userSub);
    }

    axios.get(`${BACKEND_URL}/boards`,
      {
        headers: {
          "Authorization": idToken
        }
      })
      .then((response) => {
        // console.log(response);
        const boards = response.data.boards;
        setBoardList(boards);
        // console.log(boardList);
        
      })
      .catch((error) => {
        console.error(error);
      })
  }, [boardDeleted])

  return (
    <div className="boardlist-component">
      <NavbarComponent colorShift={"light"} />
      <Container>
        <h1 className="boardlist-header">My Board List</h1>
        <div className="boardlist-container">
        {boardList.length ? (
          <div>
            {boardList.filter(_board => _board.userId === userId).map(filteredBoard => <Board key={filteredBoard.boardId} board={filteredBoard} setBoardDeleted={setBoardDeleted} boardDeleted={boardDeleted} />)}
          </div>
        ) : (
          <h3 className="empty-boardlist">You&apos;re Board List is empty.</h3>
        )}
        </div>
      </Container>
    </div>
  )
}

export default BoardList
