import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const SimpleModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div className="modal-body">
      <h2>Modal Content</h2>
      <p>This is a simple modal example using Material-UI.</p>
      <Button onClick={handleClose} variant="contained" color="primary">
        Close
      </Button>
    </div>
  );

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>hello</div>

        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        
      </Modal>
    </div>
  );
};

export default SimpleModal;
