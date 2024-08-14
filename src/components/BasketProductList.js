import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { Button } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { fetchBasket, updateQuantity } from '../http/basketApi';
import { handleRemoveFromBasketClick } from '../utils/helpers';

const BasketProductList = observer(() => {
  const { basket } = useContext(Context);

  useEffect(() => {
    fetchBasket().then(data => {
      basket.setProducts(data);
    })
  }, []);

  const editQuantity = (productId, quantity) => {
    if(quantity < 1) {
      return;
    }
    updateQuantity({productId, quantity}).then(data => {
      basket.updateProductQuantity(productId, quantity);
    });
  };

  return (
    <div className='d-flex'>
      {
        basket.products.map((p, index) => 
          <div className='d-flex flex-column justify-content-between m-2'>
            <ProductItem 
              product={p}
              key={p.id}
            ></ProductItem>
            <div className='d-flex justify-content-center'>
              <Button 
                className='me-2' 
                variant='outline-dark'
                disabled={p.quantity <= 1}
                onClick={() => editQuantity(p.id, p.quantity - 1)}
              >
                -
              </Button>
              <input 
                style={{width: 50}} 
                type="number"
                value={p.quantity}
                onChange={e => editQuantity(p.id, parseInt(e.target.value))}
                min={1}
              />
              <Button 
                className='ms-2' 
                variant='outline-dark'
                onClick={() => editQuantity(p.id, p.quantity + 1)}
              >
                +
              </Button>
            </div>
            <Button
            className='mt-2'
              variant='outline-dark'
              onClick={() => handleRemoveFromBasketClick(p.id, basket)}
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