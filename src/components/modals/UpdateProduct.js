import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown, Row, Col, ListGroup } from 'react-bootstrap';
import { Context } from '../..';
import { fetchCharacteristics, fetchOneProduct, updateProduct } from '../../http/itemApi';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

const UpdateProduct = observer(({ show, onHide }) => {
  const { type, brand, characteristic, updatingProduct } = useContext(Context);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [currentInputNumber, setCurrentInputNumber] = useState(null);
  const {id} = useParams();
  const [product, setProduct] = useState({info: []});

  useEffect(() => {
    fetchOneProduct(id).then(data => setProduct(data));
  }, []);

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    const infoWithNumbers = product.info 
      ? 
      product.info.map(i => {
        i.number = uuidv4();
        return i;
      })
      :
      [];
    setInfo(infoWithNumbers);
    fetchCharacteristics().then(data => characteristic.setCharacteristics(data));
    type.setSelectedType(type.types.find(t => t.id === product.typeId));
    brand.setSelectedBrand(brand.brands.find(b => b.id === product.brandId));
  }, [product, type, brand]);

  const addInfo = () => {
    const key = uuidv4();
    setInfo([...info, { title: '', description: '', number: key }]);
    setCurrentInputNumber(key);
  };

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number));
    setSuggestions([]);
  };

  const selectFile = e => {
    setFile(e.target.files[0]);
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
    if (key === 'title') {
      const filteredSuggestions = characteristic.characteristics.filter(c =>
        c.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setCurrentInputNumber(number);
    }
  };

  const selectSuggestion = (suggestion, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, title: suggestion } : i));
    setSuggestions([]);
  };

  const editProduct = () => {
    if (!name || price <= 0 || type.selectedType.name === 'Всі' || brand.selectedBrand.name === 'Всі') {
      alert('All fields are required and must be valid!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('img', file);
    formData.append('typeId', type.selectedType.id);
    formData.append('brandId', brand.selectedBrand.id);
    formData.append('info', JSON.stringify(info));
    
    updateProduct(id, formData).then(() => {
      updatingProduct.updateCount();
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{type.selectedType ? type.selectedType.name : 'Choose type'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {type.types.map(t =>
                <Dropdown.Item
                  key={t.id}
                  onClick={() => {
                    type.setSelectedType(t)
                  }}
                >
                  {t.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{brand.selectedBrand ? brand.selectedBrand.name : 'Choose brand'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {brand.brands.map(b =>
                <Dropdown.Item
                  key={b.id}
                  onClick={() => brand.setSelectedBrand(b)}
                >
                  {b.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className='mt-3'
            placeholder='Input product name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder='Input price'
            type='number'
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
          />
          <Form.Control
            className='mt-3'
            placeholder='Attach file'
            type='file'
            onChange={selectFile}
          />
          <hr />
          <Button
            variant='outline-dark'
            onClick={addInfo}
          >
            Add new characteristic
          </Button>
          {
            info.map(i =>
              <Row className='mt-4' key={i.number}>
                <Col md={4}>
                  <Form.Control
                    placeholder='Input characteristic name'
                    value={i.title}
                    onChange={e => changeInfo('title', e.target.value, i.number)}
                  />
                  {currentInputNumber === i.number && suggestions.length > 0 && (
                    <ListGroup className='mt-2'>
                      {suggestions.map(s =>
                        <ListGroup.Item
                          key={s}
                          action
                          onClick={() => selectSuggestion(s, i.number)}
                        >
                          {s}
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  )}
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder='Input characteristic description'
                    value={i.description}
                    onChange={e => changeInfo('description', e.target.value, i.number)}
                  />
                </Col>
                <Col md={4}>
                  <Button variant='outline-danger' onClick={() => removeInfo(i.number)}>Delete</Button>
                </Col>
              </Row>
            )
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-success' onClick={editProduct}>Save</Button>
        <Button variant='outline-danger' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateProduct;
