import React, { useCallback, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../../../../../redux/store';
import { searchCouponsThunk } from '../../../../../../redux/features/coupons/coupons.thunks';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

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
      className='input-base'
      placeholder="Search…"
      style={{
        borderRadius: '8px',
        background: '#f4f6f9',
        padding: '4px 8px 4px 44px'
      }}
      inputProps={{ 'aria-label': 'search' }}
    />
  </Search >);
}