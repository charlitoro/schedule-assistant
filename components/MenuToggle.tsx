import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, Divider, List, Icon } from '@material-ui/core';
import { SubjectItem } from './SubjectType';
import UserCard from './UserCard';
import { map, find, isEmpty } from 'lodash';
import { ENUM_SUBJECT_TYPE } from '../utils/constants';
import { filterSubjectsByType } from '../utils/filterSubjects';
import ActivityItem from "./ActivityItem";

const drawerWidth = 335;
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

const MenuToggle = ({ handleClose, open, studentData, handleKeepPlanner}: any) => {
    const classes = useStyles();
    const [filteredItems, setFilteredItems] = React.useState<any>( filterSubjectsByType(studentData) );

    const handleSetSelectedItem = (item: any, type: string) => {
        if ( item ) {
            item.isSelected = !item.isSelected;
            if ( type === "GROUP") {

            }
        }
        const newItems = filteredItems;
    }
    return <div>
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
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
                        <List key={key}>
                            <SubjectItem
                                listName={key}
                                icon={type.icon}
                                subjects={subjectsType}
                                handleKeepPlanner={
                                    (item: any, type: string) => handleKeepPlanner(item, type)
                                }
                            />
                        </List>
                    )
                } )
            }
            {
                map( filteredItems, ( activities, key )  => {
                    if ( key === 'activities' && !isEmpty( activities ) ) {
                        return (
                            <List key="Custom">
                                <ActivityItem
                                    activities={activities}
                                    handleKeepPlanner={
                                        (item: any, type: string) => handleKeepPlanner(item, type)
                                    }
                                />
                            </List>
                        )
                    }
                } )
            }
        </Drawer>
    </div>
}

export default MenuToggle;
