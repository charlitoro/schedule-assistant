import React from 'react';
import {createStyles, Grid, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado ', 'Domingp', 'Any'];
const hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00']

const Planner = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <React.Fragment>
                    { days.map((value) => {
                        return (
                            <Grid container item xs key={value} spacing={1}>
                                {
                                    hours.map((day) => {
                                        return (
                                            <Grid item xs key={day}>
                                                <Paper className={classes.paper}>
                                                    {day}
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
        </div>
    )
}

export default Planner;
