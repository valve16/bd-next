"use client"
import Navbar from "@/app/components/Navbar";
import gstyles from "../main_student/Main.module.css"
import SheduleElement from "@/app/components/ElementShedule";
import sheduleDataProps from "@/public/shedule.json"
import { Day, Lesson } from "@/public/types";
import styles from "./Page_shedule.module.css";
import { FaBookMedical, FaWindowClose } from "react-icons/fa";
import { useState } from "react";

export default function page_shedule() {
    const [schedule, setSchedule] = useState<Day[]>(sheduleDataProps);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDay, setNewDay] = useState("");
    const [newLessons, setNewLessons] = useState<Lesson[]>([]);
    const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);

    const openModal = (index: number | null = null) => {
        setCurrentDayIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentDayIndex(null);
        setNewDay("");
        setNewLessons([]);
        setIsModalOpen(false);
    };

    const handleAddLesson = () => {
        setNewLessons([...newLessons, { id: Date.now(), startTime: "", endTime: "", name: "" }]);
    };

    const handleLessonChange = <T extends keyof Lesson>(index: number, field: T, value: Lesson[T]) => {
        const updatedLessons = [...newLessons];
        updatedLessons[index][field] = value;
        setNewLessons(updatedLessons);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Filter out lessons with empty fields
        const filteredLessons = newLessons.filter(lesson =>
            lesson.startTime.trim() !== "" &&
            lesson.endTime.trim() !== "" &&
            lesson.name.trim() !== ""
        );

        // Check if there are any valid lessons and the day is not empty
        if (filteredLessons.length > 0 && newDay.trim() !== "") {
            const newScheduleItem = {
                id: Date.now(),
                day: newDay,
                lessons: filteredLessons
            };

            setSchedule([...schedule, newScheduleItem]);
            closeModal();
        } else {
            alert("Please fill in all fields for at least one lesson and the day.");
        }
    };

    const deleteLesson = (index: number) => {
        const updatedLessons = [...newLessons];
        updatedLessons.splice(index, 1);
        setNewLessons(updatedLessons);
    };

    const handleDeleteDay = (id: number) => {
        const newSchedule = schedule.filter(day => day.id !== id);
        setSchedule(newSchedule);
    };


    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>
                <FaBookMedical className={gstyles.create_btn} onClick={() => openModal()} />
                <div className={styles.ad}> См в ТГ </div>
                <div className={styles.day_container}>
                    {schedule.map((day: Day) => (
                        <SheduleElement key={day.id} day={day} onDelete={() => handleDeleteDay(day.id)} />
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <FaWindowClose className={styles.close} onClick={closeModal} />
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
                                                value={lesson.name}
                                                onChange={(e) => handleLessonChange(index, 'name', e.target.value)}

                                            />
                                        </label>
                                    </div>
                                    <FaWindowClose className={styles.del_less} onClick={() => deleteLesson(index)}/>
                                </div>
                            ))}
                            <button type="submit">Добавить</button>
                            <button type="button" onClick={handleAddLesson}>Добавить занятие</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}