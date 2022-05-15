import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";

import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../src/site-settings/site-theme/default';
import { AppProvider } from '../src/contexts/app/app.provider';
import { AuthProvider } from '../src/contexts/auth/auth.provider';
import { CartProvider } from '../src/contexts/cart/use-cart';
import { useMedia } from '../src/utils/use-media';
import { ModalProvider } from "./contexts/modal/modal.provider";
import { Modal } from "@redq/reuse-modal";
import SubCategory from "./pages/SubCategory";
import Category from "./pages/Category";
import SearchProduct from "./pages/SearchProduct";
import CheckoutWithSidebar from "./features/checkouts/checkout-two/checkout-two";
import OrdersContent from "./features/user-profile/order/order";
import CartMobile from "./features/carts/cartMobile";

// External CSS import here


function App() {
  return (

    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <AppProvider>
          <ModalProvider>

            <CartProvider>
              <IntlProvider locale="en">


                {/* <Component
                {...pageProps}
                deviceType={{ mobile, tablet, desktop }}
              /> */}


                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />}>

                      <Route
                        path="/category/:type_id"
                        element={<Category />}
                      />


                      <Route
                        path="/subcategory/:subtype_id"
                        element={<SubCategory />}
                      />
                      <Route path="/search" element={<SearchProduct />} />

                      <Route path="/checkout" element={<CheckoutWithSidebar />} />
                      <Route path="/order" element={<OrdersContent />} />
                      <Route path="/cartmobile" element={<CartMobile />} />

                    </Route>

                  </Routes>
                </BrowserRouter>


              </IntlProvider>
            </CartProvider>
          </ModalProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>


  );
}

export default App;
