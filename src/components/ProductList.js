import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Row } from 'react-bootstrap';
import ProductItem from './ProductItem';

const ProductList = observer(() => {
  const { product } = useContext(Context);
  return (
    <Row>
      {
        product.products.map(p => 
          <ProductItem 
          product={p}
          key={p.id}
          ></ProductItem>
        )
      }
    </Row>
  );
});

export default ProductList;