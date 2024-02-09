import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { PopupMenu } from 'react-simple-widgets';
import { Icon } from '@iconify/react';
import { TagsBlock } from '../TagsBlock';
import './styles.scss';
import DropdownMenu from '../DropdownMenu/index';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const { tags } = useSelector((state) => state.posts);

  const isTagsLoading = tags.status === 'loading'

  const onClickLogout = () => {
    if (window.confirm('ви дійсно хочете вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className="root">
      <Container maxWidth="fluid">
        <div className="inner">
        <div className="left-element">
            <Link className="logo" to="/">
              <div>MAGATH</div>
            </Link>
        </div>
        <DropdownMenu />
        </div>
      </Container>
    </div>
  );
};