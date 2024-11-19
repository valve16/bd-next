import Navbar from "@/app/components/Navbar";
import gstyles from "../main_student/Main.module.css"
import SheduleElement from "@/app/components/ElementShedule";
import sheduleDataProps from "@/public/shedule.json"
import { Day } from "@/public/types";
import styles from "./Page_shedule.module.css"

export default function page_shedule() {
    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>
                <div className={styles.ad}> См в ТГ </div>
                <div className={styles.day_container}>
                    {sheduleDataProps.map((day: Day, index) => (
                        <SheduleElement key={index} day={day} />
                    ))}
                </div>
            </div>
        </>
    )
}