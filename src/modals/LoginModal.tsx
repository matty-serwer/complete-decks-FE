import React, { Dispatch, SetStateAction, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

interface ILoginModalProps {
  setShowLoginModal: Dispatch<SetStateAction<boolean>>;
  showLoginModal: boolean;
}

const CategoryModal: React.FC<ILoginModalProps> = (props) => {
  const { setShowLoginModal, showLoginModal } = props;

  const { push } = useHistory();


  return (
    <Modal show={showLoginModal} className="login-modal" onHide={() => setShowLoginModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Uh Oh!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You need to be logged in to save a board.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning shop-button" onClick={() => push('/login')}>
          Login
        </Button>
        <Button variant="outline-primary shop-button" onClick={() => setShowLoginModal(false)}>
          Go Back
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CategoryModal;
