import React, { useEffect, useState } from 'react';

function MapPanel({ placeResult }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, [placeResult]);

  return (
    <div id="panel" className={isOpen ? "open" : ""}>
      {placeResult && (
        <>
          {placeResult.photos && (
            <img className="hero" src={placeResult.photos[0].getUrl()} alt="Place" />
          )}
          <h1 className="place">{placeResult.name}</h1>
          {placeResult.rating && (
            <p className="details">Rating: {placeResult.rating} &#9733;</p>
          )}
          <p className="details">{placeResult.formatted_address}</p>
          {placeResult.website && (
            <p className="details">
              <a href={placeResult.website} target="_blank" rel="noopener noreferrer">
                {placeResult.website}
              </a>
            </p>
          )}
        </>
      )}
    </div>
  );
}

function GoogleMap() {
  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [service, setService] = useState(null);
  const [searchedPlaces, setSearchedPlaces] = useState([]);

  useEffect(() => {
    const loadMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places&callback=initMap`;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
      script.onload = initMap;
    };

    loadMapScript();

    return () => {
      // Clean up function to remove the script when component unmounts
      const scripts = document.getElementsByTagName('script');
      for (let script of scripts) {
        if (script.src.includes('maps.googleapis.com')) {
          document.body.removeChild(script);
        }
      }
    };
  }, []);

  function initMap() {
    const infoWindow = new window.google.maps.InfoWindow();
    const bounds = new window.google.maps.LatLngBounds();
    const service = new window.google.maps.places.PlacesService(map);
  
    setInfoWindow(infoWindow);
    setBounds(bounds);
    setService(service);
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: pos,
          zoom: 15
        });
        setMap(map);
        bounds.extend(pos);
  
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
  
        // Call Places Nearby Search on user's location
        if (service) {
          getNearbyPlaces(pos);
        }
      }, () => {
        handleLocationError(true, infoWindow);
      });
    } else {
      handleLocationError(false, infoWindow);
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow) {
    const pos = { lat: -33.856, lng: 151.215 };
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: pos,
      zoom: 15
    });
    setMap(map);

    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Geolocation permissions denied. Using default location.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  function getNearbyPlaces(position) {
    const request = {
      location: position,
      radius: 500,
      type: "hospital"
    };

    service.nearbySearch(request, nearbyCallback);
  }

  function nearbyCallback(results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      createMarkers(results);
      storePlaces(results);
      logSearchedPlaces();
    }
  }

  function createMarkers(places) {
    places.forEach(place => {
      const marker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
      });

      window.google.maps.event.addListener(marker, 'click', () => {
        const request = {
          placeId: place.place_id,
          fields: ['name', 'formatted_address', 'geometry', 'rating', 'website', 'photos']
        };

        service.getDetails(request, (placeResult, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            infoWindow.setContent(placeResult.name);
            infoWindow.open(map, marker);
          }
        });
      });

      bounds.extend(place.geometry.location);
    });
    map.fitBounds(bounds);
  }

  function storePlaces(placeResults) {
    setSearchedPlaces(placeResults.map(place => ({
      name: place.name,
      rating: place.rating || 'None',
      address: place.vicinity || 'Unknown',
      website: place.website || 'Not available'
    })));
  }

  function logSearchedPlaces() {
    console.log("Searched Places:");
    console.log(JSON.stringify(searchedPlaces, null, 2));
  }

  return (
    <>
      <div id="map" style={{ height: '100vh', backgroundColor: 'grey' }}></div>
      <MapPanel placeResult={infoWindow} />
    </>
  );
}

export default GoogleMap;
