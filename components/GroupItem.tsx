import {findIndex, map, truncate} from "lodash";
import {
    Checkbox,
    Collapse,
    Icon, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import {Info} from "@material-ui/icons";
import React from "react";
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

const GroupItem = ( {subject}: any) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
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
                    <Icon style={{color: subject.color,}}>lens</Icon>
                </ListItemIcon>
                <ListItemText
                    primary={truncate(subject.name, {'length': 26, 'separator': ' '})}
                    style={{color: "#FFFFFF"}}
                />
                {open ? <Icon style={{color: "#FFFFFF"}}>expand_less</Icon> :
                    <Icon style={{color: "#FFFFFF"}}>expand_more</Icon>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        map(subject.groups, (group) => {
                            const labelId = `checkbox-${group.id}`;
                            return (
                                <ListItem key={group.id} role={undefined} dense className={classes.subItem}
                                          onClick={handleToggle(group)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={findIndex(checked, (obj: any) => obj.id === group.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{'aria-labelledby': labelId}}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={group.name} secondary={group.type}
                                                  style={{color: "#FFFFFF"}}/>
                                    <IconButton edge="end" aria-label="comments" size="small">
                                        <Info fontSize="small" style={{color: "#FFFFFF"}}/>
                                    </IconButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Collapse>
        </List>
    )
}

export default GroupItem;
