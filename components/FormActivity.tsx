import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, Typography,
    Link, Grid, TextField,
    Chip, CssBaseline,
    Button, IconButton, Paper,
} from "@material-ui/core";
// @ts-ignore
import ColorPicker from "material-ui-color-picker";
import { AddCircle, Lens } from "@material-ui/icons";

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
    }
}));

const FromActivity = () => {
    const classes = useStyles();

    const [chipData, setChipData] = React.useState<ChipData[]>( [
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);

    const [color, setColor] = React.useState( '#000');

    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    const handlerColor = ( color: any ) => {
        setColor( color );
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
                                <IconButton color="secondary" aria-label="add schedule">
                                    <AddCircle fontSize="large"/>
                                </IconButton>
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
                    <Grid container justify="flex-end">
                        <Grid item>

                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default FromActivity;
