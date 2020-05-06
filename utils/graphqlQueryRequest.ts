import { useQuery } from "@apollo/react-hooks";

export const executeQuery = (query: any, variables: any) => {
    return useQuery(query, {
        variables,
        notifyOnNetworkStatusChange: true
    });
}
