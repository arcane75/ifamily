import React, { useEffect } from 'react';
import Products from '../../Components/product-grid/product-list/product-list'
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import { useMedia } from '../../utils/use-media';

const HomeProducts = () => {
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
            <Products
                productList={showProduct}
            />
        </div>
    );
};

export default HomeProducts;