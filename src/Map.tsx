/*
 * Copyright (C) 2022 Soham Pardeshi.  All rights reserved.  Permission is
 * hereby granted to students registered for University of Washington
 * CSE 331 for use solely during Summer Quarter 2022 for purposes of
 * the course.  No other use, copying, distribution, or modification
 * is permitted without prior written consent. Copyrights for
 * third-party components of this work must be honored.  Instructors
 * interested in reusing these course materials should contact the
 * author.
 */

import { LatLngExpression } from "leaflet";
import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLine from "./MapLine";
import { UW_LATITUDE_CENTER, UW_LONGITUDE_CENTER } from "./Constants";

// This defines the location of the map. These are the coordinates of the UW Seattle campus
const position: LatLngExpression = [UW_LATITUDE_CENTER, UW_LONGITUDE_CENTER];

interface MapProps {
    onSet: Array<string[]> | undefined //Current set of all edges(already parsed into a simple form)
}

interface MapState {

}

class Map extends Component<MapProps, MapState> {

    //Returns an Array Mapline tags so more than one can be rendered in render()
    handleLines(value: Array<string[]> | undefined) {
        if (value !== undefined) {
            let change: JSX.Element[] = [];
            for (let i = 0; i < value.length; i++) {
                let current = value[i];
                change.push(
                    <MapLine key={i} color={current[4]} x1={Number(current[0])} y1={Number(current[1])}
                                 x2={Number(current[2])} y2={Number(current[3])}/>
                );
            }
            return change;
        }
    }

    render() {
        let original: JSX.Element[] = [];
            original.push(
                <div id="map">
                    <MapContainer
                        center={position}
                        zoom={15}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            this.handleLines(this.props.onSet)
                        }
                    </MapContainer>
                </div>
            )
        return original;
    }
}

export default Map;
