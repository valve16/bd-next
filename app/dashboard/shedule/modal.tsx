import React from "react";
import { FaWindowClose } from "react-icons/fa";
import styles from "./Page_shedule.module.css";
import { Lesson } from "@/public/types"; 


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
                        <input
                            className={styles.input}
                            type="text"
                            value={newDay}
                            onChange={(e) => setNewDay(e.target.value)}
                            required
                        />
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
                                        onChange={(e) => handleLessonChange(index, 'startTime', e.target.value)}
                                    />
                                </label>
                                <label className={styles.label}>
                                    Время окончания:
                                    <input
                                        className={styles.input_l}
                                        type="text"
                                        value={lesson.endTime}
                                        onChange={(e) => handleLessonChange(index, 'endTime', e.target.value)}
                                    />
                                </label>
                                <label className={styles.label}>
                                    Название занятия:
                                    <input
                                        className={styles.input_l}
                                        type="text"
                                        value={lesson.lessonName}
                                        onChange={(e) => handleLessonChange(index, 'lessonName', e.target.value)}
                                    />
                                </label>
                            </div>
                            <FaWindowClose className={styles.del_less} onClick={() => deleteLesson(index)} />
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