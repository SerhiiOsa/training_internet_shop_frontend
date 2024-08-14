import React, { useContext } from 'react';
import { Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../utils/consts';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import Rating from './Rating';

const ProductItem = observer(({ product }) => {
  const { type, brand } = useContext(Context);
  const navigate = useNavigate();

  const productType = type.types ? type.types.find(t => t.id === product.typeId) : null;
  const productBrand = brand.brands ? brand.brands.find(b => b.id === product.brandId) : null;

  return (
    <Card
      style={{ width: 180, cursor: "pointer" }}
      border={"light"}
      className='m-3'
      onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}
    >
      <Image src={process.env.REACT_APP_API_URL + product.img} width={150} height={150} />
      <Rating rating={product.rating} productId={product.id} size={1.2}/>
      <div>{productType ? productType.name : 'Unknown Type'}</div>
      <div>{productBrand ? productBrand.name : 'Unknown Brand'}</div>
      <div>{product.name}</div>
    </Card>
  );
});

export default ProductItem;
