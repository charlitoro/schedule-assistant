import Main from '../layouts/Main';
import { Menu } from '../components/Menu';
import withData from '../plugins/apollo';
import {
    Backdrop,
    CircularProgress,
    Container,
    createStyles,
    Fab,
    Fade,
    Icon,
    IconButton, LinearProgress,
    Modal,
    Theme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormActivity from "../components/FormActivity";
import Planner from '../components/Planner';
import React from "react";
import { executeQuery } from '../utils/graphqlQueryRequest';
import {queryGetUser, queryGetSubjects, mutationUpdateActivityStudent} from '../utils/graphqlQueries';
import {IActivity, IStudent} from "../utils/interfaces";
import {useMutation} from "@apollo/react-hooks";
import { get } from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            position: 'absolute',
            bottom: theme.spacing(4),
            right: theme.spacing(4),
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
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        appBarSpacer: theme.mixins.toolbar,
        container: {
            paddingTop: theme.spacing(11),
            paddingBottom: theme.spacing(4),
        },
        loader: {
            padding: theme.spacing(8, 4, 3),
        }
    }),
);

const initStudentData = (): IStudent => {
    const { data } = executeQuery(queryGetUser, { id: "5ea4b8f49b7965000851cdbc" });
    return get(data, 'student')
}

export default withData ( (props: any) => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [studentData, setStudentData] = React.useState<IStudent>( initStudentData());
    const [open, setOpen] = React.useState(false);

    const [ updateActivityStudent ] = useMutation( mutationUpdateActivityStudent );

    const handleOpenLoading = () => {
        setLoading( true );
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateActivity = async ( activity: IActivity ) => {
        if ( activity ) {
            const { data } = await updateActivityStudent( {
                variables: { idStudent: studentData.id, idActivity: activity.id }
            } );
            console.log( get(data, 'updateStudent') )
            setStudentData(get(data, 'updateStudent'));
            setLoading( false );
        }
    }

    if( studentData ){
        // setStudentData(data.student);
        return (
            <div>
                <Main>
                    <Menu studentData={ studentData } />
                    <Fab color="secondary" aria-label="add" className={classes.margin} onClick={handleOpen}>
                        <Icon>add</Icon>
                    </Fab>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}>
                            <Container maxWidth="lg" className={classes.container}>
                                <Planner />
                            </Container>
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
                                        <FormActivity
                                            handleActivityClose={() => handleClose()}
                                            handleActivityOpenLoading={() => handleOpenLoading()}
                                            handleCreateActivity={(activity: IActivity) => handleCreateActivity(activity)}
                                            user={studentData}
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
                    </main>
                </Main>
            </div>
        )
    }
    return <div></div>
})
