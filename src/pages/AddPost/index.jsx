import React from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import { selectIsAuth } from "../../redux/slices/auth";
import axios from '../../axios';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState([]);
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(oldArray => [...oldArray, data.url]);
    } catch (err) {
      console.warn(err)
      alert('Помилка при загрузці файлу')
    }
  };

  const onClickRemoveImage = (index) => {
    const updatedImageUrls = [...imageUrl];
    updatedImageUrls.splice(index, 1); // Видалити зображення з масиву за допомогою індексу
    setImageUrl(updatedImageUrls);
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true)

      const fields = {
        title,
        imageUrl,
        tags,
        text,
      }

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`)
    } catch (err) {
      console.worn(err);
      alert('Помилка при створенні статті')
    }
  }

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags);
        })
    }
  }, [])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />

      {imageUrl.map((obj, index) => (
        <div key={index}>
          <Button variant="contained" color="error" onClick={() => onClickRemoveImage(index)}>
            Удалить
          </Button>
          <img className={obj} src={`http://localhost:4444${obj}`} alt="Uploaded" />
        </div>
      ))}


      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="теги"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Зберегти' : 'Опублікувати'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
