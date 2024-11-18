import Image from 'next/image'
import Link from 'next/link'
import  main_img   from  '../public/main_cut.png'
import logo_img from '../public/secret_logo.png'
import styles from "./page.module.css"


const Main = () => {
    return (
      <div className={styles.fullscreen_container}>
        {/* <h1>Main</h1> */}
        <Image src={main_img} alt="Main" className={styles.fullscreen_image}/>
        <Image src={logo_img} alt="Logo" className={styles.logo_image}/>
        <Link href="/login">
          <button type="submit" className={styles.main_btn}>Войти</button>
        </Link>
        <div className={styles.text_container}>
          <div className={styles.text}>Театр танца СЕКРЕТ</div>
        </div>
      </div>
    )
  }
  
  export default Main