import React, {useContext} from 'react';
import { openModal } from '@redq/reuse-modal';
import { AuthContext } from '../../../contexts/auth/auth.context';
import { RightMenu } from './menu/right-menu/right-menu';
import { LeftMenu } from './menu/left-menu/left-menu';
import HeaderWrapper from './header.style';
import LogoImage from '../../../assets/images/Logo-shop.png';
//import UserImage from '../../../assets/images/user.jpg';
// import { isCategoryPage } from '../is-home-page';
import Search from '../../../features/search/search';
import { useAppState } from "../../../contexts/app/app.provider";
import PRODUCT_SEARCH_URL from '../../../common/baseUrl';
import { useNavigate } from "react-router-dom";
import AuthenticationForm from '../../../features/authentication-form';

const Header = ({ className }) => {
  const navigate = useNavigate();
  const { authDispatch } = useContext(AuthContext);
  const isSingleProduct = useAppState("isShowingSingleProduct");
  // const { pathname, query } = useRouter();
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        authDispatch({ type: 'SIGN_OUT' });
        navigate(`/`);
    }
  };

  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });

    // openModal({
    //   show: true,
    //   overlayClassName: 'quick-view-overlay',
    //   closeOnClickOutside: true,
    //   component: AuthenticationForm,
    //   closeComponent: '',
    //   config: {
    //     enableResizing: false,
    //     disableDragging: true,
    //     className: 'quick-view-modal',
    //     width: 458,
    //     height: 'auto',
    //   },
    // });
  };
  return (
    <HeaderWrapper className={className} id="layout-header">
      <LeftMenu
        logo={LogoImage}
      />
      {isSingleProduct !== '1' ?
        <Search minimal={true} className="headerSearch" />
        :
        null
      }

      <RightMenu
        onJoin={handleJoin}
        onLogout={handleLogout}
        //avatar={UserImage}
      />
    </HeaderWrapper>
  );
};

export default Header;
