import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import axios from "../axios";

import { Post } from "../components/Post";
import { Slider } from "../components/Slider";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.warn(err)
        alert('помилка при отриманні статті')
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  const images = [];
  data.imageUrl.map((obj) => {
    images.push(`http://localhost:4444${obj}`)
  })
  // const images = ['https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  //  'https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg',
  //  data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''];

  return (
    <>
      <Slider images={images} />
      {/* <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post> */}
      <h2>{data.title}</h2>
      <h3>{data.text}</h3>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
