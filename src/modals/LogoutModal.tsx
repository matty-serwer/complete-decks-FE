import React, { Dispatch, SetStateAction, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
// context
import { AccountContext } from '../context/Account';
import { MdHistoryEdu } from 'react-icons/md';

interface ILogoutModalProps {
  setShowLogoutModal: Dispatch<SetStateAction<boolean>>;
  showLogoutModal: boolean;
}

const LogoutModal: React.FC<ILogoutModalProps> = (props) => {
  const { setShowLogoutModal, showLogoutModal } = props;

  const { logout } = useContext(AccountContext);
  const history = useHistory()

  const logoutHandler = () => {
    logout();
    localStorage.removeItem("idToken");
    localStorage.removeItem("sub");
    localStorage.removeItem("firstName");
    history.push('/');
  }

  return (
    <Modal show={showLogoutModal} className="remove-modal" onHide={() => setShowLogoutModal(false)}>
      <Modal.Header>
        <Modal.Title>Logging Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to logout? Any unsaved boards will be lost.</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning shop-button" onClick={() => logoutHandler()}>
          Log Out
        </Button>
        <Button variant="outline-primary shop-button" onClick={() => setShowLogoutModal(false)}>
          Go Back
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LogoutModal
