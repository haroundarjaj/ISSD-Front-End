import { Dialog, DialogContent, DialogTitle, Paper, Slide, Zoom } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Container, Button } from "reactstrap";
import LoginForm from "../../Components/LoginForm";


const MainPage = (props) => {
    const history = useHistory();
    const [openDialog, setOpenDialog] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setLoggedIn(false);
    }

    const isSuccessLogin = () => {
        setOpenDialog(false);
        setLoggedIn(true);
    }
    return (
        <div className="page-header header-filter">
            <div className="squares square1" />
            <div className="squares square2" />
            <div className="squares square3" />
            <div className="squares square4" />
            <div className="squares square5" />
            <div className="squares square6" />
            <div className="squares square7" />
            <Container>
                <div className="content-center brand">
                    <h1 className="h1-seo">ISSD• W</h1>
                    <h3 className="d-none d-sm-block">
                        GET STARTED
                    </h3>
                    <Button className="btn-round btn-icon" size="lg" color="primary"
                        /* onClick={() => {
                            history.push({
                                pathname: '/selector',
                            });
                        }}*/
                        onClick={() => setOpenDialog(true)}
                    >
                        <i className="tim-icons icon-double-right" />
                    </Button>
                </div>
            </Container>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={openDialog}
                onClose={handleCloseDialog}
                scroll='paper'
                PaperComponent={() => LoginForm({ isSuccessLogin: isSuccessLogin })}
                BackdropProps={{ style: { backgroundColor: "transparent" } }}
                transitionDuration={300}
            />
            <Dialog
                fullWidth
                maxWidth="sm"
                open={loggedIn}
                onClose={handleCloseDialog}
                scroll='paper'
                PaperComponent={LoginForm}
                BackdropProps={{ style: { backgroundColor: "transparent" } }}
                transitionDuration={300}
            />
        </div>
    );
}

export default MainPage;
