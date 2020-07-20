import React from "react";
import {Button, Snackbar, FormControl, Grid, Icon, MenuItem, Select} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ENUM_DAYS } from '../utils/constants';
import { map, indexOf, get } from 'lodash';
import Moment from 'moment';
import { mutationCreateSchedule } from '../utils/graphqlQueries';
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {useMutation} from "@apollo/react-hooks";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: "100%",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ScheduleForm = ( { handleClose, handleOpenLoader, handleAddSchedule }: any ) => {

    const classes = useStyles();
    const [startTime, setSelectedStartTime] = React.useState<Date | null>( new Date());
    const [endTime, setSelectedEndTime] = React.useState<Date | null>( new Date() );
    const [selectDay, setDay] = React.useState('');
    const [open, setOpenAlert] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const [ createSchedule ] = useMutation(mutationCreateSchedule)

    const handleStartTimeChange = (time: Date | null) => {
        setSelectedStartTime(time);
    };
    const handleEndTimeChange = (time: Date | null) => {
        setSelectedEndTime(time);
    };

    const handleDayChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDay(event.target.value as string);
    };

    const handleClickAlert = (message: string) => {
        setOpenAlert(true);
        setMessage(message)
    };

    const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const submitAddSchedule = async () => {
        if ( indexOf( ENUM_DAYS, selectDay) !== -1 ) {
            if ( Moment(endTime).isAfter(startTime) ) {
                const variables = {
                    start: Moment(startTime).format('kk:mm'),
                    end: Moment(endTime).format('kk:mm'),
                    day: selectDay,
                    label: `${selectDay} ${Moment(startTime).format('kk')}-${Moment(endTime).format('kk')}`
                }
                handleClose(); handleOpenLoader();
                const { data } = await createSchedule({variables})
                handleAddSchedule(get(data, 'createSchedule'));
            } else {
                handleClickAlert('La hora de finalización de la actividad debe ser mayor a la hora inicial.');
            }
        } else {
            handleClickAlert('Seleccione el dia del horario, es un campo requerido para el Workspace.');
        }
    }

    return (
        <div className={classes.paper}>
            <Icon style={{fontSize: 80}} color="secondary">schedule</Icon>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                                labelId="select-day"
                                value={selectDay}
                                onChange={handleDayChange}
                                label="Dia"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    map( ENUM_DAYS, ( day) => {
                                        return <MenuItem key={day} value={day}> {day} </MenuItem>
                                    } )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="initial-time"
                                label="Inicia"
                                value={startTime}
                                onChange={handleStartTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="initial-time"
                                label="Finaliza"
                                value={endTime}
                                onChange={handleEndTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <Button
                    onClick={submitAddSchedule}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Adicionar
                </Button>
            </form>

            <Snackbar open={open} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ScheduleForm;
