"use client";
import Navbar from "@/app/components/Navbar";
import gstyles from "./Main.module.css"
import Image from "next/image";
import d1 from '@/public/main_cut.png'
import styles from "./Profile.module.css"
import { FaStar } from "react-icons/fa";
import { GiPodium } from "react-icons/gi";

export default function Main_student() {
    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>
                <div className={styles.container}>
                    <div className={styles.profile}>
                        <Image src={d1} alt="d1" className={styles.profile_photo} />
                        <div className={styles.profile_info}>
                            <p className={styles.profile_name}>Иван Иванов</p>
                            <hr className={styles.hr}></hr>
                            <p className={styles.profile_group}>Группа 666</p>
                        </div>
                    </div>
                    <div className={styles.ltime}>
                        <span className={styles.ltime_bold}>Ты ходишь в Секрет уже:</span> 0 лет 0 мес 0 дней!
                    </div>
                    <div className={styles.rating_cont}>
                        <div className={styles.score_section}>
                            <p>Баллы <FaStar /></p>
                            <div className={`${styles.num_sc_section} ${styles.wocolor_cont}`}>000</div>
                        </div>
                        <div className={styles.rating_section}>
                            <p>Рейтинг <GiPodium /></p>
                            <div className={`${styles.num_rt_section} ${styles.wocolor_cont}`} >№ 0</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}