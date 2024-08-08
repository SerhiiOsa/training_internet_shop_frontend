import React from 'react';
import { Container } from 'react-bootstrap';
import Pages from '../components/Pages';
import BasketProductList from '../components/BasketProductList';

const Basket = () => {
  return (
    <Container fluid style={{ padding: "0 20px" }}>
      <BasketProductList />
      <Pages />
    </Container>
  );
};

export default Basket;