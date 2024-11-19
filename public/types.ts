// types.ts
export interface Lesson {
    time: string;
    name: string;
}

export interface Day {
    day: string;
    lessons: Lesson[];
}