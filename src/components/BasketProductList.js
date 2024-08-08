import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { Button } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { deleteFromBasket, fetchBasket } from '../http/basketApi';

const BasketProductList = observer(() => {
  const { basket } = useContext(Context);

  useEffect(() => {
    fetchBasket().then(data => {
      basket.setProducts(data)
    })
  }, [])


  const removeFromBasket = (productId) => {
    deleteFromBasket({productId}).then(() => {
      basket.removeProduct(productId)
    })
  }

  return (
    <div className='d-flex'>
      {
        basket.products.map(p => 
          <div className='d-flex flex-column justify-content-between m-2'>
            <ProductItem 
              product={p}
              key={p.id}
            ></ProductItem>
            <Button
              variant='outline-dark'
              onClick={() => removeFromBasket(p.id)}
            >
              Remove from basket
            </Button>
          </div>
        )
      }
    </div>
  );
});

export default BasketProductList;