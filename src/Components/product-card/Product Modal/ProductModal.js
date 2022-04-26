import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
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
} from './productModal.style.js';
import { IMAGE_URL } from "../../../common/baseUrl.js";
import CarouselWithCustomDots from '../../../Components/multi-carousel/multi-carousel'
import { CartIcon } from '../../../assets/icons/CartIcon';
import { CURRENCY } from '../../../utils/constant';

import ReadMore from '../../../Components/truncate/truncate';

import { Counter } from '../../../Components/counter/counter';
import { FormattedMessage } from 'react-intl';
import LogoImage from '../../../assets/images/Stock-Out-1.png';
import { useCart } from '../../../contexts/cart/use-cart.js';
import { Button } from '../../button/button.js';
import StockOut from '../../../layouts/stockOut/StockOut.js';

const ProductModal = ({ open, handleOpen, handleClose, index, data }) => {

    let URL1 = IMAGE_URL + data.type_id + '/' + data.product_pic1;
    let gallery = [];
    console.log('gallery', gallery)
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


    // console.log('modal data: ', data);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // bgcolor: 'background.paper',
        boxShadow: 24,
        // p: 4,
        overflowY: { sm: 'scroll', md: 'hidden' },
        overflowX: 'hidden',
        width: { xs: '80%', lg: '70%', xl: '50%', },
        height: { xs: '80%', md: '90%', xl: 'auto' },
        zIndex: '+9'
    };
    const { addItem, removeItem, isInCart, getItem } = useCart();
    const handleAddClick = (e) => {
        e.stopPropagation();
        addItem(data);
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        removeItem(data);
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <QuickViewWrapper className='quick-view-mobile-wrapper'>
                        <ProductDetailsWrapper className='product-card' dir='ltr'>
                            <ProductPreview>
                                <CarouselWithCustomDots items={gallery} />
                                {/* {!!discountInPercent && (
                <DiscountPercent>{discountInPercent}%</DiscountPercent>
              )} */}
                            </ProductPreview>
                            <ProductInfoWrapper >
                                <ProductInfo>
                                    <ProductTitlePriceWrapper>
                                        <ProductTitle>{data.product_title_eng}</ProductTitle>
                                    </ProductTitlePriceWrapper>
                                    <ProductTitlePriceWrapper>
                                        <ProductTitleBen>{data.product_title_beng}</ProductTitleBen>
                                    </ProductTitlePriceWrapper>
                                    <ProductWeight>{data.size}</ProductWeight>
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
                                                {data.sale_price}
                                            </ProductPrice>
                                            {data.max_retail_price > 0 ? (
                                                <SalePrice>
                                                    {CURRENCY}
                                                    {data.max_retail_price}
                                                </SalePrice>
                                            ) : null}
                                        </ProductPriceWrapper>

                                        <ProductCartBtn>
                                            {data.is_available > 0 ? (
                                                <>
                                                    {!isInCart(data.product_id) ? (
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

                                    <ProductDescription>
                                        <ReadMore character={600}>{data.product_desc_eng}</ReadMore>
                                    </ProductDescription>
                                    <ProductDescription>
                                        <ReadMore character={600}>{data.product_desc_beng}</ReadMore>
                                    </ProductDescription>
                                </ProductInfo>
                            </ProductInfoWrapper>


                            {/* <ProductPreview>
                                <CarouselWithCustomDots items={gallery} />
                                {!!discountInPercent && (
                <DiscountPercent>{discountInPercent}%</DiscountPercent>
              )}
                            </ProductPreview> */}

                        </ProductDetailsWrapper>
                    </QuickViewWrapper>
                </Box>
            </Modal>
        </div>
    );
};

export default ProductModal;