import React from 'react';
import {
    ListItem, ListItemIcon,
    ListItemText, Icon,
    Collapse, List, ListItemSecondaryAction, Checkbox, IconButton,
} from '@material-ui/core';
import {map, get, findIndex} from 'lodash';
import {Info} from "@material-ui/icons";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        item: {
            paddingLeft: theme.spacing(4),
        },
        subItem: {
            paddingLeft: theme.spacing(6),
        }
    }),
);

export const SubjectItem = ( { listName, icon, subjects }: any ) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [openItem, setOpenItem] = React.useState(true);
    const [checked, setChecked] = React.useState([]);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickItem = () => {
        setOpenItem(!openItem);
    };

    const handleToggle = (value: any) => () => {
        const currentIndex = findIndex( checked, (obj: any) => obj.id === value.id  );
        const newChecked = [...checked];
        if (currentIndex === -1) {
            // @ts-ignore
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
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
                {
                    map( subjects, (subject: any ) => {
                        return (
                            <List key={subject.code} component="div" disablePadding >
                                <ListItem button onClick={handleClickItem} className={classes.item}>
                                    <ListItemIcon>
                                        <Icon style={{color: subject.color, }}>lens</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={subject.name} style={{color: "#FFFFFF"}}/>
                                    <ListItemSecondaryAction>
                                        {openItem ? <Icon style={{color: "#FFFFFF"}}>expand_less</Icon> : <Icon style={{color: "#FFFFFF"}}>expand_more</Icon>}
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Collapse in={openItem} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            map( subject.groups, ( group ) => {
                                                const labelId = `checkbox-${group.id}`;
                                                return (
                                                    <ListItem key={group.id} role={undefined} dense className={classes.subItem} onClick={handleToggle(group)}>
                                                        <ListItemIcon>
                                                            <Checkbox
                                                                edge="start"
                                                                checked={ findIndex( checked, (obj: any) => obj.id === group.id  ) !== -1}
                                                                tabIndex={-1}
                                                                disableRipple
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText primary={group.name} secondary={group.type} style={{color: "#FFFFFF"}}/>
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end" aria-label="comments" size="small">
                                                                <Info fontSize="small" style={{color: "#FFFFFF"}}/>
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                )
                                            } )
                                        }
                                    </List>
                                </Collapse>
                            </List>
                        )
                    } )
                }
            </Collapse>
        </div>
    )
}
