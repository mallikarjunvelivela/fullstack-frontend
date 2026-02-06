import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './IdleTimeoutModal.css';

const IdleTimeoutModal = ({ show, onContinue, onSignOut, countdown }) => {
  return (
    <Modal show={show} onHide={onContinue} backdrop="static" keyboard={false} dialogClassName="idle-timeout-modal" style={{ marginTop: '6vh' }}>
        <Modal.Header className="p-1">
            <Modal.Title style={{marginLeft: "2%"} }>Are you still there?</Modal.Title>
        </Modal.Header>
      <Modal.Body className="p-2 text-center">
        <p className="mb-1">You will be signed out in <strong className="text-danger">{countdown}</strong> seconds.</p>
        <p className="mb-1">You've been inactive for a while.</p>
      </Modal.Body>
      <Modal.Footer className="p-1 justify-content-center">
        <Button variant="danger" onClick={onSignOut} size="sm">
          Sign Out
        </Button>
        <Button variant="primary" onClick={onContinue} size="sm">
          Continue Session
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IdleTimeoutModal;