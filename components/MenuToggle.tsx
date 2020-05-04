import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, Divider, List, ListSubheader, Icon } from '@material-ui/core';
import { AcademicList } from './SubjectType';
import UserCard from './UserCard';
import { concat, map, forEach, find, isEmpty } from 'lodash';
import { ENUM_SUBJECT_TYPE } from '../utils/constants';
import { filterSubjectsByType } from '../utils/filterSubjects';
import {act} from "react-dom/test-utils";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        background: theme.palette.primary.main,
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
}));

const MenuToggle = ({ handleClose, open, studentData}: any) => {
    const classes = useStyles();
    const filteredItems = filterSubjectsByType(studentData);
    return <div>
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            {/* TODO: create user card here */}
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleClose}>
                     <Icon style={{color:"#BDBDBD"}}>chevron_left</Icon>
                </IconButton>
            </div>
            <List>
                <UserCard user={{name: studentData.name, program: studentData.program.name, semester: studentData.semester}}/>
            </List>
            <Divider />
            {
                map( filteredItems.subjects, (subjectsType: any, key)  => {
                    const type: any = find(ENUM_SUBJECT_TYPE, (type) => type.name == key);
                    return (
                        <List key={key}> <AcademicList listName={key} icon={type.icon} activities={subjectsType} /> </List>
                    )
                } )
            }
            {
                map( filteredItems, ( activities, key )  => {
                    if ( key === 'activities' && !isEmpty( activities ) ) {
                        console.log( activities );
                        return <List key="Custom"> <AcademicList listName="Activities" icon="event_available" activities={activities}/> </List>
                    }
                } )
            }
        </Drawer>
    </div>
}

export default MenuToggle;
