import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { Card, Row } from 'react-bootstrap';
import { fetchProducts } from '../http/itemApi';

const BrandBar = observer(() => {
  const { brand, type, product, typeBrand } = useContext(Context);

  const handleSelect = (selectedBrand) => {
    brand.setSelectedBrand(selectedBrand);
    brand.setSelectedBrandHistory(selectedBrand);
    fetchProducts(
      type.selectedType.name === 'Всі' ? '' : type.selectedType.id, 
      selectedBrand.name === 'Всі' ? '' : selectedBrand.id
    )
    .then(data => product.setProducts(data.rows))
  } 

  return (
    <Row>
      {

        typeBrand.selectedTypeBrands.map(b => 
          <Card
            border={b.id === brand.selectedBrand.id ? 'danger' : 'light'}
            onClick={() => handleSelect(b)}
            key={b.id}
            className="p-3"
            style={{cursor: 'pointer', width: '10rem'}}
          >
            {b.name}
          </Card>
        )
      }
    </Row>
  );
});

export default BrandBar;