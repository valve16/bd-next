import styles from "./ElementShedule.module.css"
import { Day } from "@/public/types";

interface SheduleElementProps {
    day: Day;
}

export default function SheduleElement({ day }: SheduleElementProps) {
    return (
        <div className={styles.container}>
            <div className={styles.day_sect}>
                {day.day}
            </div>
            {day.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className={styles.shd_sect}>
                    <div className={styles.time}>
                        {lesson.time}
                    </div>
                    <div className={styles.name_lesson}>
                        {lesson.name}
                    </div>
                </div>
            ))}
        </div>
    );
}