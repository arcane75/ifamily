import React from 'react';
import CartPopUp from '../../features/carts/cart-popup';
import Sidebar from '../../layouts/sidebar/Sidebar';
import Header from '../SharedRoute/Header/Header';
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import Products from '../../Components/product-grid/product-list/product-list'
import { Box, Grid } from '@mui/material';

const Home = () => {
    const showProduct = useAppState("showProductInfo");
    // console.log('show product', showProduct);
    return (
        <div>

            <Header />

            <Sidebar />



            {/* <Products
                productList={showProduct}
            /> */}
            {/* <CartPopUp />  */}
        </div>
    );
};

export default Home;