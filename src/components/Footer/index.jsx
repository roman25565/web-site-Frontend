import React from 'react';
import './styles.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-column">
            <h4>О компании</h4>
            <ul>
              <li><a href="/">О нас</a></li>
              <li><a href="/">Контакты</a></li>
              <li><a href="/">Карьера</a></li>
              <li><a href="/">Партнерство</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Покупателям</h4>
            <ul>
              <li><a href="/">Как сделать заказ</a></li>
              <li><a href="/">Доставка и оплата</a></li>
              <li><a href="/">Возврат и гарантии</a></li>
              <li><a href="/">Отзывы покупателей</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Помощь</h4>
            <ul>
              <li><a href="/">FAQ</a></li>
              <li><a href="/">Поддержка</a></li>
              <li><a href="/">Условия использования</a></li>
              <li><a href="/">Политика конфиденциальности</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Your Store. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

