import { groupBy, mapValues, forEach, map, filter, find } from 'lodash';

interface IItems {
    subjects: any;
    activities: any[];
}

export const filterSubjectsByType = (studentData: any) => {
    const { planner, semester, program, activities } = studentData;
    const subjectsBySemester = filter( program.subjects, ['semester', semester])
    const subjects = mapValues(
        groupBy( subjectsBySemester, 'type'), ( list ) => map(list, (item) => item)
    );
    return enableSelectedGroups( { subjects,  activities }, planner );
}

const enableSelectedGroups = (items: any, planner: any) => {
    const enabledItems: IItems = {subjects: {}, activities: []};
    forEach( items.subjects, ( type, key ) => {
        enabledItems.subjects[key] = map( type, ( subject ) => {
            forEach(subject.groups, (group) => {
                const foundGroup =  find(planner.groups, (pGroup) => pGroup.id === group.id);
                group['isSelected'] = !!foundGroup;
            })
            return subject;
        } )
    } )
    enabledItems.activities = map(items.activities, (activity) => {
        const foundActivity = find(planner.activities, (pActivity) => pActivity.id === activity.id);
        activity['isSelected'] = !!foundActivity;
        return activity;
    })
    return enabledItems;
}
