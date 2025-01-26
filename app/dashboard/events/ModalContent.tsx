import React from "react";
import styles from "./Modal.module.css";

interface Group {
    id: number;
    name: string;
}

interface Event {
    id: number | null;
    date: string;
    time: string;
    description: string;
    groupIds: number[];
}

interface ModalContentProps {
    editingEvent: Event | null;
    newEvent: Event;
    setNewEvent: (event: Event) => void;
    handleAddEvent: () => void;
    closeModal: () => void;
    groups: Group[]; // Добавляем группы для выбора
}

const ModalContent: React.FC<ModalContentProps> = ({
    editingEvent,
    newEvent,
    setNewEvent,
    handleAddEvent,
    closeModal,
    groups,
}) => {
    const handleGroupChange = (groupId: number) => {
        const updatedGroupIds = newEvent.groupIds.includes(groupId)
            ? newEvent.groupIds.filter(id => id !== groupId) // Убираем группу, если она уже выбрана
            : [...newEvent.groupIds, groupId]; // Добавляем группу, если она не выбрана

        setNewEvent({ ...newEvent, groupIds: updatedGroupIds });
    };

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
                    <textarea
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Описание"
                    ></textarea>

                    <div>
                        <h3>Выберите группы:</h3>
                        {groups.map((group) => (
                            <label key={group.id}>
                                <input
                                    type="checkbox"
                                    checked={newEvent.groupIds.includes(group.id)}
                                    onChange={() => handleGroupChange(group.id)}
                                />
                                {group.name}
                            </label>
                        ))}
                    </div>

                    <button onClick={handleAddEvent}>{editingEvent ? "Сохранить" : "Добавить"}</button>
                    <button onClick={closeModal}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default ModalContent;