import React from "react";
import { FaWindowClose } from "react-icons/fa";
import styles from "./Page_shedule.module.css";
import { Lesson } from "@/public/types";


const daysOfWeek = [
    { id: 1, name: "Понедельник" },
    { id: 2, name: "Вторник" },
    { id: 3, name: "Среда" },
    { id: 4, name: "Четверг" },
    { id: 5, name: "Пятница" },
    { id: 6, name: "Суббота" },
    { id: 7, name: "Воскресенье" },
];

interface ModalContentProps {
    editingDay: { id: number; dayOfWeek: number; lessons: Lesson[] } | null;
    newDay: string;
    newLessons: Lesson[];
    setNewDay: (day: string) => void;
    setNewLessons: (lessons: Lesson[]) => void;
    handleAddLesson: () => void;
    handleLessonChange: <T extends keyof Lesson>(
        index: number,
        field: T,
        value: Lesson[T]
    ) => void;
    deleteLesson: (index: number) => void;
    handleSubmit: (e: React.FormEvent) => void;
    closeModal: () => void;
    //setEditState: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({
    editingDay,
    newDay,
    newLessons,
    setNewDay,
    setNewLessons,
    handleAddLesson,
    handleLessonChange,
    deleteLesson,
    handleSubmit,
    closeModal,
    //setEditState,
}) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <FaWindowClose className={styles.close} onClick={closeModal} />
                <h2>{editingDay ? "Редактировать день" : "Добавить новый день"}</h2>
                <h2>Добавить новый день</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        День недели:
                        <select
                            className={styles.input}
                            value={newDay}
                            onChange={(e) => setNewDay(e.target.value)}
                            required
                        >
                            <option value="">Выберите день</option>
                            {daysOfWeek.map((day) => (
                                <option key={day.id} value={day.id}>
                                    {day.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    {newLessons.map((lesson, index) => (
                        <div key={lesson.id} className={styles.lesson_container}>
                            <div className={styles.add_less}>
                                <label className={styles.label}>
                                    Время начала:
                                    <input
                                        className={styles.input_l}
                                        type="text"
                                        value={lesson.startTime}
                                        onChange={(e) =>
                                            handleLessonChange(index, "startTime", e.target.value)
                                        }
                                    />
                                </label>
                                <label className={styles.label}>
                                    Время окончания:
                                    <input
                                        className={styles.input_l}
                                        type="text"
                                        value={lesson.endTime}
                                        onChange={(e) =>
                                            handleLessonChange(index, "endTime", e.target.value)
                                        }
                                    />
                                </label>
                                <label className={styles.label}>
                                    Название занятия:
                                    <input
                                        className={styles.input_l}
                                        type="text"
                                        value={lesson.lessonName}
                                        onChange={(e) =>
                                            handleLessonChange(index, "lessonName", e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                            <FaWindowClose
                                className={styles.del_less}
                                onClick={() => deleteLesson(index)}
                            />
                        </div>
                    ))}
                    <button type="submit">{editingDay ? "Сохранить" : "Добавить"}</button>
                    <button type="button" onClick={handleAddLesson}>Добавить занятие</button>
                </form>
            </div>
        </div>
    );
};

export default ModalContent;