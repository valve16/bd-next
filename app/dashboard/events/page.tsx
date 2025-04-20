"use client";
import Navbar from "@/app/components/Navbar";
import gstyles from "../main_student/Main.module.css"
import styles from "./Events.module.css"
import eventsData from '@/public/groupevents.json'
import EventElement from "@/app/components/EventElement";
import { useEffect, useState } from "react";
import { FaBookMedical } from "react-icons/fa";
import Modal from "./Modal"
import { Event, EventsData, GroupEvent } from "@/public/types";
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

    const [eventsDataState, setEventsDataState] = useState<GroupEvent[]>(eventsData);
    const [selectedGroup, setSelectedGroup] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState<Event>({
        id: 0,
        date: "",
        time: "",
        name: "",
        description: "",
    });
    const [userRole, setUserRole] = useState<number | null>(null);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

 const openModal = (event: Event | null = null) => {
        if (userRole === 1) {
            if (event) {
                setEditingEvent(event);
                setNewEvent(event);
            } else {
                setEditingEvent(null);
                setNewEvent({ id: 0, date: "", time: "", name: "", description: "" });
            }
            setIsModalOpen(true);
        } else {
            alert("У вас нет доступа для добавления или редактирования мероприятий.");
        }
    };

    const closeModal = () => {
        setEditingEvent(null);
        setNewEvent({ id: 0, date: "", time: "", name: "", description: "" });
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
            const updatedGroups = eventsDataState.map(group => ({
                ...group,
                events: group.events.map(event =>
                    event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event
                ),
            }));
            setEventsDataState(updatedGroups);
        } else {
            const newEventWithId = { ...newEvent, id: Date.now() }; 
            const updatedGroups = eventsDataState.map(group => {
                if (group.id === selectedGroup) {
                    return { ...group, events: [...group.events, newEventWithId] };
                }
                return group;
            });
            setEventsDataState(updatedGroups);
            console.log(`Добавлено мероприятие с ID: ${newEventWithId.id}`);
        }
        closeModal();
    };

    const handleDelete = (eventId: number) => {
        const updatedGroups = eventsDataState.map(group => ({
            ...group,
            events: group.events.filter(event => event.id !== eventId),
        }));
        setEventsDataState(updatedGroups );
        console.log(`Удалено мероприятие с ID: ${eventId}`);
    };

    const defaultGroupId = eventsDataState[0]?.id || null;

    const currentGroupId = selectedGroup || defaultGroupId;

    const selectedEvents = eventsDataState.find(group => group.id === currentGroupId)?.events || [];

    return (
        <>
            <Navbar></Navbar>
            <div className={gstyles.container}>
                {userRole === 1 && (
                    <FaBookMedical className={gstyles.create_btn} onClick={() => openModal()} />
                )}
                <div className={styles.header}>Список ближайших мероприятий</div>
                {userRole === 1 && (
                    <select
                        value={selectedGroup || defaultGroupId || ""}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            if (selectedValue) {
                                setSelectedGroup(parseInt(selectedValue, 10));
                            } else {
                                setSelectedGroup(1); 
                            }
                        }}
                        className={styles.group_selector}>
                        <option value="">Выберите группу</option>
                        {eventsDataState.map((group) => (
                            <option key={group.id} value={group.id.toString()}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                )}
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
                {isModalOpen && userRole === 1 && (
                    <Modal>
                        <ModalContent
                            editingEvent={editingEvent}
                            newEvent={newEvent}
                            setNewEvent={setNewEvent}
                            handleAddEvent={handleAddEvent}
                            closeModal={closeModal}
                            groups={eventsDataState} 
                        />
                    </Modal>
                )}
            </div>
        </>
    )
}