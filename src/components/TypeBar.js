import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { ListGroup } from 'react-bootstrap';
import { fetchProducts } from '../http/itemApi';

const TypeBar = observer(() => {
  const { type, brand, product, typeBrand } = useContext(Context);

  const handleSelect = (selectedType) => {
    type.setSelectedType(selectedType);
    type.setSelectedTypeHistory(selectedType);
    fetchProducts(
      selectedType.name === 'Всі' ? '' : selectedType.id, 
      brand.selectedBrand.name === 'Всі' ? '' : brand.selectedBrand.id
    )
    .then(data => {
      if(selectedType.name === 'Всі') {
        typeBrand.setSelectedTypeBrands(brand.brands);
      } else {
        typeBrand.setSelectedTypeBrands(filterBrandsByType(selectedType.id, brand.brands, typeBrand.typeBrands));
      }
      product.setProducts(data.rows);
    })
  }
  
  const  filterBrandsByType = (typeId, brands, typeBrands) => {
    const brandIdMap = {};
    typeBrands.forEach(typeBrand => {
      if (typeBrand.typeId === typeId) {
        brandIdMap[typeBrand.brandId] = true;
      }
    });
  
    let filteredBrands = brands.filter(brand => brandIdMap[brand.id]);
    filteredBrands.unshift(brand.brands[0])
  
    return filteredBrands;
  }

  return (
    <ListGroup>
      {
        type.types.map(t => 
          <ListGroup.Item
            variant='dark'
            active={t.id === type.selectedType.id}
            onClick={() => handleSelect(t)}
            key={t.id}
            style={{cursor: "pointer"}}
          >
            {t.name}
          </ListGroup.Item>
        )
      }
    </ListGroup>
  );
});

export default TypeBar;