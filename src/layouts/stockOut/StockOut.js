import React from 'react';
import { LogoBox, LogoImage } from './StockOut.style';


const StockOut = ({ imageUrl, alt }) => {
  return (
    <LogoBox >
      <LogoImage src={imageUrl} alt={alt} />
    </LogoBox>
  );
};

export default StockOut;
