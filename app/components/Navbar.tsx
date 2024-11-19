"use client";
import Link from 'next/link'
import styles from './Navbar.module.css'
import gstyles from '../page.module.css'
import logo_img from '../../public/secret_logo_sm.png'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaUser, FaRegCalendarCheck, FaVideo, FaMusic, FaRocket} from "react-icons/fa";

function Navbar() {

  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      '/dashboard/main_student': 'Моя страница',
      '/dashboard/shedule': 'Расписание',
      '/dashboard/events': 'Мероприятия',
      '/dashboard/video': 'Видео',
      '/dashboard/music': 'Музыка',
    };

    setPageTitle(pageTitles[pathname] || 'Неизвестная страница');
  }, [pathname]);


  return (
    <>
      <div className={styles.container}>
        <div className={gstyles.logo_image}>
          <Image src={logo_img} alt="Logo" className={styles.logo_image} />
          <p className={styles.logo_text}>{pageTitle}</p>
        </div>
        <nav className={styles.path_list}>
          <Link href='/dashboard/main_student' className={styles.path_element}>
            <FaUser className={styles.icon}/>Моя страница
          </Link>
          <Link href='/dashboard/shedule' className={styles.path_element}>
            <FaRegCalendarCheck className={styles.icon}/>Расписание
          </Link>
          <Link href='/dashboard/events' className={styles.path_element}>
            <FaRocket className={styles.icon}/>Мероприятия
          </Link>
          <Link href='/dashboard/video' className={styles.path_element}>
            <FaVideo className={styles.icon}/>Видео
          </Link>
          <Link href='/dashboard/music' className={styles.path_element}>
            <FaMusic className={styles.icon}/>Музыка
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Navbar