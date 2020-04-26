import {Icon, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import React from "react";

const UserCard = ({user}: any) => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div>
            <ListItem button onClick={handleClick} color="primary.light">
                <ListItemIcon>
                    <Icon color="secondary" style={{ fontSize: 40 }} >account_circle</Icon>
                </ListItemIcon>
                <ListItemText primary={user.name} secondary={user.program} style={{color: "#FFFFFF"}}/>
                <Icon style={{color: "#FFFFFF"}}>exit_to_app</Icon>
            </ListItem>
        </div>
    )
}

export default UserCard;
