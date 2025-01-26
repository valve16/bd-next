import styles from "./ElementShedule.module.css"
import { Schedule } from "@/public/types";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

interface SheduleElementProps {
    day: Schedule;
    onDelete: () => void;
    onEdit: () => void;
}

const getDayOfWeek = (dayNumber: number): string => {
    const days = ["-", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    return days[dayNumber] || "Неизвестный день";
};

export default function SheduleElement({
    day,
    onDelete,
    onEdit
}: SheduleElementProps) {
    return (
        <div className={styles.container}>
            <div className={styles.edit_container}>
                <FaEdit className={styles.edit_element} onClick={onEdit} />
                <FaRegTrashAlt className={styles.edit_element} onClick={onDelete} />
            </div>
            <div className={styles.day_sect}>
            {   getDayOfWeek(day.dayOfWeek)}
            </div>
            {day.lessons.map((lesson, index) => (
                <div key={index} className={styles.shd_sect}>
                    <div className={styles.time}>
                        {lesson.startTime} - {lesson.endTime}
                    </div>
                    <div className={styles.name_lesson}>
                        {lesson.lessonName}
                    </div>
                </div>
            ))}
        </div>
    );
}