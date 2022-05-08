import React, { useContext, useState, useEffect } from 'react';
// import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import MaskedInput from 'react-text-mask';
// import Link from 'next/link';
import { SEND_OTP_URL, REGISTER_CUSTOMER_URL, PLACE_ORDER_URL, API_KEY } from '../../../common/baseUrl';
import { FieldWrapper, Heading } from '../../../Components/address-card/address-card.style';
import TextField from '../../../Components/forms/text-field';
import { Button } from '../../../Components/button/button';
import { CURRENCY } from '../../../utils/constant';
import { Scrollbar } from '../../../Components/scrollbar/scrollbar';
import Payment from '../../../features/payment/payment';
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  CheckoutSubmit,
  HaveCoupon,
  CouponBoxWrapper,
  CouponInputBox,
  CouponCode,
  RemoveCoupon,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text,
  Bold,
  Small,
  NoProductMsg,
  NoProductImg,
} from './checkout-two.style.js';

import { NoCartBag } from '../../../assets/icons/NoCartBag';

import Sticky from 'react-stickynode';
import { ProfileContext } from '../../../contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import { useCart } from '../../../contexts/cart/use-cart';
// import { useLocale } from 'contexts/language/language.provider';
// import { useWindowSize } from '../../utils/useWindowSize';
// import Coupon from 'features/coupon/coupon';
import Address from '../../../features/address/address';
// import Schedules from 'features/schedule/schedule';
// import { isLogin } from "../../../store/actions/webDataInfo";
import { useAppState, useAppDispatch } from "../../../contexts/app/app.provider";
import { useNavigate } from 'react-router-dom';

const OrderItem = ({ product }) => {
  const { id, quantity, product_title_eng, name, unit, sale_price, salePrice } = product;
  const displayPrice = salePrice ? salePrice : sale_price;
  return (
    <Items key={id}>
      <Quantity>{quantity}</Quantity>
      <Multiplier>x</Multiplier>
      <ItemInfo>
        {name ? name : product_title_eng} {unit ? `| ${unit}` : ''}
      </ItemInfo>
      <Price>
        {CURRENCY}
        {(displayPrice * quantity).toFixed(2)}
      </Price>
    </Items>
  );
};

const StyledInput = styled.input`
  width: 100%;
  height: 54px;
  border-radius: ${themeGet('radii.base', '6px')};
  font-family: ${themeGet('fonts.body', 'Lato, sans-serif')};
  border: 1px solid ${themeGet('colors.gray.700', '#e6e6e6')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  font-size: 16px;
  line-height: 19px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  padding: 0 18px;
  box-sizing: border-box;
  transition: border-color 0.25s ease;

  &:hover,
  &:focus {
    outline: 0;
  }

  &:focus {
    border-color: ${themeGet('colors.primary.regular', '#009e7f')};
  }

  &::placeholder {
    color: ${themeGet('colors.text.regular', '#77798C')};
  }
`;

const CheckoutWithSidebar = ({ token, deviceType }) => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const { state } = useContext(ProfileContext);
  const navigate = useNavigate();
  // const { isRtl } = useLocale();
  const {
    items,
    removeCoupon,
    coupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
    isRestaurant,
    toggleRestaurant,
  } = useCart();
  const dispatch = useAppDispatch();
  const Login = useAppState("isLogin");

  const deliveryChargeMax = useAppState("deliveryChargeMax");
  const deliveryChargeMin = useAppState("deliveryChargeMin");
  const mimimunAmount = useAppState("mimimunAmount");

  const [mobileNo, setMobileNo] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [alternativeMobileNo, setAlternativeMobileNo] = useState('');
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const [clickOnLogin, setClickOnLogin] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [tempOTP, setTempOTP] = useState('');
  const [isCustInfoChange, setCustInfoChange] = useState('0');

  // const size = useWindowSize();

  const isClickSearchButton = useAppState("isClickOnSearch");

  if (isClickSearchButton) {
    dispatch({
      type: "TOGGLE_SEARCH"
    });
  }

  useEffect(() => {
    setSubTotal(calculateSubTotalPrice());

    let CustInfo = JSON.parse(localStorage.getItem('user'));
    if (CustInfo !== null) {
      setName(CustInfo.name);
      setAddress(CustInfo.address);
      setMobileNo(CustInfo.mobile);
      setAlternativeMobileNo(CustInfo.altContact);
      setClickOnLogin(true);
      dispatch({ type: 'IS_LOGIN', payload: true });
    }
    dispatch({
      type: "TOGGLE_CHECKOUT"
    });
  }, []);

  let sub_Total = calculateSubTotalPrice();
  let deliveryCharge = 0;

  if (parseFloat(sub_Total) < parseFloat(mimimunAmount)) {
    deliveryCharge = deliveryChargeMax;
  } else {
    deliveryCharge = deliveryChargeMin;
  }

  const changeInput = (e) => {
    if (e.target.id === "mobileNo") {
      setMobileNo(e.target.value);
    }
    if (e.target.id === "name") {
      setName(e.target.value);
      setCustInfoChange('1');
    }
    if (e.target.id === "addr") {
      setAddress(e.target.value);
      setCustInfoChange('1');
    }
    if (e.target.id === "altMobileNo") {
      setAlternativeMobileNo(e.target.value);
      setCustInfoChange('1');
    }
    if (e.target.id === "otp") {
      setOTP(e.target.value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let RandomNumber = Math.floor(Math.random() * 8999 + 1000);
    setTempOTP(RandomNumber);

    const url = SEND_OTP_URL + mobileNo + '/' + RandomNumber + '/' + API_KEY;

    checkInternetConnection(url);

  };

  const checkInternetConnection = (url) => {
    const isConnectionAvailable = window.navigator.onLine;
    send_sms(url, isConnectionAvailable);
  }

  const send_sms = (url, isConnectionAvailable) => {

    if (isConnectionAvailable) {
      setClickOnLogin(true);
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          setName(responseJson.cust_name);
          setAddress(responseJson.address);
          setAlternativeMobileNo(responseJson.alternative_contact);
        })
        .catch((error) => {
          alert("Hold on! Somethig went worng Try again later", [
            {
              text: "OK",
              onPress: () => null,
              style: "OK"
            },
          ]);
        });
    } else {
      alert("Hold on! Internet Connection Lost", [
        {
          text: "OK",
          onPress: () => null,
          style: "OK"
        },
      ]);
    }
  }

  const handleSubmit = () => {
    const isConnectionAvailable = window.navigator.onLine;
    if (otp == tempOTP) {
      if (isConnectionAvailable) {
        fetch(REGISTER_CUSTOMER_URL,
          {
            method: 'POST',
            headers:
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                name: name,
                address: address,
                mobile: mobileNo,
                altContact: alternativeMobileNo,
                accessKey: '8jdfjd88743jhg',
                deviceKey: API_KEY,
              })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            storeData();
          }).catch((error) => {

            alert("Hold on! Somethig went worng Try again later", [
              {
                text: "OK",
                onPress: () => null,
                style: "OK"
              },
            ]);
          });
      } else {
        alert("Hold on! Internet Connection Lost", [
          {
            text: "OK",
            onPress: () => null,
            style: "OK"
          },
        ]);
      }
    } else {
      alert("Hold on! Please Enter Valid OTP", [
        {
          text: "OK",
          onPress: () => null,
          style: "OK"
        },
      ]);
    }

    // setIsLogin(true);
    // setLoading(false);
  };

  const storeData = () => {

    let customerInfo = {
      name: name,
      address: address,
      mobile: mobileNo,
      altContact: alternativeMobileNo,
      //accessKey: this.state.access_key,
    }

    localStorage.setItem('user', JSON.stringify(customerInfo));
    dispatch({ type: 'IS_LOGIN', payload: true });
  };

  const payment_method = useAppState("paymentOption");

  const handlePlaceOrder = async () => {
    const isConnectionAvailable = window.navigator.onLine;
    dispatch({ type: 'IS_LOGIN', payload: true });
    dispatch({ type: 'IS_CLICKED', payload: true });
    if (isConnectionAvailable) {
      fetch(PLACE_ORDER_URL,
        {
          method: 'POST',
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              cartItem: items,
              subTotal: subTotal,
              deliveryCharge: deliveryCharge,
              name: name,
              mobile: mobileNo,
              address: address,
              altContact: alternativeMobileNo,
              payment_type: payment_method,
              is_changes: isCustInfoChange,
              accessKey: '8jdfjd88743jhg',
              deviceKey: API_KEY,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          storeData();
          clearCart();
          navigate('/order');
        }).catch((error) => {

        });

    } else {

      alert("Hold on! Internet Connection Lost", [
        {
          text: "OK",
          onPress: () => null,
          style: "OK"
        },
      ]);
    }

  };

  return (
    <form>
      <CheckoutWrapper>
        <CheckoutContainer>
          <CheckoutInformation>
            {clickOnLogin === false ? (
              <>
                <InformationBox  >
                  <FieldWrapper>
                    <MaskedInput
                      mask={[
                        '0',
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      className="form-control"
                      placeholder="Enter Your Mobile Number"
                      guide={false}
                      id="mobileNo"
                      value={mobileNo}
                      onChange={changeInput}
                      // onBlur={handleBlur}
                      name="number"
                      render={(ref, props) => (
                        <StyledInput ref={ref} {...props} />
                      )}
                    />
                  </FieldWrapper>

                  <Button
                    onClick={handleLogin}
                    // disabled={isSubmitting}
                    type="submit"
                    style={{ width: '100%', height: '44px' }}
                  >
                    <FormattedMessage
                      id="savedContactId"
                      defaultMessage="Login with OTP"
                    />
                  </Button>
                </InformationBox>
              </>
            ) : (
              <>
                <InformationBox>
                  <Heading>Your Information</Heading>
                  <FieldWrapper>
                    <TextField
                      id="name"
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={changeInput}
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <TextField
                      id="addr"
                      as="textarea"
                      placeholder="Enter Address"
                      // error={touched.info && errors.info}
                      value={address}
                      onChange={changeInput}
                    // onBlur={handleBlur}
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <MaskedInput
                      mask={[
                        '0',
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      className="form-control"
                      placeholder="Alternative Mobile Number (Optional)"
                      guide={false}
                      id="altMobileNo"
                      value={alternativeMobileNo}
                      onChange={changeInput}
                      // onBlur={handleBlur}
                      name="number"
                      render={(ref, props) => (
                        <StyledInput ref={ref} {...props} />
                      )}
                    />
                  </FieldWrapper>
                  {Login === false ? (
                    <>
                      <FieldWrapper>
                        <TextField
                          id="otp"
                          type="text"
                          placeholder="Enter your OTP"
                          // error={touched.name && errors.name}
                          value={otp}
                          onChange={changeInput}
                        // onBlur={handleBlur}
                        />
                      </FieldWrapper>
                      <Button
                        type='button'
                        onClick={handleSubmit}
                        // disabled={!isValid}
                        size='big'
                        loading={loading}
                        style={{ width: '100%' }}
                      >
                        <FormattedMessage
                          id='processCheckout'
                          defaultMessage='Login'
                        />
                      </Button>
                    </>
                  ) : (
                    null
                  )}

                </InformationBox>
                {Login === true ? (
                  <>
                    <InformationBox>
                      <Payment
                        increment={true}
                        flexStart={true}
                        buttonProps={{
                          variant: 'text',
                          type: 'button',
                          className: 'addButton',
                        }}
                        icon={true}
                      />
                    </InformationBox>
                    <InformationBox>
                      <Button
                        type='button'
                        onClick={handlePlaceOrder}
                        // disabled={!isValid}
                        size='big'
                        loading={loading}
                        style={{ width: '100%' }}
                      >
                        <FormattedMessage
                          id='processCheckout'
                          defaultMessage='Place Order'
                        />
                      </Button>
                    </InformationBox>
                  </>
                ) : null}

              </>
            )}
          </CheckoutInformation>

          {/* <CartWrapper>
            <Sticky
              // enabled={size.width >= 768 ? true : false}
              top={120}
              innerZ={999}
            >
              <OrderInfo>
                <Title>
                  <FormattedMessage
                    id='cartTitle'
                    defaultMessage='Your Order'
                  />
                </Title>

                <Scrollbar className='checkout-scrollbar'>
                  <ItemsWrapper>
                    {cartItemsCount > 0 ? (
                      items.map((item) => (
                        <OrderItem key={`cartItem-${item.id}`} product={item} />
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
                  </ItemsWrapper>
                </Scrollbar>

                <CalculationWrapper>
                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='subTotal'
                        defaultMessage='Subtotal'
                      />
                    </Text>
                    <Text>
                      {CURRENCY} {calculateSubTotalPrice()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='intlOrderDetailsDelivery'
                        defaultMessage='Delivery Charge'
                      />
                    </Text>
                    <Text>{CURRENCY} {parseFloat(deliveryCharge).toFixed(2)}</Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='discountText'
                        defaultMessage='Discount'
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculateDiscount()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper style={{ marginTop: 20 }}>
                    <Bold>
                      <FormattedMessage id='totalText' defaultMessage='Total' />{' '}
                      <Small>
                        (
                        <FormattedMessage
                          id='vatText'
                          defaultMessage='Incl. VAT'
                        />
                        )
                      </Small>
                    </Bold>
                    <Bold>
                      {CURRENCY} {calculatePrice()}
                    </Bold>
                  </TextWrapper>
                </CalculationWrapper>
              </OrderInfo>
            </Sticky>
          </CartWrapper> */}
        </CheckoutContainer>
      </CheckoutWrapper>
    </form>
  );
};

export default CheckoutWithSidebar;
