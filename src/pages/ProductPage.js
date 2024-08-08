import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProduct, fetchOneProduct } from '../http/itemApi';
import UpdateProduct from '../components/modals/UpdateProduct';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { SHOP_ROUTE } from '../utils/consts';
import Rating from '../components/Rating';
import { addToBasket } from '../http/basketApi';

const ProductPage = observer(() => {
  const navigate = useNavigate();
  const { user, updatingProduct } = useContext(Context);
  const [product, setProduct] = useState({info: []});
  const [productUpdateVisible, setProductUpdateVisible] = useState(false);
  const {id} = useParams();
  const [ratingColor, setRatingColor] = useState('white');

  const { type, brand, basket } = useContext(Context);

  const productType = type.types ? type.types.find(t => t.id === product.typeId) : null;
  const productBrand = brand.brands ? brand.brands.find(b => b.id === product.brandId) : null;

  useEffect(() => {
    fetchOneProduct(id).then(data => {
      setProduct(data);
      });
  }, [updatingProduct.count]);

  useEffect(() => {
      setRatingColor('green');
      if (product.rating < 4) setRatingColor('black');
      if (product.rating < 3) setRatingColor('red');
  }, [product.rating]);

  const removeProduct = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(product.id,).then(() => {
        type.setSelectedType(type.types[0]);
        brand.setSelectedBrand(brand.brands[0]);
        navigate(SHOP_ROUTE);
      });
    }
  }

  const handleAddToBasketClick = () => {
    addToBasket({productId: product.id}).then(() => {
      basket.addProduct(product);
    })
  }
  
  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + product.img}/>
        </Col>
        <Col md={4}>
          <Row className='d-flex flex-column align-items-center'>
            <h3 style={{color: 'gray'}}>{productType ? productType.name.slice(0, -1) : 'Unknown Type'}</h3>
            <h3>{productBrand ? productBrand.name : 'Unknown Brand'} {product.name}
              </h3>
            {
              product.rating 
              &&
              <div className='d-flex align-items-center'>
                <Rating rating={product.rating} productId={product.id} size={2}/>
                <div className='mt-3' style={{marginLeft: 10, fontSize: 40, color: ratingColor}}>{product.rating}</div>
              </div>
            }
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className='d-flex flex-column justify-content-around align-items-center'
            style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
          >
            <h3>From: {product.price} UAH</h3>
            {
              user.isAuth
              &&
              <Button variant='outline-dark' onClick={handleAddToBasketClick}>Add to basket</Button>
            }
          </Card>
          {
            user.user.role === 'ADMIN'
            &&
            <div>
              <Button
                variant='outline-warning'
                className='p-2 m-4'
                onClick={() => setProductUpdateVisible(true)}
              >
                Edit product
              </Button>
              <Button
                variant='outline-danger'
                className='p-2 m-4'
                onClick={removeProduct}
              >
                Delete product
              </Button>
            </div>
          }
        </Col>
        
      </Row>
      <Row className='d-flex flex-column m-3'>
        <h1>Сharacteristics</h1>
        {product.info.map((info, index) => 
          <Row key={info.id}  style={{background: index % 2 === 0 && 'lightgray', padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        )}
      </Row>
      {
        user.user.role === 'ADMIN'
        &&
        <UpdateProduct show={productUpdateVisible} onHide={() => setProductUpdateVisible(false)} product={product} />
      }
    </Container>
  );
});

export default ProductPage;