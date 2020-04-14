import { gql } from "apollo-boost";

export const queryGetTeachers = gql`
    query {
        teachers {
            id name program { code name }
        }
    }
`
