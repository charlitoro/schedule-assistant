import React from 'react';
import {createStyles, Grid, Paper, Theme} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ENUM_DAYS, ENUM_HOURS } from '../utils/constants';
import { map } from 'lodash';
import {splitItems} from "../plugins/splitItemsByHours";
import {IDays} from "../utils/interfaces";

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


const Planner = ({plannerData}: any) => {
    const classes = useStyles();
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
                                {map(ENUM_DAYS, (hour) => {
                                    return (
                                        <Grid item xs={12} key={`${hour}-${day}`}>
                                            <Paper
                                                className={classes.paper}
                                                variant="outlined"
                                                square
                                            >

                                            </Paper>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )
                    })}
                </React.Fragment>
            </Grid>
        </div>
    )
}

export default Planner;
