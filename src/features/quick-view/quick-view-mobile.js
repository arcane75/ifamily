import React from 'react';
// import Router from 'next/router';
import { IMAGE_URL } from "../../common/baseUrl"
import { Button } from '../../Components/button/button';
import StockOut from '../../layouts/stockOut/StockOut';
import {
  QuickViewWrapper,
  ProductDetailsWrapper,
  ProductPreview,
  DiscountPercent,
  ProductInfoWrapper,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  ProductTitleBen,
  ProductWeight,
  ProductDescription,
  ButtonText,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  MetaSingle,
  MetaItem,
  ModalClose,
} from './quick-view.style';
import { CartIcon } from '../../assets/icons/CartIcon';
import { CURRENCY } from '../../utils/constant';

import ReadMore from '../../Components/truncate/truncate';
import CarouselWithCustomDots from '../../Components/multi-carousel/multi-carousel';
import { useLocale } from '../../contexts/language/language.provider';
import { useCart } from '../../contexts/cart/use-cart';
import { Counter } from '../../Components/counter/counter';
import { FormattedMessage } from 'react-intl';
import LogoImage from '../../assets/images/Stock-Out-1.png';

const QuickViewMobile = ({
  modalProps,
  onModalClose,
  hideModal,
  deviceType,
}) => {
  const { addItem, removeItem, isInCart, getItem } = useCart();
  const {
    product_id,
    type_id,
    product_title_beng,
    product_title_eng,
    size,
    sale_price,
    discountInPercent,
    salePrice,
    product_desc_eng,
    product_desc_beng,
    // gallery,
    is_available,
    max_retail_price,
    max_allowed,
    product_pic1,
    product_pic2,
    product_pic3,
    product_pic4,

  } = modalProps;

  let URL1 = IMAGE_URL + type_id + '/' + product_pic1;
  let gallery = [];
  gallery.push({
    url: URL1
  });
  if (product_pic2 != '') {
    let URL2 = IMAGE_URL + type_id + '/' + product_pic2;
    gallery.push({
      url: URL2
    });
  }
  if (product_pic3 != '') {
    let URL3 = IMAGE_URL + type_id + '/' + product_pic3;
    gallery.push({
      url: URL3
    });
  }
  if (product_pic4 != '') {
    let URL4 = IMAGE_URL + type_id + '/' + product_pic4;
    gallery.push({
      url: URL4
    });
  }

  const { isRtl } = useLocale();
  
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(modalProps);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(modalProps);
  };
  // function onCategoryClick(slug) {
  //   Router.push({
  //     pathname: `/${type.toLowerCase()}`,
  //     query: { category: slug },
  //   }).then(() => window.scrollTo(0, 0));
  //   hideModal();
  // }

  return (
    <>
      <QuickViewWrapper className='quick-view-mobile-wrapper'>
        <ProductDetailsWrapper className='product-card' dir='ltr'>
          {!isRtl && (
            <ProductPreview>
              <CarouselWithCustomDots items={gallery} deviceType={deviceType} />
              {!!discountInPercent && (
                <DiscountPercent>{discountInPercent}%</DiscountPercent>
              )}
            </ProductPreview>
          )}
          <ProductInfoWrapper dir={isRtl ? 'rtl' : 'ltr'}>
            <ProductInfo>
              <ProductTitlePriceWrapper>
                <ProductTitle>{product_title_eng}</ProductTitle>
              </ProductTitlePriceWrapper>
              <ProductTitlePriceWrapper>
                <ProductTitleBen>{product_title_beng}</ProductTitleBen>
              </ProductTitlePriceWrapper>
              <ProductWeight>{size}</ProductWeight>
              <ProductMeta>
                {/* <MetaSingle>
                  {categories
                    ? categories.map((item) => (
                        <MetaItem
                          onClick={() => onCategoryClick(item.slug)}
                          key={item.id}
                        >
                          {item.title}
                        </MetaItem>
                      ))
                    : ''}
                </MetaSingle> */}
              </ProductMeta>

              <ProductCartWrapper>
                <ProductPriceWrapper>
                  <ProductPrice>
                    {CURRENCY}
                    {sale_price}
                  </ProductPrice>
                  {max_retail_price > 0 ? (
                    <SalePrice>
                      {CURRENCY}
                      {max_retail_price}
                    </SalePrice>
                  ) : null}
                </ProductPriceWrapper>

                <ProductCartBtn>
                  {is_available > 0 ? (
                    <>
                      {!isInCart(product_id) ? (
                        <Button
                          className='cart-button'
                          variant='secondary'
                          borderRadius={100}
                          onClick={handleAddClick}
                        >
                          <CartIcon mr={2} />
                          <ButtonText>
                            <FormattedMessage
                              id='addCartButton'
                              defaultMessage='Add'
                            />
                          </ButtonText>
                        </Button>
                      ) : (
                        <Counter
                          maxAllowed={max_allowed}
                          value={getItem(product_id).quantity}
                          onDecrement={handleRemoveClick}
                          onIncrement={handleAddClick}
                        />
                      )}
                    </>
                  ) : (
                    <StockOut
                      imageUrl={LogoImage}
                      alt={'out Stock'}
                    />
                  )}
                </ProductCartBtn>
              </ProductCartWrapper>

              <ProductDescription>
                <ReadMore character={600}>{product_desc_eng}</ReadMore>
              </ProductDescription>
              <ProductDescription>
                <ReadMore character={600}>{product_desc_beng}</ReadMore>
              </ProductDescription>
            </ProductInfo>
          </ProductInfoWrapper>

          {isRtl && (
            <ProductPreview>
              <CarouselWithCustomDots items={gallery} deviceType={deviceType} />
              {!!discountInPercent && (
                <DiscountPercent>{discountInPercent}%</DiscountPercent>
              )}
            </ProductPreview>
          )}
        </ProductDetailsWrapper>
      </QuickViewWrapper>
    </>
  );
};

export default QuickViewMobile;