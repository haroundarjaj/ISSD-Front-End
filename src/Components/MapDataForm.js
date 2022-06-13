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
import $ from 'jquery'
import { useParams } from 'react-router-dom';




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
        //console.log('aqui va la data',data);
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
	console.log("se le dio click")
	const { id } = useParams();
    console.log(data)
	var dirnorm = ""
	function ccb()
	{
		console.log("si cambia")
		window.$dirnorm="ssss"
	}
	//-----------------------------------------------------
	var elmuni ="";
			var lcalle ="";
			var lnumero ="";
			var lcolonia="";
			var lpostal="";
			var lestado ="";
			var llat="";
			var llng="";
			
	if(data !=undefined && data.address_components!= undefined)
	{
	
		console.log(data)
			
		var address_components = data.address_components;
						//console.log(results[2].address_components);
	
						var components={};
							for(var cc=0; cc<data.address_components.length;cc++)
						{
							var address_components1 = data.address_components;
							var components1 = {}
							//console.log(address_components1[cc])
							$.each(address_components1,function(k,v1) {$.each(v1.types,function(k2, v2){components1[v2]=v1.long_name});});
							if(components1.administrative_area_level_2 != null)
							{
								elmuni = components1.administrative_area_level_2
							}
							if(components1.administrative_area_level_1 != null)
							{
								lestado = components1.administrative_area_level_1
							}
							if(components1.administrative_area_level_3 != null)
							{
								elmuni = components1.administrative_area_level_3
							}
							if(components1.locality != null)
							{
								elmuni = components1.locality
							}
							if(components1.route != null)
							{
								lcalle = components1.route
							}
							if(address_components1[cc].types[0] == 'street_number')
							{
								lnumero = components1.street_number
							}
							if(components1.sublocality != null)
							{
								lcolonia = components1.sublocality
							}
							if(components1.postal_code != null)
							{
								lpostal = components1.postal_code
							}
						}
						var components={};
                    $.each(address_components,function(k,v1) {$.each(v1.types,function(k2, v2){components[v2]=v1.long_name});});
					
					var formato = data.formatted_address.split(",");
						//console.log(formato[formato.length-4])
						//console.log(formato)
						
						if(elmuni == null)
						{
							elmuni = formato[formato.length-4]
						}
						console.log(data['geometry'].location)
						llat = data['geometry'].location.lat;
						llng =data['geometry'].location.lng;
	}
	else if(data!=null)
	{
		console.log(data)
		lestado = data._source.nivel_1
		elmuni = data._source.nivel_2
		lcolonia = data._source.nivel_3
		lcalle = data._source.nivel_5
		lnumero = data._source.nivel_6
		lpostal = data._source.nivel_7
		llat = data._source.latitud;
		llng =data._source.longitud;
	}
	console.log(elmuni)
	console.log(lestado)
	console.log(llat)
	var dirnorm = elmuni
	
					//console.log("QQQQQQQQQQQQQQQQQQQQQqq "+lcalle)
					//console.log(components.country);

	
	
	
	
	
	//------------------------------------------------------
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
                                    value={id}
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
                                    defaultValue={""}
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
                                    defaultValue={""}
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
                                {window.$dirnorm}
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
                                        register("nivel_estado").onChange(ccb());
                                    }}
                                    type="text"
                                    name="nivel_estado"
                                    id="nivel_estado"
                                    Placeholder="Estado"
                                    defaultValue={lestado}
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
                                    defaultValue={elmuni}
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
                                    defaultValue={lcolonia}
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
                                    defaultValue={""}
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
                                    defaultValue={lcalle}
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
                                    defaultValue={lnumero}
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
                                    defaultValue={lpostal}
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
                                    defaultValue={""}
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
                                    defaultValue={""}
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
                                    defaultValue={llat}
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
                                    defaultValue={llng}
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