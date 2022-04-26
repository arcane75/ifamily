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
                    <Route path="/" element={<Home />} />
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
