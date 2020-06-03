export interface ITeacher {
    code: string;
    name: string;
}

export interface IClassroom {
    code: string;
    name: string;
}

export interface ISchedule {
    start: string;
    end: string;
    day: string;
    label?: string;
}

export interface IGroup {
    id: string;
    name: string;
    type?: string;
    teacher?: ITeacher;
    classroom?: IClassroom;
    schedules?: ISchedule[];
    subject?: ISubject;
    isSelected?: boolean;
}

export interface ISubject {
    id?: string;
    code?: string;
    semester?: number;
    type?: string;
    name: string;
    color?: string;
    groups: IGroup[]
}

export interface IActivity {
    id: string;
    color?: string;
    description?: string;
    isSelected?: boolean;
    schedules?: ISchedule[];
}

export interface IProgram {
    code: string;
    name: string;
    subjects: ISubject[];
}

export interface IPlanner {
    id?: string;
    name?: string;
    description?: string;
    activities?: IActivity[];
    groups?: IGroup[];
}

export interface IStudent {
    id: String;
    code: string;
    name?: string;
    semester?: number;
    program?: IProgram;
    planner?: IPlanner;
    activities?: IActivity[];
}

export interface IHours {
    '07:00'?: any[];
    '08:00'?: any[];
    '09:00'?: any[];
    '10:00'?: any[];
    '11:00'?: any[];
    '12:00'?: any[];
    '13:00'?: any[];
    '14:00'?: any[];
    '15:00'?: any[];
    '16:00'?: any[];
    '17:00'?: any[];
    '18:00'?: any[];
    '19:00'?: any[];
    '20:00'?: any[];
}

export interface IDays {
    Monday?: IHours;
    Tuesday?: IHours;
    Wednesday?: IHours;
    Thursday?: IHours;
    Friday?: IHours;
    Saturday?: IHours
}
