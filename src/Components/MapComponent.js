/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useMemo, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';
import { googleMapsApiKey } from '../Config/apiUrl';
import { Dialog, Zoom } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';

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
		console.log(location)
		console.log("2222222222222222222222222222222222222222222")
		try{
			console.log("locacion3")
        setCenter({ lat: location.lat(), lng: location.lng() });
		console.log(location)
		}
		catch
		{
			console.log("locacion2")
			setCenter({ lat: location.lat, lng: location.lng });
			console.log(location)
		} 
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
        handleChangeMarkerCoord(e.latLng)
    }

    const onLoad = React.useCallback(function callback(map) {
        setCenter(location);
        const bounds = new window.google.maps.LatLngBounds(location);
        map.setZoom(zoom);
        map.fitBounds(bounds);

        var listener = window.google.maps.event.addListener(map, "idle", function () {
            map.setZoom(zoom);
            window.google.maps.event.removeListener(listener);
        });
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