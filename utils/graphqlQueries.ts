import { gql } from "apollo-boost";
import {map, pick, template} from 'lodash';

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
                teacher { code name }
                classroom{ code name }
                schedules{ start end day label }
            }
        }
    }
    planner{
        id name description
        activities{
            id description
            schedules{
                start end day label
            }
        }
        groups{
            id name type
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
