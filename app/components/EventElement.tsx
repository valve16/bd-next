import styles from "./EventElement.module.css"
import { Event } from "@/public/types";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

interface EventElementProps {
    event: Event;
    index: number;
    onDelete: () => void;
}

const backgroundColors = ["rgba(255, 233, 207, 1)", "rgba(255, 215, 215, 1)", "rgba(251, 255, 202, 1)"]; // Пример цветов
const dayColors = ["rgba(255, 207, 104, 1)", "rgba(250, 113, 113, 1)", "rgba(240, 255, 122, 1)"]; // Пример цветов

export default function EventElement({ event, index, onDelete }: EventElementProps) {
    const backgroundColor = backgroundColors[index % backgroundColors.length];
    const dayColor = dayColors[index % dayColors.length];
    return (
        <div className={styles.container} style={{ backgroundColor }}>
            <div className={styles.edit_container}>
                <FaEdit className={styles.edit_element} />
                <FaRegTrashAlt className={styles.edit_element} onClick={onDelete} />
            </div>
            <div className={styles.day_sect} style={{  backgroundColor: dayColor }} >
                <div>
                    {event.date}
                </div>
                <div>
                    {event.time}
                </div>
            </div>
            <div className={styles.descr_sect}>
                <div className="">
                    {event.description}
                </div>
            </div>
        </div>
    );
}