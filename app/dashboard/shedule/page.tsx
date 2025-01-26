"use client"
import Navbar from "@/app/components/Navbar";
import gstyles from "../main_student/Main.module.css"
import SheduleElement from "@/app/components/ElementShedule";
import sheduleDataProps from "@/public/shedule.json"
import { Day, Lesson, GroupSchedule } from "@/public/types";
import styles from "./Page_shedule.module.css";
import { FaBookMedical, FaWindowClose } from "react-icons/fa";
import { useEffect, useState } from "react";
import groupSchedulesData from "@/public/groupshedule.json";

export default function page_shedule() {
    const [schedule, setSchedule] = useState<Day[]>(sheduleDataProps);
    const [selectedGroup, setSelectedGroup] = useState<string>(""); // Хранит выбранную группу
    const [groupSchedules, setGroupSchedules] = useState<GroupSchedule[]>(groupSchedulesData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDay, setNewDay] = useState("");
    const [newLessons, setNewLessons] = useState<Lesson[]>([]);
    const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);
    const [userRole, setUserRole] = useState<number>(0);
    const [editingDay, setEditingDay] = useState<Day | null>(null); 

    const openModal = (day: Day | null = null) => {
        if (userRole === 1) {
            if (day) {
                // Если передан день, открываем модальное окно для редактирования
                setEditingDay(day);
                setNewDay(day.day);
                setNewLessons(day.lessons);
            } else {
                // Иначе открываем для добавления нового дня
                setEditingDay(null);
                setNewDay("");
                setNewLessons([]);
            }
            setIsModalOpen(true);
        } else {
            alert("У вас нет доступа для добавления или редактирования дня.");
        }
    };

    const closeModal = () => {
        setCurrentDayIndex(null);
        setNewDay("");
        setNewLessons([]);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role) {
          setUserRole(parseInt(role, 10));
        }
      }, []);

    useEffect(() => {
        if (userRole === 0) {
            setSelectedGroup('1'); 
        }
    }, [userRole]);

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
        const filteredLessons = newLessons.filter(
            (lesson) =>
                lesson.startTime.trim() !== "" &&
                lesson.endTime.trim() !== "" &&
                lesson.name.trim() !== ""
        );

        if (filteredLessons.length > 0 && newDay.trim() !== "" && selectedGroup) {
            const newScheduleItem: Day = {
                id: editingDay ? editingDay.id : Date.now(), // Если редактируем, сохраняем старый ID
                day: newDay,
                lessons: filteredLessons,
            };

            setGroupSchedules((prevGroupSchedules) =>
                prevGroupSchedules.map((group) =>
                    group.groupId === selectedGroup
                        ? {
                            ...group,
                            schedule: editingDay
                                ? group.schedule.map((day) =>
                                    day.id === editingDay.id ? newScheduleItem : day
                                )
                                : [...group.schedule, newScheduleItem],
                        }
                        : group
                )
            );
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
        setGroupSchedules((prevGroupSchedules) =>
            prevGroupSchedules.map((group) =>
                group.groupId === selectedGroup
                    ? {
                        ...group,
                        schedule: group.schedule.filter((day) => day.id !== id),
                    }
                    : group
            )
        );
    };

    const selectedGroupSchedule =
        groupSchedules.find((group) => group.groupId === selectedGroup)?.schedule || [];

    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>
                {userRole === 1 && (
                    <FaBookMedical className={gstyles.create_btn} onClick={() => openModal()} />
                )}
                <div className={styles.ad}> См в ТГ </div>

                {userRole === 1 && (
                    <select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        className={styles.group_selector}
                    >
                        <option value="">Выберите группу</option>
                        {groupSchedules.map((group) => (
                            <option key={group.groupId} value={group.groupId}>
                                {group.groupName}
                            </option>
                        ))}
                    </select>
                )}

                <div className={styles.day_container}>
                    {selectedGroupSchedule.map((day: Day) => (
                        <SheduleElement
                            key={day.id}
                            day={day}
                            onDelete={() => userRole === 1 && handleDeleteDay(day.id)}
                            onEdit={() => userRole === 1 && openModal(day)}
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && userRole === 1 && (
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
                                                value={lesson.name}
                                                onChange={(e) => handleLessonChange(index, 'name', e.target.value)}

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
            )}
        </>
    )
}