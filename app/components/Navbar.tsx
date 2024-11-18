"use client";
import Link from 'next/link'
import styles from './Navbar.module.css'
import gstyles from '../page.module.css'
import logo_img from '../../public/secret_logo_sm.png'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

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
          <Link href='/dashboard/main_student' className={styles.path_element}>Моя страница</Link>
          <Link href='/dashboard/shedule'  className={styles.path_element}>Расписание</Link>
          <Link href='/dashboard/events'  className={styles.path_element}>Мероприятия</Link>
          <Link href='/dashboard/video'  className={styles.path_element}>Видео</Link>
          <Link href='/dashboard/music'  className={styles.path_element}>Музыка</Link>
        </nav>
      </div>
    </>
  )
}

export default Navbar