import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div style={{fontSize:'3.5em'}}>{text}</div>;

export function ToyLocations() {

    const [coords,setCoords] = useState({lat: 32.0853, lng: 34.7818})

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    function handleClick({lat, lng}) {
        setCoords({lat, lng})
    }


    return (
        // Important! Always set the container height explicitly
        <section className="map-container">

        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCdg72hOrqcGWnRb_4GrZHD-ba2Xec5Mf4" }}
                center={coords}
                defaultZoom={11}
            >
                <AnyReactComponent
               {...coords}
                    text="📍"
                />
            </GoogleMapReact>
        </div>
        </section>
    );
}