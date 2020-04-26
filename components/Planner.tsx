import React from 'react';
import {createStyles, Grid, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
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

const days = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado ', 'Domingp'];
const hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00']

const Planner = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <React.Fragment>
                    { days.map((day) => {
                        return (
                            <Grid container item xs key={day} spacing={0}>
                                <Grid item xs={12} key={`head-${day}`}>
                                    <Paper className={classes.paperHead} variant="outlined" square>
                                        {day}
                                    </Paper>
                                </Grid>
                                {
                                    hours.map((hour) => {

                                        return (
                                            <Grid item xs={12} key={`${hour}-${day}`}>
                                                <Paper
                                                    className={ day === 'Hora' ? classes.paperHead: classes.paper}
                                                    variant="outlined"
                                                    square
                                                >
                                                    {hour}
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
