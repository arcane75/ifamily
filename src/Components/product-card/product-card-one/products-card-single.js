// product card for general
// import dynamic from 'next/dynamic';
import React from 'react';
import Image from '../image/image';
import { Button } from '../../button/button';
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  DiscountPercent,
  ButtonText,
} from '../product-card.style';
import { useCart } from '../../../contexts/cart/use-cart';
import { Counter } from '../../counter/counter';

import { cartAnimation } from '../../../utils/cart-animation';
import { FormattedMessage } from 'react-intl';
import { CartIcon } from '../../../assets/icons/CartIcon';
import { useModal } from '../../../contexts/modal/use-modal';
// import { useRouter } from 'next/router';
import QuickViewMobile from '../../../features/quick-view/quick-view-mobile';
import StockOut from '../../../layouts/stockOut/StockOut';
import LogoImage from '../../../assets/images/Stock-Out-1.png';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

const ProductCard = ({
  product_title_beng,
  product_title_eng,
  image,
  weight,
  price,
  // salePrice,
  // discountInPercent,
  // cartProducts,
  // addToCart,
  // updateCart,
  // value,
  currency,
  // onChange,
  // increment,
  // decrement,
  data,
  // deviceType,
  ...props
}) => {
  // console.log(data);
  // const router = useRouter();
  const [showModal, hideModal] = useModal(
    () => (
      <QuickViewMobile
        // modalProps={data}
        // hideModal={hideModal}
        // deviceType={deviceType}
      />
    ),
    {
      onClose: () => {
        // const { pathname, query, asPath } = router;
        // const as = asPath;
        // router.push(
        //   {
        //     pathname,
        //     query,
        //   },
        //   as,
        //   {
        //     shallow: true,
        //   }
        // );
      },
    }
  );
  const { addItem, removeItem, getItem, isInCart } = useCart();
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
    if (!isInCart(data.product_id)) {
      cartAnimation(e);
    }
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };
  const handleQuickViewModal = (e) => {
    e.stopPropagation();
    // const { pathname, query } = router;
    const as = `/product/${data.product_id}`;
    //const as = `/`;
    
    // if (pathname === '/product/[slug]') {
    //   // router.push(pathname, as);
    //   if (typeof window !== 'undefined') {
    //     window.scrollTo(0, 0);
    //   }
    //   return;
    // }
    showModal();
    // router.push(
    //   {
    //     pathname,
    //     query,
    //   },
    //   {
    //     pathname: as,
    //   },
    //   {
    //     shallow: true,
    //   }
    // );
  };
  // console.log(data);
  return (
   <>
    <ProductCardWrapper onClick={handleQuickViewModal} className="product-card">
      <ProductImageWrapper>
        <Image
          url={image}
          className="product-image"
          style={{ position: 'relative' }}
          alt={product_title_eng}
        />
        {/* {discountInPercent ? (
          <DiscountPercent>{discountInPercent}%</DiscountPercent>
        ) : null} */}
      </ProductImageWrapper>
      <ProductInfo>
        <h3 className="product-title-eng">{product_title_eng}</h3>
        <h3 className="product-title-beng">{product_title_beng}</h3>
        <span className="product-weight">{weight}</span>
        <div className="product-meta">
          <div className="productPriceWrapper">
            {data.max_retail_price > 0 ? (
              <span className="discountedPrice">
                {currency}
                {data.max_retail_price}
              </span>
            ) : null}

            <span className="product-price">
              {currency}
              {price}
            </span>
          </div>
          {data.is_available > 0 ? (
            <>
              {!isInCart(data.product_id) ? (
                <Button
                  className="cart-button"
                  variant="secondary"
                  borderRadius={100}
                  onClick={handleAddClick}
                >
                  <CartIcon mr={2} />
                  <ButtonText>
                    <FormattedMessage id="addCartButton" defaultMessage="Add" />
                  </ButtonText>
                </Button>
              ) : (
                  <Counter
                    maxAllowed={data.max_allowed}
                    value={getItem(data.product_id).quantity}
                    onDecrement={handleRemoveClick}
                    onIncrement={handleAddClick}
                    className="card-counter"
                  />
                )}
            </>
          ) : (
              <StockOut
                imageUrl={LogoImage}
                alt={'out Stock'}
              />
            )}

        </div>
      </ProductInfo>
    </ProductCardWrapper>


    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
   </>
  );
};

export default ProductCard;
