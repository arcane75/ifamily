import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../Components/product-grid/product-list/product-list';
import { useAppState, useAppDispatch } from "../contexts/app/app.provider";

const SubCategory = () => {
    const { subtype_id } = useParams();

    const allProductInfo = useAppState("allProductInfo");
    const [subTypeProduct, setSubTypeProduct] = useState([]);

    useEffect(() => {

        let ProductInfo = allProductInfo.filter(spt => spt.subtype_id === subtype_id);
        setSubTypeProduct(ProductInfo);

    }, [subtype_id])

    // console.log('subTypeProduct', subTypeProduct);
    return (
        <div>
            <Products
                productList={subTypeProduct}
            />
        </div>
    );
};

export default SubCategory;