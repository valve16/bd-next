"use client";
// import useAuth from '../hooks/useAuth';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Login = () => {
//   const { setAuth } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const from = location.state?.from?.pathname || '/'

//   return (
//     <>
//       <div>Login</div>
//       <button type={'button'} onClick={() => {
//         setAuth(true)
//         navigate(from, { replace: true });
//       }}>Login</button>
//     </>
//   )
// }

// export default Login

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import logo_img from '../../public/secret_logo.png'
import d1 from '../../public/d1.png'
import d2 from '../../public/Gimnastka.png'
import d3 from '../../public/d2.png'
import Image from 'next/image';
import styles from './Login.module.css'
import Link from 'next/link';

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Загружаем данные пользователей из JSON-файла
      const res = await fetch("/users.json");
      const users = await res.json();

      // Ищем пользователя с совпадающим логином и паролем
      const user = users.find(
        (u: { login: string; password: string }) =>
          u.login === login && u.password === password
      );

      if (user) {
        // Если пользователь найден, перенаправляем на dashboard
        router.push("./dashboard/main_student");
      } else {
        // Если пользователь не найден, выводим сообщение об ошибке
        setError("Неверный логин или пароль");
      }
    } catch (err) {
      console.error("Ошибка при загрузке данных пользователей:", err);
      setError("Произошла ошибка. Попробуйте позже.");
    }
  };

  return (
    <div className={styles.login_page}>
      <Link href="/" >
        <Image src={logo_img} alt="Logo" className={styles.logo_image} />
      </Link>
      <div className={styles.left_container}>
        <div className={styles.text_about}>
          <div>Этот сайт создан для того, чтобы:</div>
          <li>усвоить программу обучения</li>
          <li>следить за своей успеваемостью</li>
          <li>быть в курсе всех событий</li>
        </div>
        <div className={styles.dance_image_section}>
          <Image src={d1} alt="d1" className={styles.dance__element}/>
          <Image src={d2} alt="d2" className={styles.dance__element}/>
          <Image src={d3} alt="d3" className={styles.dance__element}/>
        </div>
      </div>
      <div className={styles.right_container}>
        <div className={styles.login_container}>
          <h2 className={styles.login__main_text}>Вход в личный кабинет</h2>
          <form onSubmit={handleSubmit} className={styles.login_form}>
            <div className={styles.input_group}>
              <label htmlFor="login">Логин:</label>
              <input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.login_btn}>Войти</button>
            <div className={styles.text_link}>
              <Link href="/" >
                <p>Забыли пароль?</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;