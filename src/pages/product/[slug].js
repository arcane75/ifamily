import React, { useEffect, useState } from "react";
// import dynamic from 'next/dynamic';
// import { NextPage } from 'next';
// import { useRouter } from 'next/router';
import axios from 'axios';
import { baseURL, PRODUCTINFO_URL, API_KEY } from "../../common/baseUrl";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
// import { useRefScroll } from '../../utils/use-ref-scroll';
//import { SEO } from 'components/seo';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
    ProductSingleContainer,
} from '../../assets/styles/product-single.style';

import ProductDetails from '../../Components/product-details/product-details-one/product-details-one';
import CartPopUp from '../../features/carts/cart-popup';


const ProductPage = ({ props, deviceType }) => {

    // const router = useRouter();
    // const { asPath } = router;

    const mobile = useAppState("isMobile");
    const tablet = useAppState("isTablet");
    const desktop = useAppState("isDesktop");
    const dispatch = useAppDispatch();
    let product_id = '';
    const [pruductInfo, setPruductInfo] = useState([]);
    const [relatedPruducts, setRelatedPruducts] = useState([]);
    const [loading, setLoading] = useState(true)

    if (typeof window !== 'undefined') {
        let url_info = window.location.pathname.split("/");
        if (url_info[2] != '[slug]') {
            product_id = url_info[2];
        }
    }

    useEffect(() => {
        dispatch({ type: 'IS_MOBILE', payload: deviceType.mobile });
        dispatch({ type: 'IS_TABLET', payload: deviceType.tablet });
        dispatch({ type: 'IS_DESKTOP', payload: deviceType.desktop });
        dispatch({ type: 'IS_SHOWING_SINGLE_PRODUCT', payload: '1' });
        checkInternetConnection();
    }, []);

    const checkInternetConnection = () => {
        const isConnectionAvailable = window.navigator.onLine;
        loar_data(isConnectionAvailable);
    }

    const loar_data = (isConnectionAvailable) => {

        if (isConnectionAvailable) {
            let url = PRODUCTINFO_URL + product_id + '/' + API_KEY;

            return fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    setPruductInfo(responseJson.productInfo);
                    setRelatedPruducts(responseJson.relatedProductInfo);
                    setLoading(false);
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

    let content = (
        <ProductDetails product={pruductInfo} relatedProductInfo={relatedPruducts} deviceType={{ mobile, tablet, desktop }} />
    );


    return (
        <>
            {/* <SEO
        title={`${data.product.title} - PickBazar`}
        description={`${data.product.title} Details`}
      /> */}
            {!loading ?
                <Modal>
                    <ProductSingleWrapper>
                        <ProductSingleContainer>
                            {content}
                            <CartPopUp deviceType={{ mobile, tablet, desktop }} />
                        </ProductSingleContainer>
                    </ProductSingleWrapper>
                </Modal>
                : null
            }
        </>
    );
};

export default ProductPage;
