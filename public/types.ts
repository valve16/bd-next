// types.ts
// export interface Lesson {
//     id: number;
//     startTime: string;
//     endTime: string;
//     name: string;
// }


// export interface Day {
//     id: number;
//     day: string;
//     lessons: Lesson[];
// }

// export interface GroupSchedule {
//     groupId: string;
//     groupName: string; 
//     schedule: Day[]; 
// }
export type Groups = Group[];

export interface Lesson {
    id: number; 
    lessonName: string; 
    startTime: string; 
    endTime: string; 
  };
  
  // Расписание на день
  export interface Schedule  {
    id: number; 
    dayOfWeek: number; 
    lessons: Lesson[]; 
  }

  // Группа
export interface Group {
    id: number; 
    name: string; 
    schedules: Schedule[]; 
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
    name: string;
    description: string; // Описание мероприятия
    groupIds: number[]; // Список идентификаторов групп, для которых это мероприятие
}

export interface EventsData {
    groups: GroupEvent[]; // Список групп
    events: Event[]; // Список мероприятий
}

export interface StudentData {
    name: string;
    group: string;
    timeInSecret: {
      years: number;
      months: number;
      days: number;
    };
    score: number;
    rating: number;
  }