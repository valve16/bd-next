"use client";
import Navbar from "@/app/components/Navbar";
import gstyles from "../main_student/Main.module.css"
import styles from "./Events.module.css"
import eventsData from '@/public/groupevents.json'
import EventElement from "@/app/components/EventElement";
import { useEffect, useState } from "react";
import { FaBookMedical } from "react-icons/fa";
import Modal from "./Modal"
import { Event, GroupEvent, EventsData } from "@/public/types";
import ModalContent from "./ModalContent";

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
    const [newEvent, setNewEvent] = useState<{ id: number | null; date: string; time: string; description: string; groupIds: number[]; name: string; }>({
        id: null,
        date: "",
        name: "",
        time: "",
        description: "",
        groupIds: [],
    });
    const [userRole, setUserRole] = useState<number | null>(null);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null); 
    const [events, setEvents] = useState(eventsData.events);
    const [eventsDataState, setEventsDataState] = useState<EventsData>(eventsData);
    
    const openModal = (event: Event | null = null) => {
        if (userRole === 1) {
            if (event) {
                setEditingEvent(event);
                setNewEvent({ id: event.id, date: event.date, name: event.name, time: event.time, description: event.description, groupIds: event.groupIds });
            } else {
                setEditingEvent(null);
                setNewEvent({ id: null, name: "", date: "", time: "", description: "", groupIds: [] });
            }
            setIsModalOpen(true);
        } else {
            alert("У вас нет доступа для добавления или редактирования мероприятий.");
        }
    };
    
    const closeModal = () => {
        setEditingEvent(null);
        setNewEvent({ id: null, name: "", date: "", time: "", description: "", groupIds: [] });
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
            const updatedEvents = eventsDataState.events.map(event =>
                event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event
            );
            setEventsDataState({ ...eventsDataState, events: updatedEvents });
        } else {
            // Добавляем новое мероприятие
            const newEventWithId = { ...newEvent, id: eventsDataState.events.length + 1 };
            setEventsDataState({ ...eventsDataState, events: [...eventsDataState.events, newEventWithId] });
        }
        setNewEvent({ id: null,  name: "", date: "", time: "", description: "", groupIds: [] });
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        const updatedEvents = eventsDataState.events.filter(event => event.id !== id);
        setEventsDataState({
            ...eventsDataState,
            events: updatedEvents,
        });
        setEvents(updatedEvents); // Обновляем локальное состояние, если оно используется
        console.log(`Удалено мероприятие с ID: ${id}`);
    };
    
    const selectedEvents = userRole === 0
        ? eventsDataState.events.filter(event => event.groupIds.includes(1)) 
        : eventsDataState.events; // Для роли 1 все мероприятия

    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>
                {userRole === 1 && (
                    <FaBookMedical className={gstyles.create_btn} onClick={() => openModal()} />
                )}
                <div className={styles.header}>Список ближайших мероприятий</div>
                <div className={styles.container_main}>
                    {selectedEvents.map((event, index) => (
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
                        <ModalContent
                            editingEvent={editingEvent}
                            newEvent={newEvent}
                            setNewEvent={setNewEvent}
                            handleAddEvent={handleAddEvent}
                            closeModal={closeModal}
                            groups={eventsDataState.groups} // Передаем группы в ModalContent
                        />
                    </Modal>
                )}
            </div>
        </>
    )
}