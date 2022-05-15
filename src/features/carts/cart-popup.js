import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { openModal, closeModal } from '@redq/reuse-modal';
import Cart from './cart';
import CartPopupButton, {
  BoxedCartButton,
} from '../../Components/cart-popup/cart-popup-button';
import { CURRENCY } from '../../utils/constant';
import { CartSlidePopup } from './cart.style';
import { FormattedMessage } from 'react-intl';
import { useCart } from '../../contexts/cart/use-cart';
import { useAppDispatch, useAppState } from "../../contexts/app/app.provider";
import CartMobile from './cartMobile';
import { useNavigate } from 'react-router-dom';

const CartPopupStyle = createGlobalStyle`
  .cartPopup{
    top: auto !important;
    left: auto !important;
    bottom: 50px !important;
    right: 50px !important;
    box-shadow: ${themeGet('shadows.big', '0 21px 36px rgba(0, 0, 0, 0.16)')};
    transform-origin: bottom right;

    @media (max-width: 580px) {
      max-width: none!important;
      width: 100% !important;
      bottom: 0 !important;
      left: 0!important;
      background: ${themeGet('colors.white', '#ffffff')};
      overflow: initial !important;
      transform-origin: bottom center;
    }
  }
`;


const CartPopUp = () => {
  const mobile = useAppState("isMobile");
  console.log('mobile', mobile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, cartItemsCount, toggleCart, calculatePrice } = useCart();
  const handleModal = () => {
    openModal({
      show: true,
      config: {
        className: 'cartPopup',
        width: 'auto',
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        transition: {
          tension: 360,
          friction: 40,
        },
      },
      closeOnClickOutside: true,
      component: Cart,
      closeComponent: () => <div />,
      componentProps: { onCloseBtnClick: closeModal, scrollbarHeight: 330 },
    });
  };

  const handleCartMobile = () => {
    dispatch({ type: 'IS_CLICKED', payload: true });
    navigate('/cartmobile')
    console.log('handleCartMobile')
  }


  let cartSliderClass = isOpen === true ? 'cartPopupFixed' : '';

  return (
    <>
      {mobile ? (
        <>
          <CartPopupStyle />
          <CartPopupButton
            className='product-cart'
            itemCount={cartItemsCount}
            itemPostfix={
              cartItemsCount > 1 ? (
                <FormattedMessage id='cartItems' defaultMessage='items' />
              ) : (
                <FormattedMessage id='cartItem' defaultMessage='item' />
              )
            }
            price={calculatePrice()}
            pricePrefix={CURRENCY}
            onClick={handleCartMobile}
               
          />
        </>
      ) : (
        <>
          <CartSlidePopup
            className={cartSliderClass}
          >
            {isOpen && (
              <Cart onCloseBtnClick={toggleCart} scrollbarHeight='100vh' />
            )}
          </CartSlidePopup>

          <BoxedCartButton
            className='product-cart'
            itemCount={cartItemsCount}
            itemPostfix={
              cartItemsCount > 1 ? (
                <FormattedMessage id='cartItems' defaultMessage='items' />
              ) : (
                <FormattedMessage id='cartItem' defaultMessage='item' />
              )
            }
            price={calculatePrice()}
            pricePrefix={CURRENCY}
            onClick={toggleCart}
          />
        </>
      )}
    </>
  );
};

export default CartPopUp;
