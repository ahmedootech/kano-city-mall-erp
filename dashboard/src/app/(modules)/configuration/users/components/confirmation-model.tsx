import React from "react";
import { Modal } from "react-bootstrap";

interface ConfirmationModalProps {
  show: boolean; 
  onHide: () => void; 
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onHide,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to update the user information?
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <button className="btn btn-secondary mx-2 btn-lg w-25" onClick={onHide}>
          No
        </button>
        <button className="btn btn-primary mx-2 btn-lg w-25" onClick={onConfirm}>
          Yes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;