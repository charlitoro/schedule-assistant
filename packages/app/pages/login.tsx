import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import Cookie from "js-cookie";
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
import {isEmpty, get, map} from 'lodash';
import fetch from 'node-fetch';
import { AUTH_SERVER, CLIENT_ID } from '../utils/constants';
import {NextPage} from "next";
import {Snackbar} from "@material-ui/core";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";


Cookie.set('student', {});

const Index = dynamic( () => import('./index') );

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn:NextPage = ( ) => {
    const classes = useStyles();
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('' );
    const [logged, setToggleLogin] = useState( false );
    const [student, setStudent] = useState({})
    const [open, setOpenAlert] = React.useState(false);

    // useEffect( () => {
    //     Cookie.set("student", JSON.stringify( student ))
    // }, [student]);

    const submitOnClick = async() => {
        if( !isEmpty(code) && !isEmpty(password) ) {
            try {
                const student = await fetch( AUTH_SERVER, {
                    method: 'POST',
                    body: JSON.stringify( { code, password } ),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `client_id ${CLIENT_ID}`,
                        'Origin': 'http://next.charli.com'
                    },
                } ).then( res => {
                    if( res.status === 404 )
                        throw new Error('Incorrect Code or Password');
                    else if( res.status !== 200 )
                        throw new Error('Internal server error');
                    return res.json();
                } );
                Cookie.set("student", JSON.stringify( student ))
                setStudent( student );
                setToggleLogin( true );
            } catch (e) {
                console.log( e.message );
                handleClickAlert(e.message);
            }
        } else {
            //TODO: Mostrar notificacion
        }
    }
    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => { setCode(event.target.value) };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value) };

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

    if( logged ) {
        return <Index />
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="code"
                        label="Code"
                        name="code"
                        autoComplete="code"
                        autoFocus
                        onChange={handleCodeChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitOnClick}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
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

export default SignIn;
