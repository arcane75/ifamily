export const initialState = {
  searchTerm: '',
  allProductInfo: [],
  showProductInfo: [],
  sidebarData: [],
  orderInfo: [],
  isSidebarOpen: "0",
  deliveryChargeMax: "0",
  deliveryChargeMin: "0",
  mimimunAmount: "0",
  deliveryChargeMSG: "",
  deliveryNotice: "",
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isLogin: false,
  isSticky: false,
  isSidebarSticky: true,
  isDrawerOpen: false,
  isModalOpen: false,
  isClickOnSearch: false,
  isShowingSingleProduct: '0',
  paymentOption: '1',
  isCheckOut: false,
};


export function appReducer(state, action) {
  switch (action.type) {

    case 'SAVE_PRODUCT_INFO':
      return {
        ...state,
        allProductInfo: action.payload,
        showProductInfo: action.payload.filter(sp => sp.is_special_offer === '1'),
      };
    case 'SAVE_SIDEBAR_DATA':
      return {
        ...state,
        sidebarData: action.payload,
      };
    case 'SAVE_CHARGE_INFO':

      return {
        ...state,
        deliveryChargeMax: action.payload[0].max_delivery_charge,
        deliveryChargeMin: action.payload[0].min_delivery_charge,
        mimimunAmount: action.payload[0].min_order_amount,
        deliveryChargeMSG: action.payload[0].delivery_charge_notice,
        deliveryNotice: action.payload[0].outlet_notice,
      };
    case 'POPULAR_PRODUCT_INFO':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(sp => sp.is_popular_in_shop === '1'),
      };
    case 'OFFER_PRODUCT_INFO':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(sp => sp.is_special_offer === '1'),
      };
    case 'SAME_TYPE_PRODUCT_INFO':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(p => p.type_id === action.payload),
      };
    case 'SUBTYPE_PRODUCT_INFO':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(p => p.subtype_id === action.payload),
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(pP =>
          pP.product_title_eng.toLowerCase().includes(action.payload.toLowerCase()) ||
          pP.product_title_beng.toLowerCase().includes(action.payload.toLowerCase()) ||
          pP.product_code.toLowerCase().includes(action.payload.toLowerCase())),

      };
    case 'SAVE_ORDER_INFO':
      return {
        ...state,
        orderInfo: action.payload,
      };
    case 'IS_SIDEBAR_OPEN':
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    case 'IS_LOGIN':
      return {
        ...state,
        isLogin: action.payload,
      };
    case 'IS_MOBILE':
      return {
        ...state,
        isMobile: action.payload,
      };
    case 'IS_TABLET':
      return {
        ...state,
        isTablet: action.payload,
      };
    case 'IS_DESKTOP':
      return {
        ...state,
        isDesktop: action.payload,
      };
    case 'IS_SHOWING_SINGLE_PRODUCT':
      return {
        ...state,
        isShowingSingleProduct: action.payload,
      };
    case 'SET_PAYMENT_OPTION':
      console.log(action.payload);
      return {
        ...state,
        paymentOption: action.payload,
      };
    case 'SET_STICKY':
      return {
        ...state,
        isSticky: true,
      };
    case 'REMOVE_STICKY':
      return {
        ...state,
        isSticky: false,
      };
    case 'SET_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: true,
      };
    case 'REMOVE_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: false,
      };
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        isClickOnSearch: !state.isClickOnSearch,
      };
    case 'TOGGLE_CHECKOUT':
      return {
        ...state,
        isCheckOut: !state.isCheckOut,
      };
    default: {
      throw new Error(`Unsupported action type at App Reducer`);
    }
  }
}
