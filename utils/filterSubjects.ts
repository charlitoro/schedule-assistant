import { groupBy, mapValues, omit, map, filter } from 'lodash';
import { ENUM_SUBJECT_TYPE } from './constants'

export const filterSubjectsByType = (studentData: any) => {
    const { code, name, semester, program, activities } = studentData;
    const subjectsBySemester = filter( program.subjects, ['semester', semester])
    const subjects = mapValues(
        groupBy( subjectsBySemester, 'type'), ( list ) => map(list, (car) => omit(car, 'type'))
    );
    return {
        subjects,
        activities,
    }
}
