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
  
  // Группа
export interface Group {
    id: number; 
    name: string; 
    schedules: Schedule[]; 
  }
  // Расписание на день
  export interface Schedule  {
    id: number; 
    dayOfWeek: number; 
    lessons: Lesson[]; 
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

export interface EventsData {
    groups: GroupEvent[]; 
}

export interface GroupEvent {
    id: number; 
    name: string; 
    events: Event[]; //eventIds замени на events
}

export interface Event {
    id: number; 
    date: string; 
    time: string; 
    name: string;
    description: string; 
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