import React from 'react';
// import dynamic from 'next/dynamic';
import { IMAGE_URL } from "../../../common/baseUrl"
import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from './product-list.style';
import { CURRENCY } from '../../../utils/constant';
import Fade from 'react-reveal/Fade';
import GeneralCard from '../../product-card/product-card-one/product-card-one';
import { Grid } from '@mui/material';
// const GeneralCard = dynamic(
//   import('../../product-card/product-card-one/product-card-one')
// );

export const Products = ({
  deviceType,
  fetchLimit = 20,
  loadMore = true,
  type,
  productList,
  ...props
}) => {
  // const handleLoadMore = () => {
  //   fetchMore({
  //     variables: {
  //       offset: Number(data.products.items.length),
  //       limit: fetchLimit,
  //     },
  //   });
  // };

  const renderCard = (product) => {
    // console.log('product id', product);
    return (
      <GeneralCard
        product_title_eng={product.product_title_eng}
        product_title_beng={product.product_title_beng}
        product_id={product.product_id}
        // description={product.description}
        image={IMAGE_URL + product?.type_id + '/' + product?.web_pic1}
        weight={product.size}
        currency={CURRENCY}
        price={product.sale_price}
        // salePrice={product.salePrice}
        // discountInPercent={product.discountInPercent}
        data={product}
      // deviceType={deviceType}

      />
    )
  };
  return (
    <>
      {/* <ProductsRow>
        {productList.map((product, index) => (
          <ProductsCol
            key={product.product_id}
          >
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: '100%' }}
              >
                {renderCard(product)}
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
      </ProductsRow> */}

      <Grid container spacing={2}>
        {productList.map((product, index) => (
          <Grid item xs={6} md={3} lg={3}
            key={product?.product_id}
            
          >
            <Fade
              duration={800}
              delay={index * 10}
              style={{ height: '100%' }}
            >
              {renderCard(product)}
            </Fade>

          </Grid>
        ))}

      </Grid>
    </>
  );
};
export default Products;
