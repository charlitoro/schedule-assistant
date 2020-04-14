import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { queryGetTeachers } from '../utils/graphqlQueries';
import CircularProgress from "@material-ui/core/CircularProgress";

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

export const Navigation = () => {
    const { data, error, loading } = useQuery(queryGetTeachers, {notifyOnNetworkStatusChange: true});
    let i = 0;
    if ( data && data.teachers) {
        return (
            <motion.ul variants={variants}>
                {data.teachers.map((teacher: any) => (
                    <MenuItem data={teacher} key={i++} />
                ))}
            </motion.ul>
        );
    }
    return (
        <div>
            <CircularProgress />
        </div>
    )
}
