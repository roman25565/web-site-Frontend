import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { Footer } from '../components/Footer';
import { Post } from '../components/Post';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  const { posts, tags } = useSelector((state) => state.posts);
  const { data } = useSelector((state) => state.auth);

  const isPostsLoading = posts.status === 'loading'
  // const isUserData = data.status === 'loading'

  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, []);
  // console.log(data, 'data')
  // console.log(userData, 'userData')

  return (
    <>
      <Box sx={{ width: '100%', ml: '10%', mr: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', marginTop: '30px', gap: '60px' }}>
         {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl[0] ? `http://localhost:4444${obj.imageUrl[0]}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={data ? (data.userData != null ? data.userData._id === obj.user._id : '') : ''}
            />
          )
        )}
      </Box>
      <Footer />
    </>
  );
};
