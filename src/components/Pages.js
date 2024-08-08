import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '..';

const Pages = observer(() => {
  const { product } = useContext(Context);
  const pageCount = Math.ceil(product.totalCount / product.limit);
  const pages = [];

  for(let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <Pagination
      className='mt-5'
    >
      {
        pages.map(page=> 
          <Pagination.Item
            variant='dark'
            key={page}
            active={page === product.page}
            onClick={() => product.setPage(page)}
          >
            {page}
          </Pagination.Item>
        )
      }
    </Pagination>
  );
});

export default Pages;