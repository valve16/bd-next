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

export interface Events {
    events: Event[];
}

export interface Event {
    id: number;
    date: string;
    time: string;
    description: string;
}