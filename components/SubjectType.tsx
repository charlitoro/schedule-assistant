import React from 'react';
import {
    ListItem, ListItemIcon,
    ListItemText, Icon,
    Collapse, List,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        nested: {
            paddingLeft: theme.spacing(4),
        }
    }),
);

export const AcademicList = ( { listName, icon }: any ) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <Icon style={{ color:"#FFFFFF" }}>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={listName} style={{color: "#FFFFFF"}}/>
                {open ? <Icon style={{color: "#FFFFFF"}}>expand_less</Icon> : <Icon style={{color: "#FFFFFF"}}>expand_more</Icon>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <Icon style={{color: "#FFFFFF"}}>star_border</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Starred" style={{color: "#FFFFFF"}}/>
                    </ListItem>
                </List>
            </Collapse>
        </div>
    )
}
