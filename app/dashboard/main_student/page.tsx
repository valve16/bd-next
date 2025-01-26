"use client";
import Navbar from "@/app/components/Navbar";
import gstyles from "./Main.module.css"
import Image from "next/image";
import d1 from '@/public/main_cut.png'
import styles from "./Profile.module.css"
import { FaStar } from "react-icons/fa";
import { GiPodium } from "react-icons/gi";
import { StudentData } from "@/public/types";
import { useEffect, useState } from "react";
import data from '@/public/student_data.json'


export default function Main_student() {
    const [studentData, setStudentData] = useState<StudentData | null>(data);
    
    useEffect(() => {
        // Загрузка данных из JSON-файла
        const fetchData = async () => {
          try {
            const response = await fetch('/student_data.json');
            const data = await response.json();
            setStudentData(data);
          } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
          }
        };
    
        fetchData();
      }, []);

    // useEffect(() => {
    // const fetchData = async () => {
    //     try {
    //     const response = await fetch('/api/student'); // Запрос к API
    //     const data = await response.json();
    //     setStudentData(data);
    //     } catch (error) {
    //     console.error("Ошибка при загрузке данных:", error);
    //     }
    // };
    
    // fetchData();
    // }, []); 

    
    if (!studentData) {
    return <div>Ошибка загрузки данных</div>; // Если данные не загружены, показываем ошибку
    }
    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>
                <div className={styles.container}>
                    <div className={styles.profile}>
                        <Image src={d1} alt="d1" className={styles.profile_photo} />
                        <div className={styles.profile_info}>
                            <p className={styles.profile_name}>{studentData.name}</p>
                            <hr className={styles.hr}></hr>
                            <p className={styles.profile_group}>Группа {studentData.group}</p>
                        </div>
                    </div>
                    <div className={styles.ltime}>
                        <span className={styles.ltime_bold}>Ты ходишь в Секрет уже:</span> {" "}
                        {studentData.timeInSecret.years} лет {studentData.timeInSecret.months} мес {studentData.timeInSecret.days} дней!
                    </div>
                    <div className={styles.rating_cont}>
                        <div className={styles.score_section}>
                            <p>Баллы <FaStar /></p>
                            <div className={`${styles.num_sc_section} ${styles.wocolor_cont}`}>
                                {studentData.score.toString().padStart(3, '0')}
                                </div>
                        </div>
                        <div className={styles.rating_section}>
                            <p>Рейтинг <GiPodium /></p>
                            <div className={`${styles.num_rt_section} ${styles.wocolor_cont}`} >
                                № {studentData.rating}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}