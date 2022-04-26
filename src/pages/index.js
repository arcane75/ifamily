import React, { useEffect, useState } from "react";
import { baseURL, API_KEY } from "../common/baseUrl";
import axios from 'axios';
import { useRefScroll } from '../utils/use-ref-scroll';
// import dynamic from 'next/dynamic';
import { MobileBanner } from '../components/banner/mobile-banner';
import { Modal } from '@redq/reuse-modal';
import { useAppState, useAppDispatch } from "../contexts/app/app.provider";
import { useRouter } from 'next/router';
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  ProductsRow,
  OfferSection,
  MobileCarouselDropdown,
} from '../assets/styles/pages.style';
import { ModalProvider } from '../contexts/modal/modal.provider';
import Sidebar from "../layouts/sidebar/Sidebar";
import CartPopUp from "../features/carts/cart-popup";
// const Sidebar = dynamic(() => import('../layouts/sidebar/sidebar'));

// const Product = dynamic(() =>
//   import('../components/product-grid/product-list/product-list')
// );
// const CartPopUp = dynamic(() => import('../features/carts/cart-popup'));
// import AppSlider from "../components/slider/AppSlider";
// import Footer from "../layouts/footer";
// import NoResultFound from "../components/no-result/no-result";
// import Loading from "../components/loading/loading";
// import Error from "../components/error/error";

function HomeScreen(deviceType) {
  const showProduct = useAppState("showProductInfo");
  const isClickSearchButton = useAppState("isClickOnSearch");
  const mobile = useAppState("isMobile");
  const tablet = useAppState("isTablet");
  const desktop = useAppState("isDesktop");
  const [sidebarItem, setSidebar] = useState([]);
  const [sliderInfo, setSliderInfo] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [timeOut, setTimeOut] = useState(null)
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {

    dispatch({ type: 'IS_MOBILE', payload: deviceType.deviceType.mobile });
    dispatch({ type: 'IS_TABLET', payload: deviceType.deviceType.tablet });
    dispatch({ type: 'IS_DESKTOP', payload: deviceType.deviceType.desktop });
    let url = 
    axios.get(baseURL)
      .then((res) => {
        setSidebar(res.data.menu_item);
        setSliderInfo(res.data.desktopSliderInfo);
        dispatch({ type: 'IS_SHOWING_SINGLE_PRODUCT', payload: '0' });
        dispatch({ type: 'SAVE_SIDEBAR_DATA', payload: res.data.menu_item });
        dispatch({ type: 'SAVE_PRODUCT_INFO', payload: res.data.allProductInfo });
        dispatch({ type: 'SAVE_CHARGE_INFO', payload: res.data.charge_info });
        setLoading(false);
        setTimeout(() => {
          setTimeOut(1)
        }, 3000)
      })
      .catch((error) => {
        alert(error);
        setError(true)
      })
  }, []);

  const loadDataOnClick = (id, name) => {
    if (name == 'productType') {
      if (id == 12) {
        dispatch({ type: 'POPULAR_PRODUCT_INFO', payload: id });
      }
      else if (id == 13) {
        dispatch({ type: 'OFFER_PRODUCT_INFO', payload: id });
      } else {
        dispatch({ type: 'SAME_TYPE_PRODUCT_INFO', payload: id });
      }
    } else {
      dispatch({ type: 'SUBTYPE_PRODUCT_INFO', payload: id });
    }
    dispatch({ type: 'IS_SIDEBAR_OPEN', payload: '0' });
    window.scrollTo(0, 0);
  }

  return (
    <>
      <ModalProvider>
        <Modal>
          <MobileBanner
          // intlTitleId={page?.banner_title_id} 
          // type={PAGE_TYPE} 
          />
          {/* <MobileCarouselDropdown>
            <Sidebar
              clickOnCategory={loadDataOnClick}
              // type={PAGE_TYPE} 
              sidebar={sidebarItem}
              deviceType={{ mobile, tablet, desktop }} />
          </MobileCarouselDropdown> */}
          <OfferSection>
          </OfferSection>
          <MainContentArea>
            <SidebarSection>
              <Sidebar
                sidebar={sidebarItem}
                clickOnCategory={loadDataOnClick}
                // type={PAGE_TYPE}
                deviceType={{ mobile, tablet, desktop }}
              />
            </SidebarSection>

     
          </MainContentArea>
          {/* {loading || timeOut !== 1 ?
            null :
            <>
              {!desktop ?
                <Footer />
                :
                null
              }
            </>
          } */}
          <CartPopUp deviceType={{ mobile, tablet, desktop }} />
        </Modal>
      </ModalProvider>
    </>
  );
};

export default HomeScreen;