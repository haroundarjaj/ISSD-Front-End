import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Breadcrumb, BreadcrumbItem, Input, Row, Col } from 'reactstrap';
import MapComponent from '../../Components/Map/MapComponent';
import axios from 'axios';
import { openVPNApi } from '../../Config/apiUrl';
import { withStyles } from '@mui/styles';
import { Dialog, Divider, List, ListItem, ListItemButton, ListItemText, Paper, Typography, Zoom } from '@mui/material';
import { alpha } from "@mui/material";
import MapDataForm from '../../Components/MapDataForm';
import ConfirmationDialog from '../../Components/ConfirmationDialog';

const PaperStyled = withStyles(theme => ({
    root: {
        backgroundColor: `${alpha("#1E1E2F", 0.5)} !important`,
        width: '100%',
        margin: '5px 0px 0px 0px',
        overflow: 'auto',
        height: 117
    },
}))(Paper);

const listItems = [
    { title: 'Address 1', isfromServer: true },
    { title: 'Address 2', isfromServer: false },
    { title: 'Address 3', isfromServer: true },
    { title: 'Address 4', isfromServer: false },
    { title: 'Address 5', isfromServer: false },
    { title: 'Address 6', isfromServer: false },
]

const ExcepcionadasPage = (props) => {
    const { id } = useParams();

    const [selectedDirection, setSelectedDirection] = useState(null);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [addressesData, setAddressesData] = useState([
        { _id: 'testid1', _source: { direccion_normalizada: 'address 1' } },
        { _id: 'testid2', _source: { direccion_normalizada: 'address 2' } },
        { _id: 'testid3', _source: { direccion_normalizada: 'address 3' } },
        { _id: 'testid4', _source: { direccion_normalizada: 'address 4' } },
        { _id: 'testid5', _source: { direccion_normalizada: 'address 5' } }
    ]);
    const [infoValue, setInfoValue] = useState('');

    const zoom = 15;

    const handleDragEndMarker = (address) => {
        console.log(address)
        setSelectedDirection(address);
    }

    const handleSearchItemClick = item => {
        setSelectedDirection(item)
    }


    const handleInfoChanged = (value) => {
        setInfoValue(value);
    }

    useEffect(() => {
        const query = {
            query: {
                match: {
                    "_id": id
                }
            },
            size: 5
        };
        axios.get(`${openVPNApi}/direcciones/_search`, {
            params: {
                source: JSON.stringify(query),
                source_content_type: 'application/json'
            }
        }).then((res) => {
            setSelectedDirection(res.data.hits.hits[0])
            console.log(res.data.hits.hits)
        })
    }, []);
    console.log(props)
    return (
        <>
            <div className="section section-typo">
                <img
                    alt="..."
                    className="path"
                    src={require("../../assets/img/path1.png")}
                />
                <img
                    alt="..."
                    className="path path1"
                    src={require("../../assets/img/path3.png")}
                />
                <Container style={{ maxWidth: "90%" }}>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="/home">Home</a></BreadcrumbItem>
                        <BreadcrumbItem ><a href="/selector">Selector</a></BreadcrumbItem>
                        <BreadcrumbItem active>Excepcionadas</BreadcrumbItem>
                    </Breadcrumb>
                    <Input
                        type="text"
                        name="info"
                        id="info-input"
                        value={infoValue}
                    />
                    <PaperStyled>
                        <List>
                            {/* searchData.filter(obj => obj.isfromServer).map(row =>
                            <ListItem dense disablePadding>
                                <ListItemButton>
                                    <ListItemText
                                        primary={<Typography variant="body2" style={{ color: '#D850D4' }}>{row.title}</Typography>} />
                                </ListItemButton>
                        </ListItem>) */}
                            {/* searchData.filter(obj => obj.isfromServer).length > 0 && searchData.filter(obj => !obj.isfromServer).length > 0 && <Divider style={{ width: '100%' }} /> */}
                            {/* searchData.filter(obj => !obj.isfromServer).map(row =>
                            <ListItem dense disablePadding>
                                <ListItemButton>
                                    <ListItemText
                                        primary={<Typography variant="body2">{row.title}</Typography>} />
                                </ListItemButton>
                        </ListItem>) */}
                            {addressesData.map(row =>
                                <ListItem dense disablePadding onClick={() => handleSearchItemClick(row)} style={row._id === selectedDirection?._id ? { backgroundColor: 'gray' } : {}}>
                                    <ListItemButton>
                                        <ListItemText
                                            primary={<Typography variant="body2">{row._source.direccion_normalizada}</Typography>} />
                                    </ListItemButton>
                                </ListItem>)}
                        </List>
                    </PaperStyled>
                    <br />
                    <Row>
                        <Col>
                            {selectedDirection ?
                                <MapComponent location={{ lat: parseFloat(selectedDirection?._source.latitud), lng: parseFloat(selectedDirection?._source.longitud) }} zoom={zoom} handleDragEndMarker={handleDragEndMarker} />
                                : <div style={{ width: '100%', height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    Loading Map...
                                    <img
                                        alt="..."
                                        width="150"
                                        src={require("../../assets/img/loadingIndicator.gif")}
                                    />
                                </div>}
                        </Col>
                        <Col>
                            <MapDataForm data={selectedDirection} handleInfoChanged={handleInfoChanged} openSaveConfirmation={setIsOpenConfirmation} />
                        </Col>
                    </Row>
                </Container>
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={isOpenConfirmation}
                    onClose={() => setIsOpenConfirmation(false)}
                    scroll='paper'
                    PaperComponent={() =>
                        ConfirmationDialog({
                            title: 'Confirmación',
                            message: '¿Está seguro que esta dirección es la normalizada?',
                            confirmButton: true,
                            cancelButton: true,
                            confirmButtonText: 'SÍ Seguro',
                            cancelButtonText: 'Cancelar',
                            handleConfirmAction: () => setIsOpenConfirmation(false),
                            handleCancelAction: () => setIsOpenConfirmation(false)
                        })}
                    TransitionComponent={Zoom}
                />
            </div>
        </>
    );
}

export default ExcepcionadasPage;