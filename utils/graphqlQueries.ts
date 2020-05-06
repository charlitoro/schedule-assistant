import { gql } from "apollo-boost";

export const queryGetTeachers = gql`
    query {
        teachers {
            id name program { code name }
        }
    }
`
export const queryGetUser = gql`
    query getUserByCode($code: String!){
        student(where:{code:$code}){
            code name semester
            program{
                code name
                subjects{
                    code semester type name color
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
                    name type
                    teacher{ code name }
                    classroom{ code name }
                    schedules{
                        start end day label
                    }
                }
            }
            activities{
                id name description color
                schedules{
                    start end day label
                }
            }
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
