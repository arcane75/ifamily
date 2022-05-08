import React, { useState } from 'react';
import { SearchBox } from '../../Components/search-box/search-box';
// import { searchProduct } from "../../store/actions/webDataInfo";
// import { useDispatch } from "react-redux";
// import { useRouter } from 'next/router';
// import { useCart } from "../../contexts/cart/use-cart";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider"
// import SearchProduct from '../../pages/SearchProduct';
import { useNavigate } from "react-router-dom";
import {PRODUCT_SEARCH_URL} from '../../common/baseUrl'
import axios from 'axios';

const DEVICE_KEY = 'ba8dd74c58444d83';
const Search = ({ ...props }) => {
  // const [timeOut, setkeyTimeOut] = useState(0);
  // const { getSearchText } = useCart();
  // const searchTerm = useAppState("searchTerm")
  // const router = useRouter();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let myVar = 0;
  const handleOnChange = (e) => {
    const { value } = e.target;
    window.clearTimeout(myVar);

    //myVar = setTimeout(function () { dispatch({ type: 'SET_SEARCH_TERM', payload: value }); }, 1000);
    myVar = window.setTimeout(function () {

      if (value !== '') {

        if (value?.match(/[a-zA-Z0-9]/i)) {
          if (value?.length > 2) {
            searchProduct(value);
          }
        } else {
          if (value?.length > 1) {
            searchProduct(value);
          }
        }

      } else {

      }
    }, 1000);
    window.scrollTo(0, 0);
  };

  function searchProduct(value) {
    // console.log('valuee',value);
    if (value !== '') {
      axios?.post(PRODUCT_SEARCH_URL,
        {
          str: value,
          deviceKey: DEVICE_KEY,
        },
        { timeout: 3000 })
        .then((response) => {
          dispatch({ type: 'SAVE_SEARCH_DATA', payload: response?.data?.searchProductInfo });
        //  console.log('response', response.data.searchProductInfo);
        })
        .catch((error) => {
          console.log(error);

        });
    }
  }

  const onSearch = (e) => {
    dispatch({ type: 'IS_CLICKED', payload: true });
    e.preventDefault();
    navigate(`/search`);
    // dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
    // if (onSubmit) {
    //   onSubmit();
    // }
  };
  return (
    <SearchBox
      onEnter={onSearch}
      onChange={handleOnChange}
      onClick={onSearch}
      // value={searchTerm}
      name="search"
      placeholder='Search your products from here'
      {...props}
    />
  );
};

export default Search;
