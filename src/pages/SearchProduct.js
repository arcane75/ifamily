import React from 'react';
import Products from '../Components/product-grid/product-list/product-list';
import { useAppState, useAppDispatch } from "../contexts/app/app.provider"

const SearchProduct = () => {
    const searchProduct = useAppState("searchProduct");
    console.log('searchProduct from here', searchProduct);
    return (
        <div>
            <Products
                productList={searchProduct}
            />
        </div>
    );
};

export default SearchProduct;