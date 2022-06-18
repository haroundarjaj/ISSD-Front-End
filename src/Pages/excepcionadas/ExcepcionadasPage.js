/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Breadcrumb, BreadcrumbItem, Input, Row, Col } from 'reactstrap';
import MapComponent from '../../Components/MapComponent';
import { withStyles } from '@mui/styles';
import { Alert, Dialog, List, ListItem, ListItemButton, ListItemText, Paper, Snackbar, Typography, Zoom } from '@mui/material';
import { alpha } from "@mui/material";
import MapDataForm from '../../Components/MapDataForm';
import ConfirmationDialog from '../../Components/ConfirmationDialog';
import AddressServices from '../../Services/AddressServices';
import GoogleAPIServices from '../../Services/GoogleAPIServices';

const PaperStyled = withStyles(theme => ({
    root: {
        backgroundColor: `${alpha("#1E1E2F", 0.5)} !important`,
        width: '100%',
        margin: '5px 0px 0px 0px',
        overflow: 'auto',
        height: 117
    },
}))(Paper);

const ExcepcionadasPage = (props) => {
    const { id } = useParams();

    const [selectedDirection, setSelectedDirection] = useState(null);
    const [isOpenSaveConfirmation, setIsOpenSaveConfirmation] = useState(false);
    const [isOpenIndeterminateConfirmation, setIsOpenIndeterminateSaveConfirmation] = useState(false);
    const [addressesData, setAddressesData] = useState([]);
    const [infoValue, setInfoValue] = useState('');
    const [formData, setFormData] = useState(null);
    const [markerCoord, setMarkerCoord] = useState(null);
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const zoom = 15;

    const handleChangeMarkerCoord = (coord) => {
		console.log("/////////////////////////////////////////")							   
        console.log(coord)
        setMarkerCoord(coord)
		handleDragEndMarker(coord)
    }
const handleDragEndMarker = (coord) => {
        console.log(coord)
		console.log("------------------------------------")
        setMarkerCoord(coord.latLng)
		console.log("-----------------------------------")
		const geocoder = new window.google.maps.Geocoder();
		geocoder.geocode({ latLng: coord }).then((response) =>{
			const { results } = response
			console.log(response)
			const address_components = results[0].address_components;
                var components = {};
                address_components.forEach(v1 => {
                    v1.types.forEach(v2 => {
                        components[v2] = v1.long_name
                    })
                });
				var formato = results[0].formatted_address.split(",");
                //console.log(formato[formato.length - 4])
                //console.log(formato)
                //console.log(components)
                var lnumero = null;
				for (var cc = 0; cc < results.length; cc++) {
                    var address_components1 = results[cc].address_components;
                    components = {}
                    address_components1.forEach(v1 => {
                        v1.types.forEach(v2 => {
                            components[v2] = v1.long_name
                        })
                    });
                    var elmuni = null;
                    if (components.administrative_area_level_2 != null) {
                        elmuni = components.administrative_area_level_2
                    }
                    if (components.administrative_area_level_3 != null) {
                        elmuni = components.administrative_area_level_3
                    }
                    if (components.route != null) {
                        var lcalle = components.route
                    }
                    //console.log(components.street_number)
                    if (components.street_number != null && lnumero == null) {
                        lnumero = components.street_number
                    }
                    if (components.sublocality != null) {
                        var lcolonia = components.sublocality
                    }
                }
				components = {};
                address_components.forEach(v1 => {
                    v1.types.forEach(v2 => {
                        components[v2] = v1.long_name
                    })
                });

                if (elmuni == null) {
                    elmuni = formato[formato.length - 4]
                }
				//console.log("QQQQQQQQQQQQQQQQQQQQQqq " + lcalle)
                //console.log(components.country);
                var nivel_tipo_calle = null;
                var ncalle = null;
				if (lcalle.includes("Avenida")) {
                    nivel_tipo_calle = "Avenida";
                    ncalle = lcalle
                    lcalle = ncalle.slice(8)
                } else if (lcalle.includes("Calle")) {
                    nivel_tipo_calle = "Calle";
                    ncalle = lcalle
                    lcalle = ncalle.slice(6)
                } else if (lcalle.includes("Callejón")) {
                    nivel_tipo_calle = "Callejón";
                    ncalle = lcalle
                    lcalle = ncalle.slice(8)
                } else if (lcalle.includes("Prolongacion")) {
                    nivel_tipo_calle = "Prolongacion";
                    ncalle = lcalle
                    lcalle = ncalle.slice(13)
                } else if (lcalle.includes("Prolongación")) {
                    nivel_tipo_calle = "Prolongación";
                    ncalle = lcalle
                    lcalle = ncalle.slice(13)
                } else if (lcalle.includes("Callejon")) {
                    nivel_tipo_calle = "Callejon";
                    ncalle = lcalle
                    lcalle = ncalle.slice(8)
                } else if (lcalle.includes("Andador")) {
                    nivel_tipo_calle = "Andador";
                    ncalle = lcalle
                    lcalle = ncalle.slice(8)
                } else if (lcalle.includes("Carretera")) {
                    nivel_tipo_calle = "Carretera";
                    ncalle = lcalle
                    lcalle = ncalle.slice(10)
                } else if (lcalle.includes("Viaducto")) {
                    nivel_tipo_calle = "Viaducto";
                    ncalle = lcalle
                    lcalle = ncalle.slice(9)
                } else if (lcalle.includes("Autopista")) {
                    nivel_tipo_calle = "Autopista";
                    ncalle = lcalle
                    lcalle = ncalle.slice(10)
                } else if (lcalle.includes("Calzada")) {
                    nivel_tipo_calle = "Calzada";
                    ncalle = lcalle
                    lcalle = ncalle.slice(8)
                } else if (lcalle.includes("Cerrada")) {
                    nivel_tipo_calle = "Cerrada";
                } else if (lcalle.includes("Boulevard")) {
                    nivel_tipo_calle = "Boulevard";
                } else {
                    nivel_tipo_calle = "";
                }
                //console.log(coord.latLng)

				let source= {
                        nivel_1: components.administrative_area_level_1,
                        nivel_2: elmuni,
                        nivel_3: lcolonia,
                        nivel_4: nivel_tipo_calle,
                        nivel_5: lcalle,
                        nivel_6: lnumero,
                        nivel_7: components.postal_code,
                        latitud: coord.lat,
                        longitud: coord.lng
                    }
					setSelectedDirection(source)
					console.log(source)
		console.log("----------------------------------");
		})
	}
	
    const handleSearchItemClick = item => {
        setSelectedDirection(item)
        setMarkerCoord(null)
    }


    const handleInfoChanged = (value) => {
        //setInfoValue(value);
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
        AddressServices.getById(id).then((res) => {
            //console.log(res.data)
            //setSelectedDirection(res.data[0])
            //console.log(res.data[0]['ID_DOMICILIO_RNUM'])
            const address = res.data[0];
            var dirnom = address['SUBTITULO'] + " " + address['CALLE'] + " " + address['NUMERO'] + " " + address['CIUDAD'] + " " + address['ESTADO']
            setInfoValue(dirnom)

            var cambio = "";
            if (address['ESTADO'] !== formData.lestado.toUpperCase()) {
                cambio = cambio + "E"
            }
            if (address['CIUDAD'] !== formData.elmuni.toUpperCase()) {
                cambio = cambio + "C"
            }
            if (address['COLONIA'] !== formData.lcolonia.toUpperCase()) {
                cambio = cambio + "B"
            }
            if (address['TERMINAL_LATITUD'] !== formData.llat || address['TERMINAL_LONGITUD'] !== formData.llng) {
                cambio = cambio + "L"
            }
            if (address['CODIGO_POSTAL'] !== formData.lpostal.toUpperCase()) {
                cambio = cambio + "P"
            }
            if (address['CALLE'] !== formData.lcalle.toUpperCase()) {
                cambio = cambio + "S"
            }


            console.log(cambio)
            console.log(formData)
            const params = {
                'estado': formData.lestado.toUpperCase(),
                'ciudad': formData.elmuni.toUpperCase(),
                'municipio': formData.elmuni.toUpperCase(),
                'colonia': formData.lcolonia.toUpperCase(),
                'tcalle': formData.tipoCalle.toUpperCase(),
                'calle': formData.lcalle.toUpperCase(),
                'numero': formData.lnumero,
                'codigo_postal': formData.lpostal.toUpperCase(),
                'lat': formData.llat,
                'lng': formData.llng,
                'codigo': cambio
            }
            AddressServices.actualizeAddress(id, params).then((res) => {
                console.log(res);
                handleShowSnackBar('success', 'Registro actualizado correctamente')
                handleCloseConfirmationDialog()
            }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor') });
        }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor') })
    }

    const handleConfirmIndeterminating = () => {
        const query = {};
        AddressServices.confirmIndeterminate(id, query).then((res) => {
            handleShowSnackBar('success', 'Registro actualizado correctamente')
        }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor') });
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
		//console.log("222222222222222222222222222222222")
		console.log(selectedDirection)
        if (selectedDirection) {
			try{
				var llat = selectedDirection.latitud();
				return{
					
					lat: parseFloat(selectedDirection.latitud()),
                    lng: parseFloat(selectedDirection.longitud())
				}
			}
			catch{
				if(selectedDirection.latitud)
			{
				console.log("333333333333333333333333333333333333333333")
				return{
					lat: parseFloat(selectedDirection.latitud),
                    lng: parseFloat(selectedDirection.longitud)
				}
				
			}
				else if (selectedDirection.address_components) {
                return {
                    lat: parseFloat(selectedDirection.geometry.location.lat),
                    lng: parseFloat(selectedDirection.geometry.location.lng)
                }
            } else if(selectedDirection._source) {
				console.log("55555555555555555555555555555")
                return {
                    lat: parseFloat(selectedDirection._source.latitud),
                    lng: parseFloat(selectedDirection._source.longitud)
                }
            }
        }
		}
        return { lat: parseFloat(0.0), lng: parseFloat(0.0) };
    }

    const geocoder = (dir) => {
        GoogleAPIServices.googleGeoCoder(dir[0]['TERMINAL_LONGITUD'], dir[0]['TERMINAL_LATITUD']).then((res) => {
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
        }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor de Google') });
    }

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    }

    const handleShowSnackBar = (type, message) => {
        setSnackbarType(type);
        setSnackbarMessage(message);
        setOpenSnackBar(true);
    }

    useEffect(() => {
        /* const query = {
            query: {
                match: {
                    "_id": id
                }
            },
            size: 5
        }; */
        AddressServices.getById(id).then((res) => {
            var dirnom = res.data[0]['SUBTITULO'] + " " + res.data[0]['CALLE'] + " " + res.data[0]['NUMERO'] + " " + res.data[0]['CIUDAD'] + " " + res.data[0]['ESTADO']
            setInfoValue(dirnom)
            geocoder(res.data)
        }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor') });
    }, []);

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
                            {addressesData.map((row, index) =>

                                <ListItem dense disablePadding onClick={() => handleSearchItemClick(row)} style={testSelection(row) ? { backgroundColor: 'gray' } : {}}>
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
                                <MapComponent location={markerCoord ? markerCoord : getLocationCoord()} zoom={zoom} handleChangeMarkerCoord={handleChangeMarkerCoord} />
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
                                dirnorm={infoValue}
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
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity={snackbarType} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
export default ExcepcionadasPage;