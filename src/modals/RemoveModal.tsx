import React, { Dispatch, SetStateAction } from 'react'
import { Modal, Button } from 'react-bootstrap';

interface IRemoveModalProps {
  setShowRemoveModal: Dispatch<SetStateAction<boolean>>;
  showRemoveModal: boolean;
  removeHandler: () => void;
}

const RemoveModal: React.FC<IRemoveModalProps> = (props) => {
  const { setShowRemoveModal, showRemoveModal, removeHandler } = props;

  return (
    <Modal show={showRemoveModal} className="remove-modal" onHide={() => setShowRemoveModal(false)}>
      <Modal.Header>
        <Modal.Title>Remove item from cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to remove this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning shop-button" onClick={() => removeHandler()}>
          Yes, Remove item!
        </Button>
        <Button variant="outline-primary shop-button" onClick={() => setShowRemoveModal(false)}>
          Go Back
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveModal
