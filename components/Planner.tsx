import React from 'react';
import {
    Backdrop,
    createStyles,
    Dialog,
    DialogTitle,
    Fade,
    List,
    Grid,
    Icon, IconButton,
    Modal,
    Paper,
    Snackbar,
    Theme, ListItem, ListItemAvatar, ListItemText, DialogContent, DialogContentText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ENUM_DAYS, ENUM_HOURS } from '../utils/constants';
import { map, get, forEach,head, compact, uniqBy} from 'lodash';
import {IActivity, IGroup} from "../utils/interfaces";
import FormActivity from "./FormActivity";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(0),
            // width: '100%',
            // height: '100%',
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        paperHead: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.primary,
            background: theme.palette.grey["400"],
        },
    }),
);

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    itemStatus: ItemStatus
}

interface ItemStatus {
    color?: string;
    isDisable?: boolean;
    icon?: string;
    items?: any[];
    title?: string;
    message?: string;
    cross?: boolean;
}

const  validateScheduleCross = ( plannerData: any[], day: string, hour: string ): ItemStatus => {
    const foundItems = uniqBy(compact(get(plannerData, `${day}.${hour}`)), 'id');
    const status: ItemStatus = {
        color: "#ffffff",
        isDisable: false,
        icon: "beenhere",
        items: foundItems,
        cross: false,
    };
    if (foundItems.length > 1) {
        status.title = `Cross Schedules`;
        status.message = `Cross Schedules on ${day} at ${hour}, in the following groups or activities:`;
        status.icon = 'error';
        status.cross = true;
    } else {
        const item: any = head(foundItems);
        status.title = `${day} at ${hour} `;
        status.message = `Your group or activity in this schedule:`;
        if ( get(foundItems, 'color') ) {
            status.color = item.color;
        } else if( get(item, 'subject.color') ) {
            status.color = item.subject.color;
        } else{
            status.isDisable = true;
        }
    }
    return status;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open, itemStatus } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{ itemStatus.title }</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    { itemStatus.message }
                </DialogContentText>
            </DialogContent>
            <List>
                {map( itemStatus.items, (item: any) => {
                    const itemList = {color: "", primary: "", secondary: ""};
                    if (get(item, 'type')) {
                        console.log(item);
                        itemList.color = get(item, 'subject.color');
                        itemList.primary = `${get(item, 'subject.name')} - ${get(item, 'type')}`
                        itemList.secondary = `${get(item, 'classroom.name')} - ${get(item, 'teacher.name')}`;
                    } else {
                        itemList.color = get(item, 'color');
                        itemList.primary = get(item, 'name')
                        itemList.secondary = get(item, 'description')
                    }
                    return (
                        <ListItem key={item.id}>
                            <ListItemAvatar>
                                <Icon style={{color: itemList.color,}}>lens</Icon>
                            </ListItemAvatar>
                            <ListItemText primary={itemList.primary} secondary={itemList.secondary} />
                        </ListItem>
                    )
                })}
            </List>
        </Dialog>
    );
}

const Planner = ({plannerData}: any) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [itemStatus, setItemStatus] = React.useState<ItemStatus>({ });

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = ( newItemStatus: ItemStatus ) => {
        setItemStatus( newItemStatus );
        setOpen(true );
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <React.Fragment>
                    <Grid container item xs spacing={0}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperHead} variant="outlined" square>
                                Hour
                            </Paper>
                        </Grid>
                        {map(ENUM_HOURS, (hour) => {
                            return (
                                <Grid item xs={12} key={`${hour}`}>
                                    <Paper className={classes.paperHead} variant="outlined" square>
                                        {hour}
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                    { map(ENUM_DAYS, (day) => {
                        return (
                            <Grid container item xs key={day} spacing={0}>
                                <Grid item xs={12} key={`head-${day}`}>
                                    <Paper className={classes.paperHead} variant="outlined" square>
                                        {day}
                                    </Paper>
                                </Grid>
                                {
                                    map(ENUM_HOURS, (hour) => {
                                        // TODO: Refactorizar eliminacion de elementos repetidos,
                                        const itemStatus: ItemStatus = validateScheduleCross( plannerData, day, hour );
                                        const background = itemStatus.cross ? '#FF9800': '#FFFFFF';
                                        return (
                                            <Grid item xs={12} key={`${day}-${hour}`}>
                                                <Paper className={classes.paper} variant="outlined" square>
                                                    <IconButton
                                                        disabled={itemStatus.isDisable}
                                                        onClick={ () => handleClickOpen(itemStatus)}
                                                        style={{background}}
                                                    >
                                                        <Icon style={{color: itemStatus.color}}>{itemStatus.icon}</Icon>
                                                    </IconButton>
                                                </Paper>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        )
                    })}
                </React.Fragment>
            </Grid>
            <SimpleDialog open={open} onClose={handleClose} itemStatus={itemStatus} />
        </div>
    )
}

export default Planner;
