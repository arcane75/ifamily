import React, { useEffect } from 'react';
// import Link from 'next/link';
// import Router from 'next/router';
import { Button } from '../../button/button';
import { IMAGE_URL } from "../../../common/baseUrl"

import {
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  ProductTitleBen,
  BackButton,
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
  RelatedItems,
} from './product-details-one.style';
import { LongArrowLeft } from '../../../assets/icons/LongArrowLeft';
import { CartIcon } from '../../../assets/icons/CartIcon';
import ReadMore from '../../truncate/truncate';
import CarouselWithCustomDots from '../../multi-carousel/multi-carousel';
import Products from '../../product-grid/product-list/product-list';
import { CURRENCY } from '../../../utils/constant';
import { useRefScroll } from '../../../utils/use-ref-scroll-mobile';
import { FormattedMessage } from 'react-intl';
import { useLocale } from '../../../contexts/language/language.provider';
import { useCart } from '../../../contexts/cart/use-cart';
import { Counter } from '../../counter/counter';
import StockOut from '../../../layouts/stockOut/StockOut';
import LogoImage from '../../../assets/images/Stock-Out-1.png';
import { useAppState, useAppDispatch } from "../../../contexts/app/app.provider";

// type ProductDetailsProps = {
//   product: any;
//   deviceType: {
//     mobile: boolean;
//     tablet: boolean;
//     desktop: boolean;
//   };
// };

const ProductDetails = ({
  product,
  relatedProductInfo,
  deviceType,
}) => {
  const mobile = useAppState("isMobile");
  const tablet = useAppState("isTablet");
  const desktop = useAppState("isDesktop");
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });

  const { isRtl } = useLocale();
  const { addItem, removeItem, isInCart, getItem } = useCart();
  const data = product[0];
  console.log(data.product_title_beng);
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  let URL1 = IMAGE_URL + data.type_id + '/' + data.product_pic1;
  let gallery = [];
  gallery.push({
    url: URL1
  });
  if (data.product_pic2 != '') {
    let URL2 = IMAGE_URL + data.type_id + '/' + data.product_pic2;
    gallery.push({
      url: URL2
    });
  }
  if (data.product_pic3 != '') {
    let URL3 = IMAGE_URL + data.type_id + '/' + data.product_pic3;
    gallery.push({
      url: URL3
    });
  }
  if (data.product_pic4 != '') {
    let URL4 = IMAGE_URL + data.type_id + '/' + data.product_pic4;
    gallery.push({
      url: URL4
    });
  }
  function onArrowLeftClick() {
    // Router.push('/');
    // if (onClick) {
    //   onClick();
    // }
  }
  return (
    <>
      <ProductDetailsWrapper className="product-card" dir="ltr">
        {!isRtl && (
          <ProductPreview>
            <BackButton>
              <Button
                type="button"
                size="small"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f1f1',
                  color: '#77798c',
                }}
                onClick={onArrowLeftClick}
              >
                <LongArrowLeft style={{ marginRight: 5 }} />
                <FormattedMessage id="backBtn" defaultMessage="Home" />
              </Button>
            </BackButton>

            <CarouselWithCustomDots
              items={gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}

        <ProductInfo dir={isRtl ? 'rtl' : 'ltr'}>
          <ProductTitlePriceWrapper>
            <ProductTitle>{data.product_title_eng}</ProductTitle>
          </ProductTitlePriceWrapper>
          <ProductTitlePriceWrapper>
            <ProductTitleBen>{data.product_title_beng}</ProductTitleBen>
          </ProductTitlePriceWrapper>
          <ProductWeight>{data.size}</ProductWeight>
          <ProductPriceWrapper>
            <ProductPrice>
              {CURRENCY}&nbsp;
                {data.sale_price}
            </ProductPrice>
            {data.max_retail_price > 0 ? (
              <SalePrice>
                {CURRENCY}&nbsp;
                {data.max_retail_price}
              </SalePrice>
            ) : null}
          </ProductPriceWrapper>
          <ProductCartWrapper>
            <ProductCartBtn>
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
                        <FormattedMessage
                          id="addCartButton"
                          defaultMessage="Cart"
                        />
                      </ButtonText>
                    </Button>
                  ) : (
                    <Counter
                      maxAllowed={data.max_allowed}
                      value={getItem(data.product_id).quantity}
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

          {/* <ProductMeta>
            <MetaSingle>
              {product?.categories?.map((item: any) => (
                <Link
                  href={`/${product.type.toLowerCase()}?category=${item.slug}`}
                  key={`link-${item.id}`}
                >
                  <a>
                    <MetaItem>{item.title}</MetaItem>
                  </a>
                </Link>
              ))}
            </MetaSingle>
          </ProductMeta> */}
          <ProductDescription>
            <ReadMore character={600}>{data.product_desc_eng}</ReadMore>
          </ProductDescription>
          <ProductDescription>
            <ReadMore character={600}>{data.product_desc_beng}</ReadMore>
          </ProductDescription>
        </ProductInfo>

        {isRtl && (
          <ProductPreview>
            {/* <BackButton>
              <Button
                title="Back"
                intlButtonId="backBtn"
                iconPosition="left"
                size="small"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f1f1',
                  color: '#77798c',
                }}
                icon={<LongArrowLeft />}
                onClick={Router.back}
              />
            </BackButton> */}

            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}
      </ProductDetailsWrapper>

      <RelatedItems>
        <h2>
          <FormattedMessage
            id="intlRelatedItems"
            defaultMessage="Related Items"
          />
        </h2>
        <Products
          productList={relatedProductInfo}
          deviceType={{ mobile, tablet, desktop }}
          fetchLimit={10}
        />
      </RelatedItems>

    </>
  );
};

export default ProductDetails;
