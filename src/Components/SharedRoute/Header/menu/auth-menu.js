import React, { useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Button } from '../../../../Components/button/button';
import { FormattedMessage } from 'react-intl';
import Popover from '../../../../Components/popover/popover';
import { AuthorizedMenu } from './authorized-menu';
import AuthenticationForm from '../../../../features/authentication-form';
import { openModal } from '@redq/reuse-modal';
import { useAppState, useAppDispatch } from "../../../../contexts/app/app.provider"
import { Box, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { InformationBox } from '../../../../features/checkouts/checkout-two/checkout-two.style';
import { FieldWrapper } from '../../../address-card/address-card.style';
import MaskedInput from 'react-text-mask';
import { useNavigate } from 'react-router-dom';

const AuthMenu = () => {
  const Login = useAppState("isLogin");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //   const Router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let CustInfo = JSON.parse(localStorage.getItem('user'));
    if (CustInfo !== null) {
      dispatch({ type: 'IS_LOGIN', payload: true });
    }
  }, []);
  const handleSubmit = async () => {
    navigate('/order');
  };

  const handleLogOut = async () => {
    localStorage.removeItem('user');
    dispatch({ type: 'IS_LOGIN', payload: false });
  };
  const handleClose = () => setOpen(false);

  const handleJoin = () => {
    setOpen(true);
  };


  const style = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // bgcolor: 'background.paper',
    // boxShadow: 24,
    // p: 4,
    // overflowY: { sm: 'scroll', md: 'scroll' },
    // overflowX: 'hidden',
    // width: { xs: '80%', lg: '70%', xl: '50%', },
    // height: { xs: '60%', md: '50%', xl: 'auto' },
    // zIndex: '+9999999999999999999999999'

    // padding: '130px 60px 60px',

  };
  const handleCloseModal = () => {
    handleClose();

  };

  return Login === false ? (
    <>
      <Button variant="primary" onClick={handleJoin}>
        Login
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >

        <Box sx={{ style }}>
          {/* <Button onClick={handleCloseModal}
            style={{ backgroundColor: 'white', }}>
            <CloseIcon sx={{ boxShadow: 3, fontSize: 26, p: 1, borderRadius: '50%', backgroundColor: 'white', color: 'black' }} />
          </Button> */}
          <AuthenticationForm />
        </Box>

      </Modal>
    </>
  ) : (
    <>
      <Button variant="primary" onClick={handleSubmit}>
        My Order
      </Button>
      &nbsp; &nbsp;
      <Button variant="primary" onClick={handleLogOut}>
        Logout
      </Button>
    </>
    // <Popover
    //   direction="right"
    //   className="user-pages-dropdown"
    //   handler={<img src={avatar} alt="user" />}
    //   content={<AuthorizedMenu onLogout={onLogout} />}
    // />
  );
};
export default AuthMenu;
