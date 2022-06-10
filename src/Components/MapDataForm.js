/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody
} from 'reactstrap';
import { useForm } from "react-hook-form";

const MapDataForm = (props) => {
    const { data, handleInfoChanged, isConsult, openSaveConfirmation } = props;
    const {
        register,
        handleSubmit,
        reset,
        watch
    } = useForm();

    const onFormSubmit = (data) => {
        // this data needs some preparation before sending it to the server
        console.log(data);
        openSaveConfirmation(true)
    }

    useEffect(() => {
        const dirnorm = watch('nivel_tipo_calle') + " " + watch('nivel_calle') + " " + watch('nivel_numero') + " " + watch('nivel_colonia') + " " + watch('nivel_codigo_postal') + " " + watch('nivel_municipio') + " " + watch('nivel_estado');
        handleInfoChanged(dirnorm);
    }, [watch('nivel_tipo_calle'),
    watch('nivel_calle'),
    watch('nivel_numero'),
    watch('nivel_colonia'),
    watch('nivel_codigo_postal'),
    watch('nivel_municipio'),
    watch('nivel_estado')])

    useEffect(() => {
        reset(data)
    }, [data])

    console.log(watch('id'))
    console.log(register("id"))

    console.log(data?._id)
    return (
        <Card>
            <CardBody>
                <Form
                    id='mapDataForm'
                    onSubmit={handleSubmit(onFormSubmit)}
                >

                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>ID</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("id").ref}
                                    onChange={(e) => {
                                        register("id").onChange(e);
                                    }}
                                    type="text"
                                    name="id"
                                    id="id"
                                    Placeholder="ID"
                                    value={data?._id}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Estado de Normalización</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("estado_normalizacion").ref}
                                    onChange={(e) => {
                                        register("estado_normalizacion").onChange(e);
                                    }}
                                    type="text"
                                    name="estado_normalizacion"
                                    id="estado_normalizacion"
                                    Placeholder="Tipo"
                                    defaultValue={data?._source.estado_normalizacion}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Tipo de Normalización</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("tipo").ref}
                                    onChange={(e) => {
                                        register("tipo").onChange(e);
                                    }}
                                    type="select"
                                    name="tipo"
                                    id="tipo"
                                    defaultValue={data?._source.tipo?.toUpperCase()}
                                    style={{ backgroundColor: "#1F2251" }}
                                >
                                    <option style={{ backgroundColor: "#1F2251" }}>EXCEPCIONADA</option>
                                    <option style={{ backgroundColor: "#1F2251" }}>NORMALIZADA GOOGLE</option>
                                    <option style={{ backgroundColor: "#1F2251" }}>NORMALIZADA CARTO</option>
                                </Input>
                            </div>
                        </div>
                    </FormGroup>
                    <div className="row">
                        <div className="col-md-3">
                            <Label>Direccion Normalizada</Label>
                        </div>
                        <div className="col" colSpan="4" style={{ paddingLeft: 30, paddingRight: 10 }}>
                            <h6>
                                {data?._source.direccion_normalizada}
                            </h6>
                        </div>
                    </div>
                    <br />
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Estado</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("nivel_estado").ref}
                                    onChange={(e) => {
                                        register("nivel_estado").onChange(e);
                                    }}
                                    type="text"
                                    name="nivel_estado"
                                    id="nivel_estado"
                                    Placeholder="Estado"
                                    defaultValue={data?._source.nivel_1}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Municipio</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("nivel_municipio").ref}
                                    onChange={(e) => {
                                        register("nivel_municipio").onChange(e);
                                    }}
                                    type="text"
                                    name="nivel_municipio"
                                    id="nivel_municipio"
                                    Placeholder="Municipio"
                                    defaultValue={data?._source.nivel_2}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Colonia</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("nivel_colonia").ref}
                                    onChange={(e) => {
                                        register("nivel_colonia").onChange(e);
                                    }}
                                    type="text"
                                    name="nivel_colonia"
                                    id="nivel_colonia"
                                    Placeholder="Colonia"
                                    defaultValue={data?._source.nivel_3}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Tipo Calle</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("nivel_tipo_calle").ref}
                                    onChange={(e) => {
                                        register("nivel_tipo_calle").onChange(e);
                                    }}
                                    type="text"
                                    name="nivel_tipo_calle"
                                    id="nivel_tipo_calle"
                                    Placeholder="Tipo Calle"
                                    defaultValue={data?._source.nivel_4}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Calle</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("nivel_calle").ref}
                                    onChange={(e) => {
                                        register("nivel_calle").onChange(e);
                                    }}
                                    type="text"
                                    name="nivel_calle"
                                    id="nivel_calle"
                                    Placeholder="Nombre Calle"
                                    defaultValue={data?._source.nivel_5}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Número</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("nivel_numero").ref}
                                    onChange={(e) => {
                                        register("nivel_numero").onChange(e);
                                    }}
                                    type="text"
                                    name="nivel_numero"
                                    id="nivel_numero"
                                    Placeholder="Nivel Numero"
                                    defaultValue={data?._source.nivel_6}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Codigo Postal</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("nivel_codigo_postal").ref}
                                    onChange={(e) => {
                                        register("nivel_codigo_postal").onChange(e);
                                    }}
                                    type="text"
                                    name="nivel_codigo_postal"
                                    id="nivel_codigo_postal"
                                    Placeholder="Codigo Postal"
                                    defaultValue={data?._source.nivel_7}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Fecha Inserción</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("fecha_insercion").ref}
                                    onChange={(e) => {
                                        register("fecha_insercion").onChange(e);
                                    }}
                                    type="text"
                                    name="fecha_insercion"
                                    id="fecha_insercion"
                                    Placeholder="Fecha Inserción"
                                    defaultValue={data?._source.fecha_insercion}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Fecha Último Cambio</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("fecha_ultimo_cambio").ref}
                                    onChange={(e) => {
                                        register("fecha_ultimo_cambio").onChange(e);
                                    }}
                                    type="text"
                                    name="fecha_ultimo_cambio"
                                    id="fecha_ultimo_cambio"
                                    Placeholder="Fecha Último Cambio"
                                    defaultValue={data?._source.fecha_ultimo_cambio}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Lat</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("latitud").ref}
                                    onChange={(e) => {
                                        register("latitud").onChange(e);
                                    }}
                                    type="text"
                                    name="latitud"
                                    id="latitud"
                                    Placeholder="Lat"
                                    defaultValue={data?._source.latitud}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="row">
                            <div className="col-md-3">
                                <Label>Long</Label>
                            </div>
                            <div className="col" colSpan="4">
                                <Input
                                    innerRef={register("longitud").ref}
                                    onChange={(e) => {
                                        register("longitud").onChange(e);
                                    }}
                                    type="text"
                                    name="longitud"
                                    id="longitud"
                                    Placeholder="Long"
                                    defaultValue={data?._source.longitud}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    {!isConsult && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button color="warning">
                            Indeterminada
                        </Button>
                        <Button form='mapDataForm' color="primary" type="submit">
                            Guardar
                        </Button>
                    </div>}
                </Form>
            </CardBody>
        </Card >);
}

export default MapDataForm;