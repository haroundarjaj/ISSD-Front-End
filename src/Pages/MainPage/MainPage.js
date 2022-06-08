import React from "react";
import { useHistory } from 'react-router-dom';
import { Container, Button } from "reactstrap";


const MainPage = (props) => {
    const history = useHistory();
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
                        onClick={() => {
                            history.push({
                                pathname: '/selector',
                            });
                        }}>
                        <i className="tim-icons icon-double-right" />
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default MainPage;
