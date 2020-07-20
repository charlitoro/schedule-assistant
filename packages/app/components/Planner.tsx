import { NextPage, NextPageContext } from 'next'
import Main from '../layouts/Main';
import { Menu } from './Menu';
import {
    Backdrop,
    CircularProgress,
    Container,
    createStyles,
    Fab,
    Fade,
    Icon,
    Modal,
    Theme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormActivity from "./FormActivity";
import Workspace from './Workspace';
import React from "react";
import { executeQuery } from '../utils/graphqlQueryRequest';
import {queryGetUser, mutationUpdateActivityStudent, mutationUpdatePlanner} from '../utils/graphqlQueries';
import {IActivity, IDays, IGroup, IStudent} from "../utils/interfaces";
import {useMutation} from "@apollo/react-hooks";
import { get, unionBy, concat, find, remove } from 'lodash';
import {splitItems} from "../plugins/splitItemsByHours";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        marginAdd: {
            position: 'absolute',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
        },
        marginSave: {
            position: 'absolute',
            bottom: theme.spacing(11),
            right: theme.spacing(3),
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

const initPlannerData = (): IDays|undefined => {
    const student: IStudent = initStudentData();
    if ( student && student.planner ) {
        return splitItems(student.planner);
    }
}

const refreshPlannerList = ( list: any, item: any ) => {
    let updatedList = [...list];
    if ( item.isSelected ){
        updatedList = unionBy( [item], updatedList, 'id');
    } else {
        remove(updatedList, (obj) => obj.id == item.id );
    }
    return updatedList;
}

interface Props {
    loggedStudent?: boolean;
}

const Planner: NextPage<Props> = ({ loggedStudent }: Props) => {

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [studentData, setStudentData] = React.useState<IStudent>( initStudentData());
    const [keepPlanner, setPlannerItem] = React.useState<{groups: IGroup[], activities: IActivity[]} >({groups:[], activities:[]});
    const [open, setOpen] = React.useState(false);
    const [plannerData, setPlannerData] = React.useState<IDays|undefined>(initPlannerData())

    const [ updateActivityStudent ] = useMutation( mutationUpdateActivityStudent );
    const [ updatePlanner ] = useMutation( mutationUpdatePlanner(keepPlanner) );

    const handleOpenLoading = () => {
        setLoading( true );
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleKeepPlanner = (item: any, type: string) => {
        const newPlanner: any = {groups: [], activities: []};
        const updatedStudentData: any = {...studentData};
        if ( type === 'GROUP') {
            newPlanner.groups = unionBy([item], keepPlanner.groups, 'id');
            newPlanner.activities = keepPlanner.activities;
            //
            updatedStudentData.planner.groups = refreshPlannerList(updatedStudentData.planner.groups, item);
        } else if( type === 'ACTIVITY' ){
            newPlanner.activities = unionBy([item], keepPlanner.activities, 'id');
            newPlanner.groups = keepPlanner.groups;
            //
            updatedStudentData.planner.activities = refreshPlannerList(updatedStudentData.planner.activities, item);
        }
        // FIXME: Corregir la informacion duplicada en el plannerData
        const newPlannerData: IDays = splitItems(updatedStudentData.planner);
        setStudentData( updatedStudentData );
        setPlannerData( newPlannerData );
        setPlannerItem( newPlanner );
    }
    const handleSavePlanner = async () => {
        handleOpenLoading();
        // @ts-ignore
        const { data } = await updatePlanner({variables: {id: studentData.planner.id}});
        const newStudentData: IStudent = {...studentData};
        newStudentData.planner = data.updatePlanner;
        setStudentData(newStudentData);
        // @ts-ignore
        const newPlannerData: IDays = splitItems(newStudentData.planner);
        setPlannerData(newPlannerData);
        setLoading(false);
    }

    const handleCreateActivity = async ( activity: IActivity ) => {
        if ( activity ) {
            const { data } = await updateActivityStudent( {
                variables: { idStudent: studentData.id, idActivity: activity.id }
            } );
            setStudentData(get(data, 'updateStudent'));
            setLoading( false );
        }
    }

    if( studentData ){
        return (
            <div>
                <Main>
                    <Menu
                        studentData={ studentData }
                        handleKeepPlanner={
                            (item: any, type: string) => handleKeepPlanner(item, type)
                        }
                    />
                    <Fab color="secondary" aria-label="save" className={classes.marginSave} onClick={handleSavePlanner}>
                        <Icon>save</Icon>
                    </Fab>
                    <Fab color="secondary" aria-label="add" className={classes.marginAdd} onClick={handleOpen}>
                        <Icon>add</Icon>
                    </Fab>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}>
                            <Container maxWidth="lg" className={classes.container}>
                                <Workspace plannerData={plannerData}/>
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
}

export default Planner
