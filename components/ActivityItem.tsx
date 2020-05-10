import {
    Checkbox,
    Collapse,
    Icon, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import {findIndex, map, truncate} from "lodash";
import {Info} from "@material-ui/icons";
import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        subItem: {
            paddingLeft: theme.spacing(4),
        }
    }),
);

const ActivityItem = ( {activities}: any ) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [open, setOpen] = React.useState(true);

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

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <Icon style={{ color:"#FFFFFF" }}>event_available</Icon>
                </ListItemIcon>
                <ListItemText primary='Activities' style={{color: "#FFFFFF"}}/>
                {open ? <Icon style={{color: "#FFFFFF"}}>expand_less</Icon> : <Icon style={{color: "#FFFFFF"}}>expand_more</Icon>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        map( activities, (activity: any ) => {
                            const labelId = `checkbox-${activity.id}`;
                            return (
                                <ListItem key={activity.id} role={undefined} dense className={classes.subItem} onClick={handleToggle(activity)}>
                                    <ListItemIcon>
                                        <Icon style={{color: activity.color, }}>lens</Icon>
                                    </ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={ findIndex( checked, (obj: any) => obj.id === activity.id  ) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                    <ListItemText primary={truncate(activity.name, {'length': 26, 'separator': ' '})} style={{color: "#FFFFFF"}}/>
                                    <IconButton edge="end" aria-label="comments" size="small">
                                        <Info fontSize="small" style={{color: "#FFFFFF"}}/>
                                    </IconButton>
                                </ListItem>
                            )
                        } )
                    }
                </List>
            </Collapse>
        </div>
    )
}

export default ActivityItem;
