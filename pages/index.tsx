import Main from '../layouts/Main';
import { Menu } from '../components/Menu';
import withData from '../plugins/apollo';
import {Backdrop, Container, createStyles, Fab, Fade, Icon, IconButton, Modal, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormActivity from "../components/FormActivity";
import Planner from '../components/Planner';
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            position: 'absolute',
            bottom: theme.spacing(8),
            right: theme.spacing(8),
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
            paddingTop: theme.spacing(10),
            paddingBottom: theme.spacing(4),
        },
    }),
);


export default withData ( (props: any) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Main>
                <Menu/>
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
                                    <FormActivity/>
                                </div>
                            </Fade>
                        </Modal>
                    </div>
                </main>
            </Main>
        </div>
    )
})
