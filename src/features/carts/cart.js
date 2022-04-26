import React, { useState } from 'react';
//  import Link from 'next/link';
import { Button } from '../../Components/button/button';
import {
  CartPopupBody,
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
  ItemWrapper,
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
// import Coupon from 'features/coupon/coupon';

// type CartPropsType = {
//   style?: any;
//   className?: string;
//   scrollbarHeight?: string;
//   onCloseBtnClick?: (e: any) => void;
// };

const Cart = ({
  style,
  className,
  onCloseBtnClick,
  scrollbarHeight,
}) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice,
  } = useCart();
  const [hasCoupon, setCoupon] = useState(false);
  // const { isRtl } = useLocale();
  const deliveryChargeMSG = useAppState("deliveryChargeMSG");
  const mimimunAmount = useAppState("mimimunAmount");
  let subTotal = calculatePrice();
  return (
    <CartPopupBody className={className} style={style}>
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

      <Scrollbar className='cart-scrollbar'>
        <ItemWrapper className='items-wrapper'>
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
        </ItemWrapper>
      </Scrollbar>

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

          {/* {!coupon?.discountInPercent ? (
            <>
              {!hasCoupon ? (
                <button onClick={() => setCoupon((prev) => !prev)}>
                  <FormattedMessage
                    id='specialCode'
                    defaultMessage={deliveryChargeMSG}
                  />
                </button>
              ) : (
                <CouponBoxWrapper>
                  <Coupon
                    disabled={!items.length}
                    style={{
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.06)',
                    }}
                  />
                </CouponBoxWrapper>
              )}
            </>
          ) : (
            <CouponCode>
              <FormattedMessage
                id='couponApplied'
                defaultMessage='Coupon Applied'
              />
              <span>{coupon.code}</span>
            </CouponCode>
          )} */}
        </PromoCode>

        {cartItemsCount !== 0 ? (
          // <Link href='/checkout'>
            <CheckoutButton onClick={onCloseBtnClick}>
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
            <CheckoutButton>
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
    </CartPopupBody>
  );
};

export default Cart;
