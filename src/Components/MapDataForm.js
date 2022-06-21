/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    Label,
    Input,
    Button,
    Card,
    CardBody
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backendAPI } from '../Config/apiUrl';




const MapDataForm = (props) => {
    const {
        data,
        handleInfoChanged,
        isConsult,
        openSaveConfirmation,
        openIndeterminateConfirmation,
        markerCoord,
        dirnorm
    } = props;

    const [addressId, setAddressId] = useState('')
    const [estadoNormalizacion, setEstadoNormalizacion] = useState('')
    const [tipo, setTipo] = useState('')
    const [lestado, setLestado] = useState('')
    const [elmuni, setElmuni] = useState('')
    const [lcolonia, setLcolonia] = useState('')
    const [tipoCalle, setTipoCalle] = useState('');
    const [lcalle, setLcalle] = useState('')
    const [lnumero, setLnumero] = useState('')
    const [lpostal, setLpostal] = useState('')
    const [fechaInsercion, setFechaInsercion] = useState('')
    const [fechaCambio, setFechaCambio] = useState('')
    const [llat, setLlat] = useState('')
    const [llng, setLlng] = useState('')

    const { id } = useParams();

    const onSaveClick = () => {
        // this data needs some preparation before sending it to the server
        //console.log('aqui va la data',data);
        const formData = {
            id,
            estadoNormalizacion,
            tipo,
            lestado,
            elmuni,
            lcolonia,
            tipoCalle,
            lcalle,
            lnumero,
            lpostal,
            fechaInsercion,
            fechaCambio,
            llat,
            llng
        }
        console.log(formData);
        openSaveConfirmation(formData);
    }

    const onIndeterminateClick = () => {
        openIndeterminateConfirmation();
    }

    useEffect(() => {
        if (id) {
            setAddressId(id);
        }
        else setAddressId('');

    }, [])

    useEffect(() => {
        if (markerCoord) {
            setLlat(markerCoord.lat)
            setLlng(markerCoord.lng)
        }
    }, [markerCoord])

    useEffect(() => {
        const dirnorm = tipoCalle + " " + lcalle + " " + lnumero + " " + lcolonia + " " + lpostal + " " + elmuni + " " + lestado;
        handleInfoChanged(dirnorm);
    }, [tipoCalle, lcalle, lnumero, lcolonia, lpostal, elmuni, lestado])

    useEffect(() => {
        console.log("//////////////////////////////////7")
        console.log(data)
        var elmuni1 = "";
        var lcalle1 = "";
        var lnumero1 = "";
        var lcolonia1 = "";
        var lpostal1 = "";
        var lestado1 = "";
        var llat1 = "";
        var llng1 = "";
        var tipoCalle1 = "";
        var addressId1 = "";
        var tipo1 = "";
        var fechaInsercion1 = "";
        var fechaCambio1 = "";
        var estadoNormalizacion1 = "";

        if (data && data._source && data._source.id_sw) {
            setLestado(data._source.nivel_1)
            setElmuni(data._source.nivel_2)
            setLcolonia(data._source.nivel_3)
            setLcalle(data._source.nivel_5)
            setLnumero(data._source.nivel_6)
            setLpostal(data._source.nivel_7)
            setLlat(data._source.latitud)
            setLlng(data._source.longitud)
            setTipoCalle(data._source.nivel_4)

        } else if (data && data.address_components) {

            console.log(data._source)

            var address_components = data.address_components;
            //console.log(results[2].address_components);

            var components = {};
            for (var cc = 0; cc < data.address_components.length; cc++) {
                var address_components1 = data.address_components;
                var components1 = {}
                //console.log(address_components1[cc])
                // eslint-disable-next-line no-loop-func
                address_components1.forEach(v1 => {
                    v1.types.forEach(v2 => {
                        components1[v2] = v1.long_name
                    })
                })
                if (components1.administrative_area_level_2 != null) {
                    elmuni1 = components1.administrative_area_level_2
                }
                if (components1.administrative_area_level_1 != null) {
                    lestado1 = components1.administrative_area_level_1
                }
                if (components1.administrative_area_level_3 != null) {
                    elmuni1 = components1.administrative_area_level_3
                }
                if (components1.locality != null) {
                    elmuni1 = components1.locality
                }
                if (components1.route != null) {
                    lcalle1 = components1.route
                }
                if (address_components1[cc].types[0] === 'street_number') {
                    lnumero1 = components1.street_number
                }
                if (components1.sublocality != null) {
                    lcolonia1 = components1.sublocality
                }
                if (components1.postal_code != null) {
                    lpostal1 = components1.postal_code
                }
            }
            address_components.forEach(v1 => {
                v1.types.forEach(v2 => {
                    components[v2] = v1.long_name
                })
            })
            var formato = data.formatted_address.split(",");
            //console.log(formato[formato.length-4])
            //console.log(formato)
            var ncalle = null;
            if (lcalle.includes("Avenida")) {
                tipoCalle1 = "Avenida";
                ncalle = lcalle
                lcalle1 = ncalle.slice(8)
            } else if (lcalle.includes("Calle")) {
                tipoCalle1 = "Calle";
                ncalle = lcalle
                lcalle1 = ncalle.slice(6)
            } else if (lcalle.includes("Callejón")) {
                tipoCalle1 = "Callejón";
                ncalle = lcalle
                lcalle1 = ncalle.slice(8)
            } else if (lcalle.includes("Prolongacion")) {
                tipoCalle1 = "Prolongacion";
                ncalle = lcalle
                lcalle1 = ncalle.slice(13)
            } else if (lcalle.includes("Prolongación")) {
                tipoCalle1 = "Prolongación";
                ncalle = lcalle
                lcalle1 = ncalle.slice(13)
            } else if (lcalle.includes("Callejon")) {
                tipoCalle1 = "Callejon";
                ncalle = lcalle
                lcalle1 = ncalle.slice(8)
            } else if (lcalle.includes("Andador")) {
                tipoCalle1 = "Andador";
                ncalle = lcalle
                lcalle1 = ncalle.slice(8)
            } else if (lcalle.includes("Carretera")) {
                tipoCalle1 = "Carretera";
                ncalle = lcalle
                lcalle1 = ncalle.slice(10)
            } else if (lcalle.includes("Viaducto")) {
                tipoCalle1 = "Viaducto";
                ncalle = lcalle
                lcalle1 = ncalle.slice(9)
            } else if (lcalle.includes("Autopista")) {
                tipoCalle1 = "Autopista";
                ncalle = lcalle
                lcalle1 = ncalle.slice(10)
            } else if (lcalle.includes("Calzada")) {
                tipoCalle1 = "Calzada";
                ncalle = lcalle
                lcalle1 = ncalle.slice(8)
            } else if (lcalle.includes("Cerrada")) {
                tipoCalle1 = "Cerrada";
            } else if (lcalle.includes("Boulevard")) {
                tipoCalle1 = "Boulevard";
            } else {
                tipoCalle1 = "";
            }

            if (elmuni1 == null) {
                elmuni1 = formato[formato.length - 4]
            }
            console.log(data['geometry'].location)
            llat1 = data['geometry'].location.lat;
            llng1 = data['geometry'].location.lng;
            setLestado(lestado1)
            setElmuni(elmuni1)
            setLcolonia(lcolonia1)
            setLcalle(lcalle1)
            setLnumero(lnumero1)
            setLpostal(lpostal1)
            setLlat(llat1)
            setLlng(llng1)
            setTipoCalle(tipoCalle1)
            if (data.id < 3)
                setTipo("Manual por coordenadas cliente")
            else
                setTipo("Manual por sugerencia Google")
        }
        else if (data != null) {
            axios.get(`${backendAPI}/api/consulta/` + id, {

            }).then((res) => {
                //console.log(res.data)
                //setSelectedDirection(res.data[0])
                //console.log(res.data[0]['ID_DOMICILIO_RNUM'])
                var dirnom = res.data[0]['SUBTITULO'] + " " + res.data[0]['CALLE'] + " " + res.data[0]['NUMERO'] + " " + res.data[0]['CIUDAD'] + " " + res.data[0]['ESTADO']
                handleInfoChanged(dirnom);
                window.tcalle = res.data[0]['SUBTITULO'];
                window.calle = res.data[0]['CALLE']
                window.numero = res.data[0]['NUMERO']
                window.ciudad = res.data[0]['CIUDAD']
                window.estado = res.data[0]['ESTADO']
                window.colonia = res.data[0]['COLONIA']
                window.postal = res.data[0]['CODIGO_POSTAL']
                window.$postal = res.data[0]['CODIGO_POSTAL'] + ""
                var tpostal = window.$postal.substring(0, 5)
                setLestado(res.data[0]['ESTADO'])
                setElmuni(res.data[0]['CIUDAD'])
                setLcolonia(res.data[0]['COLONIA'])
                setLcalle(res.data[0]['CALLE'])
                setLnumero(res.data[0]['NUMERO'])
                setLpostal(tpostal)
                if (data.latitud) {
                    setLlat(data.latitud)
                    setLlng(data.longitud)
                }
                else {
                    setLlat(data.latitud())
                    setLlng(data.longitud())
                }
                setTipoCalle(res.data[0]['SUBTITULO'])
                setTipo('Manual por Marcador')
            })

            //setTipoCalle(ltipocalle)
        }

        /*setLestado(lestado1)
        setElmuni(elmuni1)
        setLcolonia(lcolonia1)
        setLcalle(lcalle1)
        setLnumero(lnumero1)
        setLpostal(lpostal1)
        setLlat(llat1)
        setLlng(llng1)
        setTipoCalle(tipoCalle1)
        setAddressId(addressId1)
        setTipo(tipo1)
        setFechaInsercion(fechaInsercion1)
        setFechaCambio(fechaCambio1)
        setEstadoNormalizacion(estadoNormalizacion1)*/
    }, [data])

    return (
        <Card>
            <CardBody>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>ID</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="id"
                            Placeholder="ID"
                            value={addressId}
                        />
                    </div>
                </div>

                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Tipo de Normalización</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="tipo"
                            Placeholder="Tipo"
                            value={tipo}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Direccion Normalizada</Label>
                    </div>
                    <div className="col" colSpan="4" style={{ paddingLeft: 30, paddingRight: 10 }}>
                        <h6>
                            {dirnorm}
                        </h6>
                    </div>
                </div>
                <br />
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Estado</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_estado"
                            Placeholder="Estado"
                            value={lestado}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Municipio</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_municipio"
                            Placeholder="Municipio"
                            value={elmuni}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Colonia</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_colonia"
                            Placeholder="Colonia"
                            value={lcolonia}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Tipo Calle</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_tipo_calle"
                            Placeholder="Tipo Calle"
                            value={tipoCalle}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Calle</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_calle"
                            Placeholder="Nombre Calle"
                            value={lcalle}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Número</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_numero"
                            Placeholder="Nivel Numero"
                            value={lnumero}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Codigo Postal</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_codigo_postal"
                            Placeholder="Codigo Postal"
                            value={lpostal}
                        />
                    </div>
                </div>
                {isConsult && <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Fecha Inserción</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="fecha_insercion"
                            Placeholder="Fecha Inserción"
                            value={fechaInsercion}
                        />
                    </div>
                </div>}
                {isConsult && <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Fecha Último Cambio</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="fecha_ultimo_cambio"
                            Placeholder="Fecha Último Cambio"
                            value={fechaCambio}
                        />
                    </div>
                </div>}
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Lat</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="latitud"
                            Placeholder="Lat"
                            value={llat}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Long</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="longitud"
                            Placeholder="Long"
                            value={llng}
                        />
                    </div>
                </div>
                {!isConsult && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button color="warning" onClick={onIndeterminateClick}>
                        Indeterminada
                    </Button>
                    <Button color="primary" onClick={onSaveClick}>
                        Guardar
                    </Button>
                </div>}
            </CardBody>
        </Card >);
}

export default MapDataForm;