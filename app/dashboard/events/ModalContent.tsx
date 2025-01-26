import React from "react";
import styles from "./Modal.module.css";
import { Dispatch, SetStateAction } from "react";

interface Group {
    id: number;
    name: string;
}

interface Event {
    id: number;
    date: string;
    time: string;
    name: string;
    description: string;
}

interface ModalContentProps {
    editingEvent: Event | null;
    newEvent: Event;
    setNewEvent: Dispatch<SetStateAction<Event>>; // Обновляем тип setNewEvent
    handleAddEvent: () => void;
    closeModal: () => void;
    groups: Group[];
}

const ModalContent: React.FC<ModalContentProps> = ({
    editingEvent,
    newEvent,
    setNewEvent,
    handleAddEvent,
    closeModal,
    groups,
}) => {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
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
                    <input
                        type="text"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        placeholder="Название мероприятия"
                    />
                    <textarea
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Описание"
                    ></textarea>

                    <button onClick={handleAddEvent}>{editingEvent ? "Сохранить" : "Добавить"}</button>
                    <button onClick={closeModal}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default ModalContent;