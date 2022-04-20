import React, { useState } from 'react';
import { SearchBox } from '../../Components/search-box/search-box';
import { searchProduct } from "../../store/actions/webDataInfo";
// import { useDispatch } from "react-redux";
// import { useRouter } from 'next/router';
import { useCart } from "../../contexts/cart/use-cart";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider"



const Search = ({ onSubmit, ...props }) => {
  // const [timeOut, setkeyTimeOut] = useState(0);
  // const { getSearchText } = useCart();
  // const searchTerm = useAppState("searchTerm")
  // const router = useRouter();
  // const dispatch = useAppDispatch();

  let myVar = 0;
  const handleOnChange = (e) => {
    const { value } = e.target;
    window.clearTimeout(myVar);

    //myVar = setTimeout(function () { dispatch({ type: 'SET_SEARCH_TERM', payload: value }); }, 1000);
    myVar = window.setTimeout(function () { searchProduct(value); }, 1000);
    window.scrollTo(0, 0);
  };

  // function searchProduct(value) {
  //   if (value !== '') {
  //     dispatch({ type: 'SET_SEARCH_TERM', payload: value });
  //   }
  // }

  const onSearch = (e) => {
    e.preventDefault();

    // dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
    // if (onSubmit) {
    //   onSubmit();
    // }
  };
  return (
    <SearchBox
      onEnter={onSearch}
      onChange={handleOnChange}
      // value={searchTerm}
      name="search"
      placeholder='Search your products from here'
      {...props}
    />
  );
};

export default Search;
