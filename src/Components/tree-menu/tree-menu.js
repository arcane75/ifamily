import React, { useState, useEffect } from 'react';
import { usePrevious, useMeasure } from '../../utils/hooks';
import { useSpring, animated } from 'react-spring';
import { Frame, Title, Content, Header, IconWrapper } from './tree-menu.style';
import { Button } from '../button/button';
import { IMAGE_URL } from '../../common/baseUrl';
import Image from '../image/image';
import { ArrowNext } from '../../assets/icons/ArrowNext';
import * as icons from '../../assets/icons/category-icons';
// import { get } from 'js-cookie';

const Tree = React.memo(
  ({
    children,
    name,
    icon,
    // isOpen,
    onClick,
    dropdown,
    onToggleBtnClick,
    depth,
    defaultOpen = false,
  }) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    useEffect(() => {
      setOpen(defaultOpen);
    }, [defaultOpen]);
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useSpring({
      from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
      },
    });
    // const Icon = icon ? Icons[icon] : depth === 'child' ? Icons['Minus'] : null;
    // const Icon = icon ? Icons[icon] : null;
    const Icon = ({ iconName, style }) => {
      const TagName = icons[iconName];
      return !!TagName ? (
        <TagName style={style} />
      ) : (
          <p>Invalid icon {iconName}</p>
        );
    };
    return (
      <Frame depth={depth}>
        <Header open={isOpen} depth={depth} className={depth}>
          {depth === "parent" ? (
            <IconWrapper depth={depth}>
              <img src={IMAGE_URL + 'banner/' + icon} />
            </IconWrapper>
          ) : (
              <IconWrapper depth={depth}>
              </IconWrapper>
            )}


          <Title onClick={onClick}>{name}</Title>

          {dropdown === true && (
            <Button
              onClick={() => setOpen(!isOpen)}
              variant="text"
              className="toggleButton"
            >
              <ArrowNext width="16px" />
            </Button>
          )}
        </Header>
        <Content
          style={{
            opacity,
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}
        >
          <animated.div style={{ transform }} {...bind}
            children={children}
          />
        </Content>
      </Frame>
    );
  }
);

export const TreeMenu = ({
  data,
  className,
  onClick,
  // active,
}) => {
  // console.log(data);
  const [active, setActive] = useState(0);
  const [isClicked, setIsClicked] = useState(0);
  const getTypeId = (id, type) => {
    if (type == "productType") {
      setActive(id);
    } else {
      data.map((typeInfo) => {
        typeInfo.sub_menu.map((subtypeInfo) => {
          if (subtypeInfo.subtype_id == id) {
            // console.log(subtypeInfo.type_id);
            setActive(subtypeInfo.type_id);
            setIsClicked(subtypeInfo.subtype_id);
          }
        });

      });
    };


  }
  const handler = (children) => {
    return children?.map((subOption) => {
      // console.log(subOption);
      if (!subOption.sub_menu) {
        return (
          <Tree
            key={subOption.subproduct_type}
            name={subOption.subproduct_type}
            icon={subOption.icon}
            depth="child"
            onClick={() => { getTypeId(subOption.subtype_id, 'subtype'); onClick(subOption.subtype_id, 'subtype'); }}
            defaultOpen={isClicked === subOption.subtype_id}
          />
        );
      }
      // console.log(subOption.type_id);
      return (
        <Tree
          key={subOption.product_type}
          name={subOption.product_type}
          icon={subOption.type_icon}
          dropdown={!subOption.sub_menu.length ? false : true}
          depth="parent"
          onClick={() => { getTypeId(subOption.type_id, 'productType'); onClick(subOption.type_id, 'productType'); }}
          defaultOpen={
            active === subOption.type_id ||
            subOption.sub_menu.some((item) => item.type_id === active)
          }
        >
          {handler(subOption.sub_menu)}
        </Tree>
      );
    });
  };
  return <>{handler(data)}</>;
};
