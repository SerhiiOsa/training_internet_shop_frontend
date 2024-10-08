import React, { useState } from 'react';
import {Modal, Button, Form } from 'react-bootstrap'
import { createBrand } from '../../http/itemApi';

const CreateBrand = ({show, onHide}) => {
  const [value, setValue] = useState('');

  const addBrand = () => {
    createBrand({name: value}).then(data => {
      setValue('');
      onHide();
    })
  } 

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder='Input brand name'
            value={value}
            onChange={e =>  setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-success' onClick={addBrand}>Add</Button>
        <Button variant='outline-danger' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

  );
};

export default CreateBrand;