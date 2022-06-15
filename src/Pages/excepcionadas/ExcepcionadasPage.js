/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Breadcrumb, BreadcrumbItem, Input, Row, Col } from 'reactstrap';
import MapComponent from '../../Components/Map/MapComponent';
import axios from 'axios';
import { backendAPI } from '../../Config/apiUrl';
import { withStyles } from '@mui/styles';
import { Dialog, List, ListItem, ListItemButton, ListItemText, Paper, Typography, Zoom } from '@mui/material';
import { alpha } from "@mui/material";
import MapDataForm from '../../Components/MapDataForm';
import ConfirmationDialog from '../../Components/ConfirmationDialog';


function lxml() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'configuracion.xml', false);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var xmlasstring = rawFile.responseText;
                console.log('Your xml file as string', xmlasstring)
            }
        }
        console.log(rawFile.responseTex)
    }
}

const options = {
    method: 'GET',
    url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
    params: { latlng: '40.714224,-73.96145', language: 'en' },
    headers: {
        'X-RapidAPI-Key': 'AIzaSyDoLzHyM8TTL2LnInXa18HrrrdY2gG4CbE',
        'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com'
    }
};

const PaperStyled = withStyles(theme => ({
    root: {
        backgroundColor: `${alpha("#1E1E2F", 0.5)} !important`,
        width: '100%',
        margin: '5px 0px 0px 0px',
        overflow: 'auto',
        height: 117
    },
}))(Paper);

var $dir = ""

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
    const [isOpenSaveConfirmation, setIsOpenSaveConfirmation] = useState(false);
    const [isOpenIndeterminateConfirmation, setIsOpenIndeterminateSaveConfirmation] = useState(false);
    const [addressesData, setAddressesData] = useState([
        { _id: 'testid1', _source: { direccion_normalizada: 'address 1' } },
        { _id: 'testid2', _source: { direccion_normalizada: 'address 2' } },
        { _id: 'testid3', _source: { direccion_normalizada: 'address 3' } },
        { _id: 'testid4', _source: { direccion_normalizada: 'address 4' } },
        { _id: 'testid5', _source: { direccion_normalizada: 'address 5' } }
    ]);
    const [infoValue, setInfoValue] = useState('');
    const [formData, setFormData] = useState(null);
    const [markerCoord, setMarkerCoord] = useState(null);

    const zoom = 15;

    const handleDragEndMarker = (coord) => {
        console.log(coord)
        setMarkerCoord(coord)
    }

    const handleSearchItemClick = item => {
        setSelectedDirection(item)
        setMarkerCoord(null)
    }


    const handleInfoChanged = (value) => {
        setInfoValue(value);
    }

    const handleOpenSaveConfirmationDialog = (data) => {
        setFormData(data);
        setIsOpenSaveConfirmation(true)
    }

    const handleOpenIndeterminateConfirmationDialog = () => {
        setIsOpenIndeterminateSaveConfirmation(true)
    }

    const handleCloseConfirmationDialog = () => {
        setFormData(null);
        setIsOpenSaveConfirmation(false)
        setIsOpenIndeterminateSaveConfirmation(false)
    }

    const handleConfirmSaving = () => {
        console.log('****************************************************************');
        console.log('formData')
        console.log(formData);
        console.log('le diste en guardar')
        axios.get(`${backendAPI}/api/consulta/` + id, {

        }).then((res) => {
            //console.log(res.data)
            //setSelectedDirection(res.data[0])
            //console.log(res.data[0]['ID_DOMICILIO_RNUM'])
            var texto = res.data[0]['SUBTITULO'] + " " + res.data[0]['CALLE'] + " " + res.data[0]['NUMERO'] + " " + res.data[0]['CIUDAD'] + " " + res.data[0]['ESTADO']
            setInfoValue(texto)
            //regeocoder(texto)
            window.$resp = res;
            console.log(window.$resp)

        })
        console.log(window.$resp.data[0])
        var cambio = "";
        if (window.$resp.data[0]['ESTADO'] != formData.lestado.toUpperCase()) {
            cambio = cambio + "E"
            console.log(window.$resp['ESTADO'] + " " + formData.lestado.toUpperCase())
        }
        if (window.$resp.data[0]['CIUDAD'] != formData.elmuni.toUpperCase()) {
            cambio = cambio + "C"
        }
        if (window.$resp.data[0]['COLONIA'] != formData.lcolonia.toUpperCase()) {
            cambio = cambio + "B"
        }
        if (window.$resp.data[0]['TERMINAL_LATITUD'] != formData.llat || window.$resp.data[0]['TERMINAL_LONGITUD'] != formData.llng) {
            cambio = cambio + "L"
        }
        if (window.$resp.data[0]['CODIGO_POSTAL'] != formData.lpostal.toUpperCase()) {
            cambio = cambio + "P"
        }
        if (window.$resp.data[0]['CALLE'] != formData.lcalle.toUpperCase()) {
            cambio = cambio + "S"
        }


        console.log(cambio)
        console.log(formData)
        axios.post(`${backendAPI}/api/actualiza/` + id, null, {
            params: {
                'estado': formData.lestado.toUpperCase(),
                'ciudad': formData.elmuni.toUpperCase(),
                'municipio': formData.elmuni.toUpperCase(),
                'colonia': formData.lcolonia.toUpperCase(),
                'tcalle': formData.tipoCalle.toUpperCase(),
                'calle': formData.lcalle.toUpperCase(),
                'numero': formData.lnumero.toUpperCase(),
                'codigo_postal': formData.lpostal.toUpperCase(),
                'lat': formData.llat,
                'lng': formData.llng,
                'codigo': cambio
            }
        }).then((res) => {
            console.log(res);
            alert('Registro actualizado correctamente')
        });
        handleCloseConfirmationDialog()
    }

    const handleConfirmIndeterminating = () => {
        console.log('****************************************************************');
        console.log('indeterminate confirm')
        axios.put(`${backendAPI}/api/indetermina/` + id, {
            query: {
            }
        }).then((res) => {
            console.log(res);
            alert("SE ha intedetminado correctamente")
            console.log("registro actualizado correctamente")
        });
        handleCloseConfirmationDialog()
    }

    const testSelection = (item) => {
        let isSelected = false;
        if (selectedDirection) {
            if (item && item.address_components) {
                if (item.place_id === selectedDirection?.place_id) {
                    isSelected = true;
                }
            } else {
                if (item._id === selectedDirection?._id) {
                    isSelected = true;
                }
            }
        }
        return isSelected;
    }

    const getLocationCoord = () => {
        if (selectedDirection) {
            if (selectedDirection.address_components) {
                console.log(selectedDirection)
                return {
                    lat: parseFloat(selectedDirection.geometry.location.lat),
                    lng: parseFloat(selectedDirection.geometry.location.lng)
                }
            } else {
                console.log(selectedDirection)
                return {
                    lat: parseFloat(selectedDirection._source.latitud),
                    lng: parseFloat(selectedDirection._source.longitud)
                }
            }
        }
        return { lat: parseFloat(0.0), lng: parseFloat(0.0) };
    }

    function geocoder(dir) {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=` + dir[0]['TERMINAL_LONGITUD'] + `,` + dir[0]['TERMINAL_LATITUD'] + `&key=AIzaSyDoLzHyM8TTL2LnInXa18HrrrdY2gG4CbE`, {

        }).then((res) => {
            console.log(res.data.results)
            setSelectedDirection(res.data.results[0])
            setMarkerCoord(null)
            var rr = [0]
            rr = res.data.results
            console.log(rr)
            delete rr[rr.length - 1]
            delete rr[rr.length - 2]
            delete rr[rr.length - 3]
            delete rr[rr.length - 4]
            setAddressesData(rr)
            //console.log("---------------------------------", rr.length)
            //console.log(rr[0])
        })
    }
    function regeocoder(texto) {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=` + texto + `&key=AIzaSyDoLzHyM8TTL2LnInXa18HrrrdY2gG4CbE`, {

        }).then((res) => {
            console.log(res.data.results)
            setSelectedDirection(res.data.results[0])
            setMarkerCoord(null)
            setAddressesData(res.data.results)
        })


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
        axios.get(`${backendAPI}/api/consulta/` + id, {

        }).then((res) => {
            //console.log(res.data)
            //setSelectedDirection(res.data[0])
            //console.log(res.data[0]['ID_DOMICILIO_RNUM'])
            var texto = res.data[0]['SUBTITULO'] + " " + res.data[0]['CALLE'] + " " + res.data[0]['NUMERO'] + " " + res.data[0]['CIUDAD'] + " " + res.data[0]['ESTADO']
            setInfoValue(texto)
            //regeocoder(texto)
            geocoder(res.data)


        })
        //-----------------------------------
        console.log("------------------------------------------------------------------------")
        axios.get("/xml/configuracion.xml", {
            "Content-Type": "application/xml; charset=utf-8"
        })
            .then((response) => {
                console.log('Your xml file as string', response.data);
            });
        console.log("-------------------------------------------------------------------------------")
        //------------------------------------
    }, []);
    //console.log(MapComponent)

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
                            {addressesData.map((row, index) =>

                                <ListItem dense disablePadding onClick={() => handleSearchItemClick(row)} style={testSelection(row) ? { backgroundColor: 'gray' } : {}}>
                                    {/*//console.log('row._id', row._id)}
                                    {//console.log('selectedDirection?._id', selectedDirection?._id)}
                                    {//console.log('row._id', row)}
                                    {//console.log('selectedDirection?._id', selectedDirection)*/}
                                    <ListItemButton>
                                        <ListItemText
                                            primary={<Typography variant="body2" style={(index === 0 || index === 1 || index === 2) ? { color: '#e20000' } : {}}>{row.formatted_address}</Typography>} />
                                    </ListItemButton>
                                </ListItem>)}
                        </List>
                    </PaperStyled>
                    <br />
                    <Row>
                        <Col>
                            {selectedDirection ?
                                <MapComponent location={markerCoord ? markerCoord : getLocationCoord()} zoom={zoom} handleDragEndMarker={handleDragEndMarker} />
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
                            <MapDataForm
                                data={selectedDirection}
                                handleInfoChanged={handleInfoChanged}
                                openSaveConfirmation={handleOpenSaveConfirmationDialog}
                                openIndeterminateConfirmation={handleOpenIndeterminateConfirmationDialog}
                                markerCoord={markerCoord}
                            />
                        </Col>
                    </Row>
                </Container>
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={isOpenSaveConfirmation}
                    onClose={handleCloseConfirmationDialog}
                    scroll='paper'
                    PaperComponent={() =>
                        ConfirmationDialog({
                            title: 'Confirmación',
                            message: '¿Está seguro que esta dirección es la normalizada?',
                            confirmButton: true,
                            cancelButton: true,
                            confirmButtonText: 'Sí Seguro',
                            cancelButtonText: 'Cancelar',
                            handleConfirmAction: handleConfirmSaving,
                            handleCancelAction: handleCloseConfirmationDialog
                        })}
                    TransitionComponent={Zoom}
                />
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={isOpenIndeterminateConfirmation}
                    onClose={handleCloseConfirmationDialog}
                    scroll='paper'
                    PaperComponent={() =>
                        ConfirmationDialog({
                            title: 'Confirmación',
                            message: '¿Está seguro que esta dirección es indeterminada?',
                            confirmButton: true,
                            cancelButton: true,
                            confirmButtonText: 'Sí Seguro',
                            cancelButtonText: 'Cancelar',
                            handleConfirmAction: handleConfirmIndeterminating,
                            handleCancelAction: handleCloseConfirmationDialog
                        })}
                    TransitionComponent={Zoom}
                />
            </div>
        </>
    );
}
export default ExcepcionadasPage;