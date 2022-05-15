// product card for general
// import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import css from '@styled-system/css';
import React, { useState } from 'react';
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
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../Product Modal/ProductModal';


const ProductCard = ({
  product_title_beng,
  product_title_eng,
  image,
  weight,
  price,
  product_id,
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
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const navigate = useNavigate();

  const [showModal, hideModal] = useModal(
    () => (
      <QuickViewMobile
        modalProps={data}
        hideModal={hideModal}
      // deviceType={deviceType}
      />
    ),
    {
      onClose: () => {
        const { pathname, query, asPath } = navigate;
        const as = asPath;
        navigate(
          {
            pathname,
            query,
          },
          as,
          {
            shallow: true,
          }
        );
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
    console.log('clicked modal', data.product_id)
    // const { pathname, query } = navigate;
    // const as = `/product/${data.product_id}`;
    // // const as = `/`;

    // if (pathname === '/product') {
    //   // router.push(pathname, as);
    //   if (typeof window !== 'undefined') {
    //     window.scrollTo(0, 0);
    //   }
    //   return;
    // }
    showModal();
    // navigate(
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
  const textStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '15px '
  }

  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  // open modal
  const handleOpenModal = (product_id, data) => {
    setOpen(true);
    // setProduct(data);
    // setIndex(product_id);
    console.log('clicked modal', product_id)
  };
  // close modal
  const handleClose = () => setOpen(false);

  return (
    <>
      <ProductCardWrapper onClick={() => handleOpenModal()} className="product-card">
        <ProductImageWrapper>
          <Image
            url={image}
            className="product-image"
            style={{ position: 'relative' }}
            alt={product_title_eng}
          />

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

      {/* <ProductCardWrapper className="product-card">
        <Card onClick={() => handleOpenModal()} sx={{ maxWidth: 345, height: 'auto' }}>
        
          <ProductImageWrapper>
            <Image
              url={image}
              className="product-image"
              style={{ position: 'relative' }}
              alt={product_title_eng}
            />

          </ProductImageWrapper>

          <CardContent>
            <Typography style={textStyle} gutterBottom variant="h6" component="div">
              {product_title_eng}
            </Typography>
            <Typography style={textStyle} gutterBottom variant="h6" component="div">
              {product_title_beng}
            </Typography>
            <span style={textStyle}>{weight}</span>
          </CardContent>
          <CardActions>
            <Grid container spacing={2}>
              <Grid item md={6} sx={{ display: 'flex', flexDirection: 'column', }} >
                {data.max_retail_price > 0 ? (
                  <span style={{ textDecoration: 'line-through' }}>
                    {currency}
                    {data.max_retail_price}
                  </span>
                ) : null}
                <span className="product-price">
                  {currency}
                  {price}
                </span>
              </Grid>
              <Grid item md={6}>
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
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </ProductCardWrapper> */}


      {/* Modal */}
      <ProductModal
        open={open}
        index={product_id}
        handleClose={handleClose}
        handleOpen={handleOpenModal}
        data={data}
      />
    </>
  );
};

export default ProductCard;
