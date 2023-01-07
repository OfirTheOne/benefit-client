import React, { useCallback, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../../redux/store';
import { searchCouponsThunk } from '../../../../../../redux/features/coupons/coupons.thunks';
import { SEARCH_INPUT_PLACEHOLDER } from './search-input.text';

const Search: React.FC<React.PropsWithChildren<{ onClick?: () => void }>> = ({ children }) => <div
  style={{
    position: 'relative',
    marginRight: '8px',
    marginLeft: '12px',
    width: 'auto',
  }}>
  {children}
</div>;

export const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const onClickSearch = useCallback(() => {
    dispatch(searchCouponsThunk({ text: value }));
    navigate('/search')
  }, [value]);
  
  return (<Search>
    <IconButton
      style={{
        position: 'absolute',
        zIndex: 999,
      }}
      onClick={onClickSearch}
      color="primary"
      aria-label="search"
      component="label">
      <SearchIcon
        onClick={onClickSearch}
        style={{
          color: '#1676d2'
        }}
      />
    </IconButton>
    <InputBase
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {if(e.key == 'Enter') onClickSearch();}}
      className='input-base'
      placeholder={SEARCH_INPUT_PLACEHOLDER}
      style={{
        borderRadius: '8px',
        background: '#f4f6f9',
        padding: '4px 12px 4px 44px'
      }}
      inputProps={{ 'aria-label': 'search', style: { direction: 'rtl' } }}
    />
  </Search >);
}