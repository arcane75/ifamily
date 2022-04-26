import React from 'react';
import { themeGet } from '@styled-system/theme-get';
import styled from 'styled-components';
// import 'react-multi-carousel/lib/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselWithCustomDots = ({
  items = [],
  title,
  // deviceType: { mobile, tablet, desktop },
  ...rest
}) => {
  const children = items.slice(0, 6).map((item, index) => (
    <img
      src={item.url}
      key={index}
      alt={title}
    // style={{
    //   minWidth: 'auto',
    //   height: 'auto',
    //   position: 'relative',
    //   margin: 'auto',
    // }}

    />
  ));
  // const images = items.map((item, index) => (
  //   <img
  //     src={item.url}
  //     key={index}
  //     alt={title}
  //     style={{ width: '100%', height: '100%', position: 'relative' }}
  //   />
  // ));
  // const CustomDot = ({
  //   index,
  //   onClick,
  //   active,
  // } // carouselState: { currentSlide, deviceType },
  // ) => {
  //   return (
  //     <SingleItem
  //       data-index={index}
  //       key={index}
  //       onClick={() => onClick()}
  //       className={`custom-dot ${active && 'custom-dot--active'}`}
  //     >
  //       {React.Children.toArray(images)[index]}
  //     </SingleItem>
  //   );
  // };

  let deviceType = 'desktop';
  // if (mobile) {
  //   deviceType = 'mobile';
  // }
  // if (tablet) {
  //   deviceType = 'tablet';
  // }
  return (
    <Carousel
      autoPlay={false}
    >
      {children}
    </Carousel>
  );
};

export default CarouselWithCustomDots;
