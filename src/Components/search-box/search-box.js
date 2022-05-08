import React from 'react';
import {
  StyledForm,
  StyledInput,
  StyledCategoryName,
  StyledSearchButton,
} from './search-box.style';
 import { SearchIcon } from '../../assets/icons/SearchIcon';



export const SearchBox = ({
  onEnter,
  onChange,
  value,
  name,
  minimal,
  categoryType,
  buttonText,
  className,
  showButtonText = true,
  shadow,
  ...rest
}) => {

  return (
    <StyledForm
      onSubmit={onEnter}
      className={className}
      boxShadow={shadow}
      minimal={minimal}
    >
      {minimal ? (
        <>
          <StyledInput
            type='search'
            onChange={onChange}
            value={value}
            name={name}
            autoFocus={true}
            {...rest}
          />
        </>
      ) : (
        <>
          <StyledCategoryName>{categoryType}</StyledCategoryName>
          <StyledInput
            type='search'
            onChange={onChange}
            value={value}
            name={name}
            {...rest}
          />
          <StyledSearchButton>
            <SearchIcon style={{ marginRight: 10 }} />
            {showButtonText && buttonText}
          </StyledSearchButton>
        </>
      )}
    </StyledForm>
  );
};
