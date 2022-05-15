import React, { useEffect } from 'react';
import CartPopUp from '../../features/carts/cart-popup';
import Sidebar from '../../layouts/sidebar/Sidebar';
import Header from '../SharedRoute/Header/Header';
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import Products from '../../Components/product-grid/product-list/product-list'
import { Box, Grid } from '@mui/material';
import { useMedia } from '../../utils/use-media';
const Home = () => {
    const showProduct = useAppState("showProductInfo");
    // console.log('show product', showProduct);
    const mobile = useMedia('(max-width: 580px)');
    const tablet = useMedia('(max-width: 991px)');
    const desktop = useMedia('(min-width: 992px)');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: 'IS_MOBILE', payload: mobile });
        dispatch({ type: 'IS_TABLET', payload: tablet });
        dispatch({ type: 'IS_DESKTOP', payload: desktop });
       

    }, [])

    return (
        <div>

            <Header />
            <Sidebar />

            {/* <Products
                productList={showProduct}
            /> */}
            <CartPopUp />
        </div>
    );
};

export default Home;