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




const MapDataForm = (props) => {
    const { data, handleInfoChanged, isConsult, openSaveConfirmation } = props;

    const [estadoNormalizacion, setEstadoNormalizacion] = useState('')
    const [tipo, setTipo] = useState(null)
    const [lestado, setLestado] = useState('')
    const [elmuni, setElmuni] = useState('')
    const [lcolonia, setLcolonia] = useState('')
    const [tipoCalle, setTipoCalle] = useState('');
    const [lcalle, setLcalle] = useState('')
    const [lnumero, setLnumero] = useState('')
    const [lpostal, setLpostal] = useState('')
    const [fechaInsercion, setFechaInsercion] = useState(null)
    const [fechaCambio, setFechaCambio] = useState(null)
    const [llat, setLlat] = useState('')
    const [llng, setLlng] = useState('')

    const { id } = useParams();

    const onSubmit = () => {
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

    useEffect(() => {
        const dirnorm = tipoCalle + " " + lcalle + " " + lnumero + " " + lcolonia + " " + lpostal + " " + elmuni + " " + lestado;
        console.log('dirnorm', dirnorm)
        handleInfoChanged(dirnorm);
    }, [tipoCalle, lcalle, lnumero, lcolonia, lpostal, elmuni, lestado])

    useEffect(() => {
        var elmuni1 = "";
        var lcalle1 = "";
        var lnumero1 = "";
        var lcolonia1 = "";
        var lpostal1 = "";
        var lestado1 = "";
        var llat1 = "";
        var llng1 = "";

        console.log(data)

        if (data && data.address_components) {

            console.log(data)

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

            if (elmuni1 == null) {
                elmuni1 = formato[formato.length - 4]
            }
            console.log(data['geometry'].location)
            llat1 = data['geometry'].location.lat;
            llng1 = data['geometry'].location.lng;
        }
        else if (data != null) {
            console.log(data)
            lestado1 = data._source.nivel_1
            elmuni1 = data._source.nivel_2
            lcolonia1 = data._source.nivel_3
            lcalle1 = data._source.nivel_5
            lnumero1 = data._source.nivel_6
            lpostal1 = data._source.nivel_7
            llat1 = data._source.latitud;
            llng1 = data._source.longitud;
        }
        setLestado(lestado1)
        setElmuni(elmuni1)
        setLcolonia(lcolonia1)
        setLcalle(lcalle1)
        setLnumero(lnumero1)
        setLpostal(lpostal1)
        setLlat(llat1)
        setLlng(llng1)

        console.log(elmuni1)
        console.log(lestado1)
        console.log(llat1)
    }, [data])
    //-----------------------------------------------------

    //console.log("QQQQQQQQQQQQQQQQQQQQQqq "+lcalle1)
    //console.log(components.country);






    //------------------------------------------------------
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
                            value={id}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Estado de Normalización</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            onChange={(e) => {
                                setEstadoNormalizacion(e.target.value);
                            }}
                            type="text"
                            id="estado_normalizacion"
                            Placeholder="Tipo"
                            value={estadoNormalizacion}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Tipo de Normalización</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            onChange={(e) => {
                                setTipo(e.target.value);
                            }}
                            type="select"
                            id="tipo"
                            value={tipo}
                            style={{ backgroundColor: "#1F2251" }}
                        >
                            <option style={{ backgroundColor: "#1F2251" }}>EXCEPCIONADA</option>
                            <option style={{ backgroundColor: "#1F2251" }}>NORMALIZADA GOOGLE</option>
                            <option style={{ backgroundColor: "#1F2251" }}>NORMALIZADA CARTO</option>
                        </Input>
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Direccion Normalizada</Label>
                    </div>
                    <div className="col" colSpan="4" style={{ paddingLeft: 30, paddingRight: 10 }}>
                        <h6>
                            {window.$dirnorm}
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
                            onChange={(e) => {
                                setLestado(e.target.value);
                            }}
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
                            onChange={(e) => {
                                setElmuni(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setLcolonia(e.target.value);
                            }}
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
                            onChange={(e) => {
                                setTipoCalle(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setLcalle(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setLnumero(e.target.value);
                            }}
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
                            onChange={(e) => {
                                setLpostal(e.target.value)
                            }}
                            type="text"
                            id="nivel_codigo_postal"
                            Placeholder="Codigo Postal"
                            value={lpostal}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Fecha Inserción</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            onChange={(e) => {
                                setFechaInsercion(e.target.value)
                            }}
                            type="date"
                            id="fecha_insercion"
                            Placeholder="Fecha Inserción"
                            value={fechaInsercion}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Fecha Último Cambio</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            onChange={(e) => {
                                setFechaCambio(e.target.value)
                            }}
                            type="date"
                            id="fecha_ultimo_cambio"
                            Placeholder="Fecha Último Cambio"
                            value={fechaCambio}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Lat</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            onChange={(e) => {
                                setLlng(e.target.value);
                            }}
                            type="number"
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
                            onChange={(e) => {
                                setLlng(e.target.value);
                            }}
                            type="number"
                            id="longitud"
                            Placeholder="Long"
                            value={llng}
                        />
                    </div>
                </div>
                {!isConsult && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button color="warning">
                        Indeterminada
                    </Button>
                    <Button color="primary" onClick={onSubmit}>
                        Guardar
                    </Button>
                </div>}
            </CardBody>
        </Card >);
}

export default MapDataForm;