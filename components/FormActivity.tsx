import React from 'react';
import ScheduleForm from '../components/ScheduleForm';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, Typography,
    Grid, TextField,
    Chip, CssBaseline,
    Button, IconButton, Paper, InputLabel, Modal, Fade, Backdrop,
} from "@material-ui/core";
// @ts-ignore
import ColorPicker from "material-ui-color-picker";
import { AddCircle } from "@material-ui/icons";

interface ChipData {
    key: number;
    label: string;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    chipContainer: {
        display: 'flex',
        justifyContent: 'center',
        listStyle: 'none',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        }
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    colorPaper: {
        margin: theme.spacing(1),
        width: 100,
        height: 100,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

const FromActivity = () => {
    const classes = useStyles();

    const [chipData, setChipData] = React.useState<ChipData[]>( [
        { key: 0, label: '7-8 Lunes' },
        { key: 1, label: '8-9 Lunes' },
        { key: 2, label: '14-15 Viernes' },
        { key: 3, label: '15-16 Viernes' },
    ]);

    const [color, setColor] = React.useState( '#000');
    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    const handlerColor = ( color: any ) => {
        setColor( color );
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Activity Register
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="activity"
                                label="Activity"
                                name="activity"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="description"
                                label="Description"
                                id="description"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <ColorPicker
                                name='color'
                                label='Activity Color'
                                defaultValue={color}
                                value={color}
                                onChange={ (color: any) => handlerColor( color ) }
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={3} className={classes.colorPaper} style={{background: color}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel >Schedules</InputLabel>
                            <div className={classes.chipContainer}>
                                {chipData.map((data) => {
                                    return (
                                        <li key={data.key}>
                                            <Chip
                                                label={data.label}
                                                onDelete={handleDelete(data)}
                                                className={classes.chip}
                                                color="primary"
                                            />
                                        </li>
                                    );
                                })}
                                <IconButton color="secondary" aria-label="add schedule" onClick={handleOpen}>
                                    <AddCircle fontSize="large"/>
                                </IconButton>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={open}>
                                        <div className={classes.modalPaper}>
                                            <ScheduleForm/>
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Accept
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default FromActivity;
