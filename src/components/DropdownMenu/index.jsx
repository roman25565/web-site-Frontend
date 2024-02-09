import React from 'react';
import { RiUserFill } from 'react-icons/ri';
import { FaGoogle } from 'react-icons/fa';
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import styles from './DropdownMenu.module.scss';

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch()
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Виконуємо логіку відправки даних на бекенд
    //const data = dispatch(fetchAuth({email: "test2@test.ua", password: '12345'}))

    onSubmit({email: email, password: password})
    // Очищуємо поля після відправки
    setEmail('');
    setPassword('');
  };

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      return alert('Не вдалося авторизуватись')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      alert('Не вдалося авторизуватись')
    }
  }

  return (
    <div className={styles.dropdownMenu}>
      <button className={styles.dropdownToggle} onClick={handleToggle}>
        <RiUserFill className={styles.dropdownIcon} />
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="ЕЛ. АДРЕСА"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="ПАРОЛЬ"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className={styles.loginButtons}>
              <button type="submit" className={styles.loginButton}>
                Увійти
              </button>
              {/* <div className={styles.loginOptions}>
                <a href="#">Чужий комп'ютер</a>
                <a href="#">Забули пароль?</a>
              </div> */}
              <div className={styles.loginDivider}>
              </div>
              <h4>Увійти за допомогою:</h4>
              <button className={styles.googleLogin}>
                <FaGoogle className={styles.googleIcon} />
              </button>
                <span>або</span>
              <div className={styles.quickRegister}>
                <a href="#">ШВИДКА РЕЄСТРАЦІЯ</a>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default DropdownMenu;