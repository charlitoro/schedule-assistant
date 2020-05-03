import {Icon, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
    }
}));

const UserCard = ({user}: any) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div>
            <ListItem onClick={handleClick} className={classes.root}>
                <ListItemIcon>
                    <Icon color="primary" style={{ fontSize: 40 }} >account_circle</Icon>
                </ListItemIcon>
                <ListItemText primary={user.name} secondary={user.program} style={{color: "#FFFFFF"}}/>
                <Icon style={{color: "#FFFFFF"}}>exit_to_app</Icon>
            </ListItem>
        </div>
    )
}

export default UserCard;
