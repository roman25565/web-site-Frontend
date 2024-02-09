import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Роман',
      email: 'test2@test.ua',
      password: '12345'
    },
    mode: 'onChange'
  })

  const onSubmit = (values) => {
      
    const data = dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Не вдалося зареєструватись')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      alert('Не вдалося зареєструватись')
    }
  }


  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення акаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          type="fullName"
          {...register('fullName', { required: 'Вкажіть повне імя' })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Вкажіть почту' })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Вкажіть пароль' })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зареєструватися
        </Button>
      </form>
    </Paper>
  );
};
