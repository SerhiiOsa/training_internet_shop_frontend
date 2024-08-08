import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar';
import ProductList from '../components/ProductList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchProducts, fetchTypes } from '../http/itemApi';
import Pages from '../components/Pages';

const Shop = observer(() => {
  const {type, brand, typeBrand, product} = useContext(Context);

  useEffect(() => {
    fetchBrands().then(data => {
      brand.setBrands(data);
      typeBrand.setSelectedTypeBrands(brand.brands);
      brand.setSelectedBrand(brand.brands[0]);
    });
    fetchTypes().then(data => {
      type.setTypes(data.types);
      typeBrand.setTypeBrands(data.typeBrands);
    });
    
    type.setSelectedType(type.selectedTypeHistory);
    brand.setSelectedBrand(brand.selectedBrandHistory);
    
    fetchProducts()
    .then(data => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  }, [])

  useEffect(() => {
    fetchProducts(
      type.selectedType.name === 'Всі' ? '' : type.selectedType.id, 
      brand.selectedBrand.name === 'Всі' ? '' : brand.selectedBrand.id,
      product.page,
      product.limit
    ).then(data => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  }, [product.page, type.selectedType, brand.selectedBrand])

  return (
    <Container fluid style={{ padding: "0 20px" }}>
      <Row className='mt-2'>
        <Col md={2}>
          <TypeBar />
        </Col>
        <Col md={10}>
          <BrandBar />
          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>

  );
});

export default Shop;