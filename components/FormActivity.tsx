import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, Typography,
    Link, Grid, TextField,
    Chip, CssBaseline,
     Button, IconButton,
} from "@material-ui/core";
// @ts-ignore
import ColorPicker from "material-ui-color-picker";

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
    }
}));

const FromActivity = () => {
    const classes = useStyles();

    const [chipData, setChipData] = React.useState<ChipData[]>([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);

    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
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
                        <Grid item xs={12}>
                            <ColorPicker
                                name='color'
                                defaultValue='#000'
                                // value={this.state.color} - for controlled component
                                onChange={ ( color: any ) => console.log(color)}
                            />
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
                                    <AddCircle/>
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
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default FromActivity;
