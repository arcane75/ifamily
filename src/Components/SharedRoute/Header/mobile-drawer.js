import React, { useContext } from 'react';
import { openModal } from '@redq/reuse-modal';
// import Router from 'next/router';
import { Scrollbar } from '../../components/scrollbar/scrollbar';
import Drawer from '../../components/drawer/drawer';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { AuthContext } from '../../contexts/auth/auth.context';
import AuthenticationForm from '../../features/authentication-form';
import {
  DrawerBody,
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
  DrawerProfile,
  LogoutView,
  LoginView,
  UserAvatar,
  UserDetails,
  DrawerMenu,
  DrawerMenuItem,
  UserOptionMenu,
} from './header.style';
import { useAppState, useAppDispatch } from '../../contexts/app/app.provider';
import OrderWAuth from "../../layouts/OrderWAuth";
import { TreeMenu } from '../../components/tree-menu/tree-menu';

const MobileDrawer = ({
  clickOnCategory,
}) => {
  const sidebarItem = useAppState("sidebarData");
  // console.log(sidebarItem);
  const isDrawerOpen = useAppState('isDrawerOpen');
  const dispatch = useAppDispatch();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext(AuthContext);
  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: 'TOGGLE_DRAWER',
    });
  }, [dispatch]);



  const onCategoryClick = (id,name) => {
     if (name == 'productType') {
      if (id == 12) {

      }
      else if (id == 13) {

      } else {
        dispatch({ type: 'SAME_TYPE_PRODUCT_INFO', payload: id });
      }
    } else {
      dispatch({ type: 'SUBTYPE_PRODUCT_INFO', payload: id });
    }
    // dispatch({ type: 'IS_SIDEBAR_OPEN', payload: '0' });
    toggleHandler();
    window.scrollTo(0, 0); 

  };

  return (
    <Drawer
      width='316px'
      drawerHandler={
        <HamburgerIcon>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      }
      open={isDrawerOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <DrawerClose>
          <OrderWAuth />
          {/* <CloseIcon /> */}
        </DrawerClose>
      }
      
    >
      <DrawerBody>
        <Scrollbar className='drawer-scrollbar'>
          <DrawerContentWrapper>
           
              {/* <DrawerProfile>
                <LogoutView>
                   
                </LogoutView>
                
              </DrawerProfile> */}
             <DrawerMenu>
              <DrawerMenuItem>
                <TreeMenu
                  data={sidebarItem}
                  onClick={onCategoryClick}
                  // active={false}
                  // deviceType={deviceType}
                />
              </DrawerMenuItem>   
                  
                
            </DrawerMenu>
          </DrawerContentWrapper>
        </Scrollbar>
      </DrawerBody>
    </Drawer>
  );
};

export default MobileDrawer;



// import React from 'react';
// import { useAppState, useAppDispatch } from '../../contexts/app/app.provider';
// import Drawer from '../../components/drawer/drawer';
// import { CloseIcon } from '../../assets/icons/CloseIcon';
// import {
//   HamburgerIcon,
//   DrawerClose,
// } from './header.style';



// const MobileDrawer = () => {
    
//   const isDrawerOpen = useAppState('isDrawerOpen');
//   const dispatch = useAppDispatch();
//   // Toggle drawer
//   const toggleHandler = () => {
//     dispatch({ type: 'IS_SIDEBAR_OPEN', payload: '1' });
//   };

//   return (
//   <Drawer
//       width='316px'
//       drawerHandler={
//         <HamburgerIcon>
//           <span />
//           <span />
//           <span />
//         </HamburgerIcon>
//       }
//       open={isDrawerOpen}
//       toggleHandler={toggleHandler}
//       closeButton={
//         <DrawerClose>
//           <CloseIcon />
//         </DrawerClose>
//       }
//     >
     
//    </Drawer>
//   );
// };

// export default MobileDrawer;
