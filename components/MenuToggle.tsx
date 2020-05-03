import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, Divider, List, ListSubheader, Icon } from '@material-ui/core';
import { AcademicList } from './SubjectType';
import UserCard from './UserCard';
import { ENUM_SUBJECT_TYPE } from '../utils/constants';
import { filterSubjectsByType } from '../utils/filterSubjects';

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
    return (
        <div>
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
                    ENUM_SUBJECT_TYPE.map((type) => {
                        return (
                            <List key={type.name}> <AcademicList listName={type.name} icon={type.icon}  /> </List>
                        )
                    })
                }
                <List > <AcademicList listName="Activities" icon="event_available"/> </List>
            </Drawer>
        </div>
    )
}

export default MenuToggle;
