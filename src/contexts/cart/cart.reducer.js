// export const cartItemsTotalPrice = (items, { discountInPercent = 0 } = {}) => {
export const cartItemsTotalPrice = (items, coupon = null) => {
  if (items === null || items.length === 0) return 0;
  const itemCost = items.reduce((total, item) => {
    if (item.sale_price) {
      return total + item.sale_price * item.quantity;
    }
    return total + item.sale_price * item.quantity;
  }, 0);
  // const discountRate = 1 - discountInPercent;
  const discount = coupon
    ? (itemCost * Number(coupon.discountInPercent)) / 100
    : 0;
  // itemCost * discountRate * TAX_RATE + shipping;
  // return itemCost * discountRate;
  return itemCost - discount;
};
// cartItems, cartItemToAdd
const addItemToCart = (state, action) => {
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.product_id === action.payload.product_id
  );
// console.log('action.payload.quantity',action.payload.quantity);
  if (existingCartItemIndex > -1) {
    const newState = [...state.items];
    console.log('newState',newState);
    console.log('before',newState[existingCartItemIndex].quantity);
    
    newState[existingCartItemIndex].quantity += action.payload.quantity;
    console.log('after',newState[existingCartItemIndex].quantity);
    return newState;
  }
  return [...state.items, action.payload];
};

// cartItems, cartItemToRemove
const removeItemFromCart = (state, action) => {
  return state.items.reduce((acc, item) => {
    if (item.product_id === action.payload.product_id) {
      const newQuantity = item.quantity - action.payload.quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
};

const clearItemFromCart = (state, action) => {
  return state.items.filter((item) => item.product_id !== action.payload.product_id);
};

export const reducer = (state, action) => {
  // console.log(action.payload.allProduct);
  switch (action.type) {
    case 'SAVE_PRODUCT':
      return { ...state, productInfo: action.payload.allProduct };
    case 'REHYDRATE':
      return { ...state, ...action.payload };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'ADD_ITEM':
      return { ...state, items: addItemToCart(state, action) };
    case 'REMOVE_ITEM':
      return { ...state, items: removeItemFromCart(state, action) };
    case 'CLEAR_ITEM_FROM_CART':
      return { ...state, items: clearItemFromCart(state, action) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    case 'TOGGLE_RESTAURANT':
      return { ...state, isRestaurant: !state.isRestaurant };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
