import React, { useState } from 'react';
import { Container, Breadcrumb, BreadcrumbItem, Input, Row, Col } from 'reactstrap';
import MapComponent from '../../Components/MapComponent';
import { withStyles } from '@mui/styles';
import { Alert, List, ListItem, ListItemButton, ListItemText, Paper, Snackbar, Typography } from '@mui/material';
import { alpha } from "@mui/material";
import MapDataForm from '../../Components/MapDataForm';
import AddressServices from '../../Services/AddressServices';
import axios from 'axios';

const PaperStyled = withStyles(theme => ({
    root: {
        backgroundColor: `${alpha("#1E1E2F", 0.5)} !important`,
        width: '100%',
        margin: '5px 0px 0px 0px',
        overflow: 'auto',
        maxHeight: 117
    },
}))(Paper);

const ConsultaPage = () => {

    const [selectedDirection, setSelectedDirection] = useState(null);
    const [zoom, setZoom] = useState(2);
    const [searchValue, setSearchValue] = useState('');
    const [infoValue, setInfoValue] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleDragEndMarker = (address) => {
        console.log(address)
        setSelectedDirection(address);
    }

    const handleSearchItemClick = item => {
        console.log(item)
        setSelectedDirection(item)
        setZoom(15);
    }

    const handleInfoChanged = (value) => {
        setInfoValue(value);
    }

    const handleSearchValueChange = (e) => {
        const { value } = e.target;
        console.log(value)

        if (value !== '') {
            // const filteredList = listItems.filter(item => item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
            // setSearchData(filteredList);
            const query = {
                query: {
                    bool: {
                        must: [
                            {
                                match_phrase: {
                                    "direccion_normalizada": value
                                }
                            }
                        ]
                    }

                },
                size: 30
            };
            axios.get('http://192.168.50.91:9200/direcciones/_search', {
                params: {
                    source: JSON.stringify(query),
                    source_content_type: 'application/json'
                }
            }).then((res) => {
                console.log(res.data.hits.hits);
                setSearchData(res.data.hits.hits);
            }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor') })
        } else setSearchData([])
        setSearchValue(value);
    }

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    }

    const handleShowSnackBar = (type, message) => {
        setSnackbarType(type);
        setSnackbarMessage(message);
        setOpenSnackBar(true);
    }

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
                        <BreadcrumbItem active>Consulta</BreadcrumbItem>
                    </Breadcrumb>

                    <Input
                        type="text"
                        name="search"
                        id="search-input"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearchValueChange}
                    />
                    {searchData.length > 0 && <PaperStyled>
                        <List>
                            {searchData.map(row =>
                                <ListItem dense disablePadding onClick={() => handleSearchItemClick(row)} style={row._id === selectedDirection?._id ? { backgroundColor: 'gray' } : {}}>
                                    <ListItemButton>
                                        <ListItemText
                                            primary={<Typography variant="body2">{row._source.direccion_normalizada}</Typography>} />
                                    </ListItemButton>
                                </ListItem>)}
                        </List>
                    </PaperStyled>}
                    <br />
                    <Row>
                        <Col>
                            <MapComponent
                                location={selectedDirection ?
                                    { lat: parseFloat(selectedDirection?._source.latitud), lng: parseFloat(selectedDirection?._source.longitud) }
                                    : { lat: 0.00, lng: 0.00 }}
                                zoom={zoom}
                                handleDragEndMarker={handleDragEndMarker}
                                isConsult />
                        </Col>
                        <Col>
                            <MapDataForm handleInfoChanged={handleInfoChanged} data={selectedDirection} dirnorm={infoValue} isConsult />
                        </Col>
                    </Row>
                </Container>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                    <Alert onClose={handleCloseSnackBar} severity={snackbarType} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
}

export default ConsultaPage;