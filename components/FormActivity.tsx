import React from 'react';
import ScheduleForm from '../components/ScheduleForm';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, Typography,
    Grid, TextField,
    Chip, CssBaseline,
    Button, IconButton, Paper, InputLabel, Modal, Fade, Backdrop, CircularProgress,
} from "@material-ui/core";
// @ts-ignore
import ColorPicker from "material-ui-color-picker";
import { AddCircle } from "@material-ui/icons";
import { get, map, isEmpty } from 'lodash';
import {useMutation} from "@apollo/react-hooks";
import { mutationCreateActivity } from "../utils/graphqlQueries";

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
    },
    loader: {
        padding: theme.spacing(8, 4, 3),
    }
}));

const FromActivity = ( { handleActivityClose, handleActivityOpenLoading, handleCreateActivity, user }: any ) => {
    const classes = useStyles();

    const [color, setColor] = React.useState( '#000');
    const [schedules, setNewSchedules] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [name, setName ] = React.useState('');
    const [description, setDescription ] = React.useState('');

    const [ createActivity ] = useMutation( mutationCreateActivity(schedules) );

    const handleDelete = (scheduleToDelete: any) => () => {
        setNewSchedules((schedules) => schedules.filter((schedule: any) => schedule.id !== scheduleToDelete.id));
    };
    const handlerColor = ( color: any ) => { setColor( color ) }
    const handleOpen = () => { setOpen(true ) };
    const handleClose = () => { setOpen(false) };
    const handleOpenLoading = () => { setLoading( true ) }
    const handleAddSchedule = ( schedule: any ) => {
        const newSubjects = [...schedules];
        if ( schedule ) {
            newSubjects.push( schedule );
        }
        setLoading(false);
        setNewSchedules(newSubjects)
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value) };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => { setDescription(event.target.value) };

    const submitOnClickActivity = async () => {
        if ( !isEmpty(name) && !isEmpty(schedules) ) {
            const variables = { description, color, name }
            handleActivityClose(); handleActivityOpenLoading()
            const { data } = await createActivity({ variables });
            console.log( get(data, 'createActivity') )
            await handleCreateActivity( get(data, 'createActivity') );
        } else {
            // TODO: Mostrar Notificacion
            console.log('Valores nopueden ser vacios');
        }
    }

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
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="description"
                                label="Description"
                                id="description"
                                onChange={handleDescriptionChange}
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
                                {map( schedules, (schedule: any) => {
                                    return (
                                        <li key={schedule.id}>
                                            <Chip
                                                label={schedule.label}
                                                onDelete={handleDelete(schedule)}
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
                                            <ScheduleForm
                                                handleClose={() => handleClose()}
                                                handleOpenLoader={() => handleOpenLoading()}
                                                handleAddSchedule={(schedule: any) => handleAddSchedule( schedule )}
                                            />
                                        </div>
                                    </Fade>
                                </Modal>
                                <Modal
                                    aria-labelledby="loading-title"
                                    aria-describedby="loading-description"
                                    className={classes.modal}
                                    open={loading}
                                    // onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade
                                        in={loading}
                                        style={{
                                            transitionDelay: loading ? '800ms' : '0ms',
                                        }}
                                        unmountOnExit
                                    >
                                        <div className={classes.loader}>
                                            <CircularProgress color="secondary" size="5rem"/>
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitOnClickActivity}
                    >
                        Accept
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default FromActivity;
