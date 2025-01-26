"use client";
import Navbar from "@/app/components/Navbar";
import gstyles from "../main_student/Main.module.css"
import styles from "./Events.module.css"
import eventsData from '@/public/events.json'
import EventElement from "@/app/components/EventElement";
import { useEffect, useState } from "react";
import { FaBookMedical } from "react-icons/fa";
import Modal from "./Modal"
import { Event } from "@/public/types";

// const fetchUserRole = async (userId: string) => {
//     try {
//         const response = await fetch(`/api/users/${userId}/role`);
//         const data = await response.json();
//         return data.role;
//     } catch (error) {
//         console.error("Ошибка при получении роли пользователя:", error);
//         return 1;
//     }
// };

export default function page_events() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ id: null, date: "", time: "", description: "" });

    const [userRole, setUserRole] = useState<number | null>(null);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null); 
    const [events, setEvents] = useState(eventsData.events);
    // useEffect(() => {
    //     const userId = "some-user-id"; // Замените на актуальный идентификатор пользователя
    //     fetchUserRole(userId).then(role => setUserRole(role));
    // }, []);
    //setUserRole(0);

    
    // const openModal = () => setIsModalOpen(true);
    // const closeModal = () => setIsModalOpen(false);
    
    const openModal = (event: Event | null = null) => {
        if (userRole === 1) {
            if (event) {
                // Если передано мероприятие, открываем модальное окно для редактирования
                setEditingEvent(event);
                setNewEvent({ id: event.id, date: event.date, time: event.time, description: event.description });
            } else {
                // Иначе открываем для добавления нового мероприятия
                setEditingEvent(null);
                setNewEvent({ id: null, date: "", time: "", description: "" });
            }
            setIsModalOpen(true);
        } else {
            alert("У вас нет доступа для добавления или редактирования мероприятий.");
        }
    };
    
    const closeModal = () => {
        setEditingEvent(null);
        setNewEvent({ id: null, date: "", time: "", description: "" });
        setIsModalOpen(false);
    };
    
    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role) {
          setUserRole(parseInt(role, 10));
        }
    }, []);
    
    const handleAddEvent = () => {
        if (editingEvent) {
            // Редактируем существующее мероприятие
            const updatedEvents = events.map(event =>
                event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event
            );
            setEvents(updatedEvents);
        } else {
            // Добавляем новое мероприятие
            const updatedEvents = [...events, { ...newEvent, id: events.length + 1 }];
            setEvents(updatedEvents);
        }
        setNewEvent({ id: null, date: "", time: "", description: "" });
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        // Фильтруем события, исключая удаленное
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
        console.log(`Удалить событие с ID: ${id}`);
    };

    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>
                {userRole === 1 && (
                    <FaBookMedical className={gstyles.create_btn} onClick={() => openModal()} />
                )}
                <div className={styles.header}>Список ближайших мероприятий</div>
                <div className={styles.container_main}>
                    {events.map((event, index) => (
                        <EventElement
                            key={event.id}
                            event={event}
                            index={index}
                            onDelete={() => userRole === 1 && handleDelete(event.id)}
                            onEdit={() => userRole === 1 && openModal(event)} 
                        />
                    ))}
                </div>
                {isModalOpen &&  userRole === 1 &&  (
                    <Modal>
                        <div className={styles.modal_content}>
                            <h2>{editingEvent ? "Редактировать мероприятие" : "Добавить новое мероприятие"}</h2>
                            <input
                                type="date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                placeholder="Дата"
                            />
                            <input
                                type="time"
                                value={newEvent.time}
                                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                placeholder="Время"
                            />
                            <textarea className={styles.textarea}
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                placeholder="Описание"
                            ></textarea>
                            <button onClick={handleAddEvent}>{editingEvent ? "Сохранить" : "Добавить"}</button>
                            <button onClick={closeModal}>Закрыть</button>
                        </div>
                    </Modal>
                )}
            </div>
        </>
    )
}