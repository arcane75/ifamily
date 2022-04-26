import React , {Suspense} from 'react';
import {useImage} from 'react-image'
// import placeholder from './product-placeholder.png';
// const Placeholder = () => <img src={placeholder} alt="product img loader" />;

export default function Image({
  url,
  alt = 'placeholder',
  unloader,
  loader,
  className,
  style,
}

// : {
//   url?: string | [string];
//   alt?: string;
//   unloader?: string;
//   loader?: string;
//   className?: string;
//   style?: any;
// }

)

{
  const {src} = useImage({
    srcList: url,
  })

  return (
    <img
      draggable={false}
      style={style}
      src={src}
      alt={alt}
      // loader={<Placeholder />}
      // unloader={<Placeholder />}
      className={className}
    />
  );
}
