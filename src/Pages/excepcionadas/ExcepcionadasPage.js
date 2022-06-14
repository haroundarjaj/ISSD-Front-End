import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Breadcrumb, BreadcrumbItem, Input, Row, Col } from 'reactstrap';
import MapComponent from '../../Components/Map/MapComponent';
import axios from 'axios';
import { API } from '../../Config/apiUrl';
import { withStyles } from '@mui/styles';
import { Dialog, Divider, List, ListItem, ListItemButton, ListItemText, Paper, Typography, Zoom } from '@mui/material';
import { alpha } from "@mui/material";
import MapDataForm from '../../Components/MapDataForm';
import ConfirmationDialog from '../../Components/ConfirmationDialog';
import { Map, GoogleApiWrapper } from 'google-maps-react';





const options = {
  method: 'GET',
  url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
  params: {latlng: '40.714224,-73.96145', language: 'en'},
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
 
//window.$texto = ""
var $dir= ""

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
function geocoder(dir){
	axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=`+dir[0]['TERMINAL_LONGITUD']+`,`+dir[0]['TERMINAL_LATITUD']+`&key=AIzaSyDoLzHyM8TTL2LnInXa18HrrrdY2gG4CbE`, {

        }).then((res) => {
			console.log(res.data.results)
			setSelectedDirection(res.data.results[0])
			var rr = [0]
			rr  = res.data.results
			console.log(rr)
			delete rr[rr.length-1]
			delete rr[rr.length-2]
			setAddressesData(rr)
			console.log("---------------------------------",rr.length)
			console.log(rr[0])
        })
}
function regeocoder(texto)
{
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=`+texto+`&key=AIzaSyDoLzHyM8TTL2LnInXa18HrrrdY2gG4CbE`, {

        }).then((res) => {
			console.log(res.data.results)
			setSelectedDirection(res.data.results[0])
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
        axios.get(`http://localhost:9090/api/consulta/`+id, {

        }).then((res) => {
			console.log(res.data)
            //setSelectedDirection(res.data[0])
            console.log(res.data[0]['ID_DOMICILIO_RNUM'])
			{var texto = res.data[0]['SUBTITULO']+" "+res.data[0]['CALLE']+" "+res.data[0]['NUMERO']+" "+res.data[0]['CIUDAD']+" "+res.data[0]['ESTADO']}
			window.texto =texto = res.data[0]['SUBTITULO']+" "+res.data[0]['CALLE']+" "+res.data[0]['NUMERO']+" "+res.data[0]['CIUDAD']+" "+res.data[0]['ESTADO']
			 //regeocoder(texto)
			 geocoder(res.data)
			 
			
        })
		//-----------------------------------
		
		//------------------------------------
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
                        value={window.texto}
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
                                            primary={<Typography variant="body2">{row.formatted_address}</Typography>} />
                                    </ListItemButton>
                                </ListItem>)}
                        </List>
                    </PaperStyled>
                    <br />
                    <Row>
                        <Col>
                            {selectedDirection ?
                                <MapComponent location={{ lat: parseFloat(0.0), lng: parseFloat(0.0) }} zoom={zoom} handleDragEndMarker={handleDragEndMarker} />
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
                            confirmButtonText: 'Sí Seguro',
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