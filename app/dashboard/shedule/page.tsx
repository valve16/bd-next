"use client"
import Navbar from "@/app/components/Navbar";
import gstyles from "../main_student/Main.module.css"
import SheduleElement from "@/app/components/ElementShedule";
import sheduleDataProps from "@/public/shedule.json"
import { Lesson, Schedule, Group } from "@/public/types";
import styles from "./Page_shedule.module.css";
import { FaBookMedical, FaWindowClose } from "react-icons/fa";
import { useEffect, useState } from "react";
import groupSchedulesData from "@/public/groupshedule.json";
import ModalContent from "./modal";

export default function page_shedule() {
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDay, setNewDay] = useState("");
    const [newLessons, setNewLessons] = useState<Lesson[]>([]);
    const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);
    const [userRole, setUserRole] = useState<number>(0);
    const [editingDay, setEditingDay] = useState<Schedule | null>(null);
    
    const [groupSchedules, setGroupSchedules] = useState<Group[]>(groupSchedulesData);

    const openModal = (day: Schedule | null = null) => {
        if (userRole === 1) {
            if (day) {
                setEditingDay(day);
                setNewDay(day.dayOfWeek.toString()); // Преобразуем число в строку
                setNewLessons(day.lessons);
            } else {
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
        setNewLessons([...newLessons, { id: Date.now(), startTime: "", endTime: "", lessonName: "" }]);
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
                lesson.lessonName.trim() !== ""
        );

        if (filteredLessons.length > 0 && newDay.trim() !== "" && selectedGroup) {
            const newScheduleItem: Schedule = {
                id: editingDay ? editingDay.id : Date.now(),
                dayOfWeek: parseInt(newDay, 10),
                lessons: filteredLessons,
            };

            setGroupSchedules((prevGroupSchedules) =>
                prevGroupSchedules.map((group) =>
                    group.id === parseInt(selectedGroup, 10)
                        ? {
                            ...group,
                            schedule: editingDay
                                ? group.schedules.map((day) =>
                                    day.id === editingDay.id ? newScheduleItem : day
                                )
                                : [...group.schedules, newScheduleItem],
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
                group.id === parseInt(selectedGroup, 10)
                    ? {
                        ...group,
                        schedule: group.schedules.filter((day) => day.id !== id),
                    }
                    : group
            )
        );
    };

    const selectedGroupSchedule =
        groupSchedules.find((group) => group.id === parseInt(selectedGroup, 10))?.schedules || [];

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
                            <option key={group.id} value={group.id.toString()}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                )}

                <div className={styles.day_container}>
                    {selectedGroupSchedule.map((day: Schedule) => (
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
                <ModalContent
                    editingDay={editingDay}
                    newDay={newDay}
                    newLessons={newLessons}
                    setNewDay={setNewDay}
                    setNewLessons={setNewLessons}
                    handleAddLesson={handleAddLesson}
                    handleLessonChange={handleLessonChange}
                    deleteLesson={deleteLesson}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            )}
        </>
    )
}