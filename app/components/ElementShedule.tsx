import styles from "./ElementShedule.module.css"
import { Day } from "@/public/types";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

interface SheduleElementProps {
    day: Day;
    onDelete: () => void;
}

export default function SheduleElement({ day,  onDelete }: SheduleElementProps) {
    return (
        <div className={styles.container}>
            <div className={styles.edit_container}>
                <FaEdit className={styles.edit_element}/>
                <FaRegTrashAlt className={styles.edit_element} onClick={onDelete}/>
            </div>
            <div className={styles.day_sect}>
                {day.day}
            </div>
            {day.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className={styles.shd_sect}>
                    <div className={styles.time}>
                        {lesson.startTime} - {lesson.endTime}
                    </div>
                    <div className={styles.name_lesson}>
                        {lesson.name}
                    </div>
                </div>
            ))}
        </div>
    );
}