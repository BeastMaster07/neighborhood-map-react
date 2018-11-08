import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import './App.css';

const blueMarker = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
const redMarker = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
const centerMap = { lat: 37.7749, lng: -122.4194 }; // San Francisco
const defZoom = 12;


const WrappedGoogleMap = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center}
  >
    {props.results.map((result) => {
      return (
        <Marker
          key={result.id}
          position={result.position}
          icon={result.open ? redMarker : blueMarker}
          onClick={() => props.onToggleResult(result)}
          >
          {result.open && <InfoWindow onCloseClick={() => props.onToggleResult(result)}>
            <div className="result-info-window">
              <h2 className="result-name">{result.name}</h2>
              <p className="result-details">{result.address}</p>
            </div>
          </InfoWindow>}
        </Marker>
      )
    })}
  </GoogleMap>
)

class ResultsMap extends Component {
  render() {
    return (
      <div className="results-map" role="region" aria-label="Google Map with a marker for each school matching the selected grade range.">
        <WrappedGoogleMap
          results={this.props.results}
          onToggleResult={this.props.onToggleResult}
          zoom={defZoom}
          center={centerMap}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default ResultsMap;