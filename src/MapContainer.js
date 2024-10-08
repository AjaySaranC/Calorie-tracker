import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    // Coordinates for Chennai
    const chennaiCoords = { lat: 13.0827, lng: 80.2707 };

    return (
      <Map
        google={this.props.google}
        zoom={12} // Adjust zoom level as needed
        initialCenter={chennaiCoords}
      >
        <Marker position={chennaiCoords} />
      </Map>
    );
  }
}

// Replace 'YOUR_API_KEY' with your actual Google Maps API key
export default GoogleApiWrapper({
  apiKey: "AIzaSyC3mZg6P7r2Aze0dm4XiQTmHora9Zs3fGQ"
})(MapContainer);
