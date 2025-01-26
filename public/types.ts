// types.ts
export interface Lesson {
    id: number;
    startTime: string;
    endTime: string;
    name: string;
}


export interface Day {
    id: number;
    day: string;
    lessons: Lesson[];
}

export interface GroupSchedule {
    groupId: string;
    groupName: string; 
    schedule: Day[]; 
}

// export interface Events {
//     events: Event[];
// }

// export interface Event {
//     id: number;
//     date: string;
//     time: string;
//     description: string;
// }

export interface GroupEvent {
    id: number; // Уникальный идентификатор группы
    name: string; // Название группы
    eventIds: number[]; // Список идентификаторов мероприятий, связанных с этой группой
}

export interface Event {
    id: number; // Уникальный идентификатор мероприятия
    date: string; // Дата мероприятия
    time: string; // Время мероприятия
    description: string; // Описание мероприятия
    groupIds: number[]; // Список идентификаторов групп, для которых это мероприятие
}

export interface EventsData {
    groups: GroupEvent[]; // Список групп
    events: Event[]; // Список мероприятий
}