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