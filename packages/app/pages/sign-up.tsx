import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../components/Copyright";
import {isEmpty, get} from "lodash";
import fetch from "node-fetch";
import {AUTH_SERVER, CLIENT_ID} from "../utils/constants";
import Router from "next/router";
import {Snackbar} from "@material-ui/core";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";

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
}));

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {
    const classes = useStyles();
    const [programName, setProgramName] = useState('Ingeniería de Sistemas');
    const [programCode, setProgramCode] = useState('PG001');
    const [name, setStudentName] = useState('');
    const [code, setStudentCode] = useState('');
    const [password, setStudentPassword] = useState('');
    const [semester, setStudentSemester] = useState(9 );
    const [message, setMessage] = useState('' );
    const [open, setOpenAlert] = React.useState(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => { setStudentName(event.target.value) };
    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => { setStudentCode(event.target.value) };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => { setStudentPassword(event.target.value) };

    const submitOnClick = async() => {
        if( !isEmpty(code) && !isEmpty(password) && !isEmpty(name) && !isEmpty(programName)) {
            try {
                const student = await fetch( `${AUTH_SERVER}/sign-up`, {
                    method: 'POST',
                    body: JSON.stringify( { code, name, semester, programCode, password } ),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `client_id ${CLIENT_ID}`,
                        'Origin': 'http://next.charli.com'
                    },
                } ).then( res => {
                    if( res.status === 400 )
                        throw new Error('Student was not created');
                    else if( res.status !== 200 )
                        throw new Error('Internal server error');
                    return res.json();
                } );
                if( !get( student, 'id' ) ){
                    throw new Error('Student was not created');
                }
                await Router.replace("/sign-up", "/login", { shallow: true });
                window.location.reload();
            } catch (e) {
                console.log( e.message );
                handleClickAlert(e.message);
            }
        } else {
            handleClickAlert( "Error: All field are required" );
        }
    }

    const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    const handleClickAlert = (message: string) => {
        setOpenAlert(true);
        setMessage(message)
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Planner Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="code"
                                name="code"
                                variant="outlined"
                                required
                                fullWidth
                                id="code"
                                label="Code"
                                autoFocus
                                onChange={handleCodeChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                type="number"
                                fullWidth
                                disabled
                                value={semester}
                                id="semester"
                                label="Semester"
                                name="semester"
                                autoComplete="semester"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Student Name"
                                name="name"
                                autoComplete="name"
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="program"
                                label="Program"
                                name="program"
                                autoComplete="program"
                                value={programName}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitOnClick}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
