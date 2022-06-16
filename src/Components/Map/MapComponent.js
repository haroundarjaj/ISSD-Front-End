/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useMemo, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';
import { googleMapsApiKey } from '../../Config/apiUrl';
import { Dialog, Zoom } from '@mui/material';
import ConfirmationDialog from '../../Components/ConfirmationDialog';

const containerStyle = {
    width: '100%',
    height: '95vh'
};

const MapComponent = (props) => {
    const { location, zoom, handleChangeMarkerCoord, isConsult } = props;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsApiKey
    })

    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(null);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [streetViewCoord, setStreetViewCoord] = useState(null);

    useMemo(() => {
        setCenter({ lat: location.lat, lng: location.lng });
    }, [location]);

    const handleOpenConfirmationDialog = () => {
        setIsOpenConfirmation(true)
    }

    const handleCloseConfirmationDialog = () => {
        setIsOpenConfirmation(false)
    }

    const handleConfirmYes = () => {
        handleChangeMarkerCoord(streetViewCoord)
        setIsOpenConfirmation(false)
        setStreetViewCoord(null)

    }

    const handleStreetViewVisibilityChange = () => {
        if (!map?.streetView?.visible && !isConsult) {
            console.log("streetView visibility closed")
            handleOpenConfirmationDialog()
        }
    }

    const onPositionChanged = () => {
        console.log('onPositionChanged', map?.streetView?.position?.lat())
        console.log('onPositionChanged', map?.streetView?.position?.lng())
        setStreetViewCoord({ lat: map?.streetView?.position?.lat(), lng: map?.streetView?.position?.lng() })
    }

    console.log(props)

    const onDragEndMarker = (e) => {
        //setCenter(e.latLng)
        handleChangeMarkerCoord(e.latLng)
        /* const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ latLng: e.latLng })
            .then((response) => {
                const { results } = response
                console.log(results)
                const address_components = results[0].address_components;
                var components = {};
                address_components.forEach(v1 => {
                    v1.types.forEach(v2 => {
                        components[v2] = v1.long_name
                    })
                });

                var formato = results[0].formatted_address.split(",");
                console.log(formato[formato.length - 4])
                console.log(formato)
                console.log(components)
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
                    console.log(components.street_number)
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

                console.log("QQQQQQQQQQQQQQQQQQQQQqq " + lcalle)
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
                console.log(e.latLng)
                handleDragEndMarker({
                    _source: {
                        nivel_1: components.administrative_area_level_1,
                        nivel_2: elmuni,
                        nivel_3: lcolonia,
                        nivel_4: nivel_tipo_calle,
                        nivel_5: lcalle,
                        nivel_6: lnumero,
                        nivel_7: components.postal_code,
                        latitud: e.latLng.lat(),
                        longitud: e.latLng.lng()

                    }
                })
            }) */
    }

    const onLoad = React.useCallback(function callback(map) {
        console.log(location)
        setCenter(location);
        const bounds = new window.google.maps.LatLngBounds(location);
        console.log("map.getZoom(")
        console.log(map)
        map.setZoom(zoom);
        console.log(map.getZoom())
        console.log(map)
        map.fitBounds(bounds);
        var listener = window.google.maps.event.addListener(map, "idle", function () {
            map.setZoom(zoom);
            window.google.maps.event.removeListener(listener);
        });
        console.log('test test test ');

        var listener2 = window.google.maps.event.addListener(window.google.maps.StreetViewPanorama, 'position_changed', function () {
            console.log("position changed")
            console.log(window.google.maps.StreetViewPanorama.getPosition());
            window.google.maps.event.removeListener(listener2);
        })
        console.log(map)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    console.log(map)

    return isLoaded ?
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                defaultCenter={location}
                defaultZoom={zoom}
                center={center || location}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */}
                {(isConsult && JSON.stringify(center) === JSON.stringify({ lat: 0, lng: 0 })) ? <></>
                    : <Marker
                        position={center || location}
                        draggable={!isConsult}
                        onDragEnd={onDragEndMarker}
                    />}
                <StreetViewPanorama onPositionChanged={onPositionChanged}
                    onVisibleChanged={handleStreetViewVisibilityChange}
                />
            </GoogleMap>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={isOpenConfirmation}
                onClose={handleCloseConfirmationDialog}
                scroll='paper'
                PaperComponent={() =>
                    ConfirmationDialog({
                        title: 'Confirmación',
                        message: '¿Quieres mover el marcador a estas coordenadas?',
                        confirmButton: true,
                        cancelButton: true,
                        confirmButtonText: 'Sí Seguro',
                        cancelButtonText: 'Cancelar',
                        handleConfirmAction: handleConfirmYes,
                        handleCancelAction: handleCloseConfirmationDialog
                    })}
                TransitionComponent={Zoom}
            />
        </>
        : <></>
}
export default MapComponent;