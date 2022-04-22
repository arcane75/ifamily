import React, { useState, useEffect } from 'react';
import {
  WalkerWrapper,
  Category,
  NoCategory,
  IconWrapper,
  CategoryWrapper,
} from './category-walker.style';
import { Button } from '../button/button';
import {HamburgerIcon} from '../SharedRoute/Header/header.style';
import SpringModal from '../spring-modal/spring-modal';

import { useAppState, useAppDispatch } from "../../contexts/app/app.provider"


const CategoryWalker = ({
  style,
  className,
  children,
}) => {
  let [isOpen, setOpen] = useState(false);
  // const { query } = useRouter();
  const isSidebarOpen = useAppState("isSidebarOpen");
 
  if(isSidebarOpen === "1"){
    isOpen = true;
  }
  return (
    <WalkerWrapper style={style} className={className}>
      {/* <Button variant='text' >
        Filter
      </Button> */}
      <SpringModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        {children}
      </SpringModal>
    </WalkerWrapper>
  );
};

export default CategoryWalker;
