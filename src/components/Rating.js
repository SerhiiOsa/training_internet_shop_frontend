import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import emptyStar from '../assets/star.svg';
import filledStar from '../assets/filled_star.svg';
import { Context } from '..';
import { createRate } from '../http/itemApi';

const Rating = ({ rating, productId, size = 1}) => {
  const {user, updatingProduct} = useContext(Context);
  const starSize = size * 20;
  const starCount = 5;
  const filledStarsCount = Math.floor(rating);
  const partialStarPercentage = (rating % 1) * 100;

  const handleClick = (e, rate) => {
    e.stopPropagation();
    if(!user.isAuth) {
      alert('Only authorized users can rate products!');
      return;
    }
    createRate({rate, productId, userId: user.user.id}).then(data => {
      updatingProduct.updateCount();
    });
  }

  return (
    <div className='mt-3'>
      <div className='d-flex align-items-center' style={{ position: 'relative', width: starSize * starCount }}>
        <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', zIndex: 2, pointerEvents: 'none'}}>
          {[...Array(filledStarsCount)].map((_, i) => (
            <Image key={i} src={filledStar} width={starSize} />
          ))}
          {partialStarPercentage > 0 && (
            <Image
              src={filledStar}
              width={starSize}
              style={{
                clipPath: `inset(0 ${100 - partialStarPercentage}% 0 0)`
              }}
            />
          )}
        </div>

        <div style={{ display: 'flex', zIndex: 1, cursor: 'pointer'}}>
          {[...Array(starCount)].map((_, i) => (
            <Image key={i} src={emptyStar} width={starSize} onClick={e => handleClick(e, i + 1)}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating;
