import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, Divider, List, ListSubheader, Icon } from '@material-ui/core';
import { AcademicList } from './SubjectType';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        background: "#291745",
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

const MenuToggle = ({ handleClose, open}: any) => {
    const classes = useStyles();
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
                <Divider />
                {/*TODO: Dynamic generation sections of list mapping data*/}
                <ListSubheader inset style={{color:"#BDBDBD"}}>Academic</ListSubheader>
                <List > <AcademicList listName="Curriculum" icon="subject"/> </List>
                <List > <AcademicList listName="Elective" icon="assignment_turned_in"/> </List>
                <List > <AcademicList listName="Humanistic" icon="people_icon"/> </List>
                <List > <AcademicList listName="Language" icon="language"/> </List>

                <ListSubheader inset style={{color:"#BDBDBD"}}>Personal</ListSubheader>
                <List > <AcademicList listName="Custom"/> </List>
            </Drawer>
        </div>
    )
}

export default MenuToggle;
