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
    isSelected?: boolean;
}

export interface ISubject {
    code: string;
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

// export interface IPlannerItem {
//     id: string;
//     color:
// }

export interface IProgram {
    code: string;
    name: string;
    subjects: ISubject[];
}

export interface IPlanner {
    id: string;
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
