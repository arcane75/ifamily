import React from 'react';
// import { useRouter } from 'next/router';
import { openModal, closeModal } from '@redq/reuse-modal';
import MobileDrawer from './mobile-drawer';
// import Router from 'next/router';
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  SearchWrapper,
  SearchModalWrapper,
  SearchModalClose,
} from './header.style';

import {
  Box,
  Content,
  ContentRow,
  Description,

} from './banner.style';
import Search from '../../features/search/search';
import LogoImage from '../../assets/images/Logo-shop.png';

import { SearchIcon } from '../../assets/icons/SearchIcon';
import { LongArrowLeft } from '../../assets/icons/LongArrowLeft';
import Logo from '../../SharedRoute/Header/menu/logo/logo';
import { isCategoryPage } from '../is-home-page';
import useDimensions from '../../utils/useComponentSize';
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";


const SearchModal = () => {
  const onSubmit = () => {
    closeModal();
  };
  return (
    <SearchModalWrapper>
      <SearchModalClose type='submit' onClick={() => closeModal()}>
        <LongArrowLeft />
      </SearchModalClose>
      <Search
        className='header-modal-search'
        showButtonText={false}
        onSubmit={onSubmit}
      />
    </SearchModalWrapper>
  );
};

const MobileHeader = ({ className }) => {
  const isSingleProduct = useAppState("isShowingSingleProduct");
  // const { pathname, query } = useRouter();

  const [mobileHeaderRef, dimensions] = useDimensions();

  const dispatch = useAppDispatch();

  const toggleSearchBox = React.useCallback(() => {
    dispatch({
      type: "TOGGLE_SEARCH"
    });
  }, [dispatch]);

  function onArrowLeftClick() {
    // Router.push('/');
    // if (onClick) {
    //   onClick();
    // }
  }
  // const type = pathname === '/restaurant' ? 'restaurant' : query.type;

  // const isHomePage = isCategoryPage(type);

  const isClickSearchButton = useAppState("isClickOnSearch");
  const isClickCheckOut = useAppState("isCheckOut");

  return (
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
        {/* <LongArrowLeft /> */}
        {isSingleProduct != '1' && !isClickCheckOut ?
          <DrawerWrapper>
            <MobileDrawer />
          </DrawerWrapper>
          :
          <LongArrowLeft onClick={onArrowLeftClick} />
        }
        {!isClickSearchButton ? (

          <LogoWrapper>

            <Logo
              imageUrl={LogoImage}
              alt='shop logo' />
          </LogoWrapper>
        ) :
          <Search minimal={true} />
        }

        {isSingleProduct !== '1' && !isClickCheckOut ?
          <SearchWrapper
            onClick={toggleSearchBox}
            className='searchIconWrapper'
          >
            <SearchIcon />
          </SearchWrapper>
          :
          null
        }
      </MobileHeaderInnerWrapper>
    </MobileHeaderWrapper>
  );
};

export default MobileHeader;
