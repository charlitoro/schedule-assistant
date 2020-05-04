import {
    Collapse,
    FormControl,
    FormControlLabel, FormLabel,
    Icon, IconButton,
    List, Typography,
    ListItem,
    ListItemIcon, ListItemSecondaryAction,
    ListItemText, Radio, RadioGroup, Checkbox
} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {get, map, findIndex} from "lodash";
import { Info } from "@material-ui/icons";

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

const GroupItem = ( { subject }: any ) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [checked, setChecked] = React.useState([]);

    const handleClick = () => {
        setOpen(!open);
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
        <List component="div" disablePadding >
            <ListItem button onClick={handleClick} className={classes.item}>
                <ListItemIcon>
                    <Icon style={{color: subject.color, }}>lens</Icon>
                </ListItemIcon>
                <ListItemText primary={subject.name} style={{color: "#FFFFFF"}}/>
                <ListItemSecondaryAction>
                    {open ? <Icon style={{color: "#FFFFFF"}}>expand_less</Icon> : <Icon style={{color: "#FFFFFF"}}>expand_more</Icon>}
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
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
}

export default GroupItem;
