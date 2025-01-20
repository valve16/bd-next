"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import logo_img from '../../public/secret_logo.png';
import d1 from '../../public/d1.png';
import d2 from '../../public/Gimnastka.png';
import d3 from '../../public/d2.png';
import Image from 'next/image';
import styles from './Register.module.css';
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      // Загружаем данные пользователей из JSON-файла
      const res = await fetch("/users.json");
      const users = await res.json();

      // Проверяем, существует ли пользователь с таким же именем или email
      const userExists = users.some(
        (u: {email: string }) =>
             u.email === email
      );

      if (userExists) {
        setError("Пользователь с таким именем или email уже существует");
      } else {
        // Добавляем нового пользователя в список
        users.push({ username, email, password });
        // Сохраняем обновленный список пользователей
        await fetch("/users.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        });

        // Перенаправляем на dashboard
        router.push("./dashboard/main_student");
      }
    } catch (err) {
      console.error("Ошибка при регистрации пользователя:", err);
      setError("Произошла ошибка. Попробуйте позже.");
    }
  };

  return (
    <div className={styles.register_page}>
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
          <Image src={d1} alt="d1" className={styles.dance__element} />
          <Image src={d2} alt="d2" className={styles.dance__element} />
          <Image src={d3} alt="d3" className={styles.dance__element} />
        </div>
      </div>
      <div className={styles.right_container}>
        <div className={styles.register_container}>
          <h2 className={styles.register__main_text}>Регистрация нового пользователя</h2>
          <form onSubmit={handleSubmit} className={styles.register_form}>
          <div className={styles.input_group}>
              <label htmlFor="username">Имя пользователя:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="surname">Фамилия:</label>
              <input
                type="text"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className={styles.input_group}>
              <label htmlFor="confirmPassword">Подтвердите пароль:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.register_btn}>Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;