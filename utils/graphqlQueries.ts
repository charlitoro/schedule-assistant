import { gql } from "apollo-boost";
import {map, pick, compact,template} from 'lodash';
import {IActivity, IGroup} from "./interfaces";

export const queryGetTeachers = gql`
    query {
        teachers {
            id name program { code name }
        }
    }
`
const studentData = `
    id code name semester
    program{
        id code name
        subjects{
            id code semester type name color
            groups {
                id name type
                subject{ color }
                teacher { code name }
                classroom{ code name }
                schedules{ start end day label }
            }
        }
    }
    planner{
        id name description
        activities{
            id description name color
            schedules{
                start end day label
            }
        }
        groups{
            id name type
            subject{ color }
            teacher{ code name }
            classroom{ code name }
            schedules{
                start end day label
            }
        }
    }
    activities{
        id name description color isSelected
        schedules{
            start end day label
        }
    }
`

export const queryGetUser = gql`
    query getUserByCode($id: ID!){
        student(where:{id:$id}){
            ${studentData}
        }
    }
`;

export const queryGetSubjects = gql`
    query getSubjectsBySemester($semester: Int) {
        subjects(where:{semester: $semester}){
            code semester name type color
        }
    }
`;

export const mutationCreateSchedule = gql`
    mutation createSchedule(
        $start: String! $end: String! $day: Days! $label: String
    ) {
        createSchedule(data: {
            start:$start end:$end day:$day label:$label
        }) {
            id start end day label
        }
    }
`;

export const mutationCreateActivity = (schedules: any[]) => {
    const schedulesId = map(schedules, (schedule) => pick(schedule, 'id'));
    const text = `
        mutation createActivity( $description: String $color:String $name: String){
          createActivity(data:{
            description: $description color: $color name: $name 
            schedules: {connect: [<% map(schedules, function(schedule) { %>{id: "<%- schedule.id %>"} <% }); %>]}
          }){
            id description color name
            schedules{start end day label}
          }
        }
    `;
    const compiled = template(text, {'imports': { 'map': map }});
    const mutation =  compiled({'schedules': schedulesId})
    return gql`${ mutation }`;
}

export const mutationUpdateActivityStudent = gql`
    mutation updateActivityStudent($idStudent:ID! $idActivity:ID!){
        updateStudent(
            where:{id:$idStudent}
            data:{activities:{connect:{id:$idActivity}}}
        ){ ${studentData} }
    }
`

export const mutationUpdatePlanner = (keepPlanner: {groups: IGroup[], activities: IActivity[]}) => {
    const connectGroupsId = compact( map(keepPlanner.groups, (group) => {
        if ( group.isSelected ) { return pick(group, 'id') }
    }));
    const disconnectGroupsId = compact( map(keepPlanner.groups, (group) => {
        if ( !group.isSelected ) { return pick(group, 'id') }
    }));
    const connectActivitiesId = compact( map(keepPlanner.activities, (activity) => {
        if ( activity.isSelected ) { return pick(activity, 'id') }
    }));
    const disconnectActivitiesId = compact( map(keepPlanner.activities, (activity) => {
        if ( !activity.isSelected ) { return pick(activity, 'id') }
    }));
    const text = `
        mutation updatePlanner($id:ID!){
          updatePlanner(
            where: {id:$id}
            data: {
              groups: {
                connect: [<% map(planner.groups.connect, function(group) { %>{id: "<%- group.id %>"} <% }); %>]
                disconnect: [<% map(planner.groups.disconnect, function(group) { %>{id: "<%- group.id %>"} <% }); %>]
              }
              activities: {
                connect: [<% map(planner.activities.connect, function(activity) { %>{id: "<%- activity.id %>"} <% }); %>]
                disconnect: [<% map(planner.activities.disconnect, function(activity) { %>{id: "<%- activity.id %>"} <% }); %>]
              }
            }
          ){
            id name description
            activities{
                id description name color
                schedules{
                    start end day label
                }
            }
            groups{
                id name type
                subject{ color }
                teacher{ code name }
                classroom{ code name }
                schedules{ start end day label }
            }
          }
        }
    `;
    const planner ={
        groups: { connect: connectGroupsId, disconnect: disconnectGroupsId },
        activities: { connect: connectActivitiesId, disconnect: disconnectActivitiesId }
    }
    const compiled = template(text, {'imports': { 'map': map }});
    const mutation =  compiled({'planner': planner })
    return gql`${ mutation }`;
}
