import React, { useState } from 'react';
//  import Link from 'next/link';
import { Button } from '../../Components/button/button';
import {
    CartMobileBody,
    PopupHeader,
    PopupItemCount,
    CloseButton,
    PromoCode,
    CheckoutButtonWrapper,
    CheckoutButton,
    Title,
    PriceBox,
    NoProductMsg,
    NoProductImg,
    ItemWrapperMobile,
    CouponBoxWrapper,
    CouponCode,
} from './cart.style';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { ShoppingBagLarge } from '../../assets/icons/ShoppingBagLarge';
import { NoCartBag } from '../../assets/icons/NoCartBag';
import { CURRENCY } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
// import { useLocale } from 'contexts/language/language.provider';
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import { Scrollbar } from '../../Components/scrollbar/scrollbar';
import { useCart } from '../../contexts/cart/use-cart';
import { CartItem } from '../../Components/cart-item/cart-item';
import { useNavigate } from "react-router-dom";


const CartMobile = ({
    style,
    className,
    onCloseBtnClick,
    scrollbarHeight,
}) => {
    const {
        items,
        addItem,
        removeItem,
        removeItemFromCart,
        cartItemsCount,
        calculatePrice,
    } = useCart();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleCheckout = (e) => {
        e.preventDefault();
        dispatch({ type: 'IS_CLICKED', payload: true });
        navigate(`/checkout`);
    }
    // const { isRtl } = useLocale();
    const deliveryChargeMSG = useAppState("deliveryChargeMSG");
    const mimimunAmount = useAppState("mimimunAmount");
    let subTotal = calculatePrice();
    return (
        <CartMobileBody className={className} style={style}>
            <PopupHeader>
                <PopupItemCount>
                    <ShoppingBagLarge width='19px' height='24px' />
                    <span>
                        {cartItemsCount}
                        &nbsp;
                        {cartItemsCount > 1 ? (
                            <FormattedMessage id='cartItems' defaultMessage='items' />
                        ) : (
                            <FormattedMessage id='cartItem' defaultMessage='item' />
                        )}
                    </span>
                </PopupItemCount>
                <Button
                    className="cart-button"
                    variant="secondary"
                    borderRadius={100}
                    onClick={onCloseBtnClick}
                >
                    <FormattedMessage id="addCartButton" defaultMessage="Close" />
                </Button>
            </PopupHeader>


            <ItemWrapperMobile className='items-wrapper'>
                {!!cartItemsCount ? (
                    items.map((item) => (
                        <CartItem
                            key={`cartItem-${item.product_id}`}
                            onIncrement={() => addItem(item)}
                            onDecrement={() => removeItem(item)}
                            onRemove={() => removeItemFromCart(item)}
                            data={item}
                        />
                    ))
                ) : (
                    <>
                        <NoProductImg>
                            <NoCartBag />
                        </NoProductImg>
                        <NoProductMsg>
                            <FormattedMessage
                                id='noProductFound'
                                defaultMessage='No products found'
                            />
                        </NoProductMsg>
                    </>
                )}
            </ItemWrapperMobile>

            <CheckoutButtonWrapper>
                <PromoCode>
                    {parseFloat(subTotal) < parseFloat(mimimunAmount) ? (
                        <font color='red'>
                            <FormattedMessage
                                id='specialCode'
                                defaultMessage={deliveryChargeMSG}
                            />
                        </font>
                    ) : (null)}

                </PromoCode>

                {cartItemsCount !== 0 ? (
                    // <Link href='/checkout'>
                    <CheckoutButton onClick={handleCheckout}>
                        <>
                            <Title>
                                <FormattedMessage
                                    id='nav.checkout'
                                    defaultMessage='Checkout'
                                />
                            </Title>
                            <PriceBox>
                                {CURRENCY}
                                {calculatePrice()}
                            </PriceBox>
                        </>
                    </CheckoutButton>
                    // </Link>
                ) : (
                    <CheckoutButton onClick={handleCheckout}>
                        <>
                            <Title>
                                <FormattedMessage id='nav.checkout' defaultMessage='Checkout' />
                            </Title>
                            <PriceBox>
                                {CURRENCY}
                                {calculatePrice()}
                            </PriceBox>
                        </>
                    </CheckoutButton>
                )}
            </CheckoutButtonWrapper>
        </CartMobileBody>
    );
};

export default CartMobile;
