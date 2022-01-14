import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import NavbarComponent from '../Navbar';
import { BACKEND_URL } from '../../context/types';
// components
import Board from './Board';
// styles
import '../../styles/BoardList.css';
import axios from 'axios';

export interface IBoardListProps { }

export interface IBoard {
  id: number;
  name: string;
  user_id: string;
  deck_id: number;
  trucks_id: number;
  wheels_id: number;
};



const BoardList: React.FC<IBoardListProps> = () => {
  // const [boardList, setBoardList] = useState<IBoard[]>([]);
  const [boardList, setBoardList] = useState(new Array<IBoard>());
  const [userId, setUserId] = useState("");
  const [boardDeleted, setBoardDeleted] = useState(false);

  useEffect(() => {
    let idToken = localStorage.getItem('idToken');
    let userSub = localStorage.getItem('sub');
    if (userSub) {
      setUserId(userSub);
    }

    axios.get(`${BACKEND_URL}/board`,
      {
        headers: {
          "Authorization": idToken
        }
      })
      .then((response) => {
        const boards = response.data;
        setBoardList(boards);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [boardDeleted])

  return (
    <div className="boardlist-component">
      <Container>
        <NavbarComponent colorShift={"light"} />
        <h1 className="boardlist-header">My Board List</h1>
        <div className="boardlist-container">
          {boardList.length ? (
            <div>
              {boardList.filter(_board => _board.user_id === userId).map(filteredBoard => <Board key={filteredBoard.id} board={filteredBoard} setBoardDeleted={setBoardDeleted} boardDeleted={boardDeleted} />)}
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
