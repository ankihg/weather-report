import React from 'react';

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export class Map extends React.Component {
    render() {
        return (
            <ComposableMap style={{width: "600px", height: "400px"}}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                  }
                </Geographies>

                {
                    this.props.city && this.props.coordinates &&
                    <Marker key={this.props.city} coordinates={this.props.coordinates}>
                      <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
                      <text
                        textAnchor="middle"
                        y={15}
                        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}>
                        {this.props.city}
                      </text>
                    </Marker>
                }

            </ComposableMap>
        );
    }
}
