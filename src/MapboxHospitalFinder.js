import React from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from "react-router-dom";
// import "./MapboxHospitalFinder.css";

mapboxgl.accessToken = 'pk.eyJ1Ijoia2VzYXZhcmRoYW4iLCJhIjoiY2x2czFpY2VyMHRqMzJsbWhmZHFybHoyaSJ9.9ITa4D575BStY3fonWOjPA';

const MapboxHospitalFinder = () => {

  const navigate = useNavigate();
  const [userLocation, setUserLocation] = React.useState(null);
  const [nearbyHospitals, setNearbyHospitals] = React.useState([]);
  const hospitalData = [
    {
      name: "Apollo Hospitals",
      email: "apollo@example.com"
    },
    {
      name: "Apollo Speciality Hospital",
      email: "apollo_speciality@example.com"
    },
    {
      name: "Apollo Heart Centre",
      email: "apollo_heart@example.com"
    },
    {
      name: "Rajan Eye Care Hospital",
      email: "rajan_eye@example.com"
    },
    {
      name: "Balaji Dental & Craniofacial Hospital",
      email: "balaji_dental@example.com"
    },
    {
      name: "Apollo First Med Hospitals",
      email: "apollo_first_med@example.com"
    },
    {
      name: "Apollo Hospital in Chennai",
      email: "apollo_chennai@example.com"
    },
    {
      name: "Apollo Speciality Hospital",
      email: "apollo_speciality@example.com"
    },
    {
      name: "Sankara Nethralaya Eye Hospital",
      email: "sankara_nethralaya@example.com"
    },
    {
      name: "Shankara Netralaya",
      email: "shankara_netralaya@example.com"
    },
    {
      name: "Billroth Hospital",
      email: "billroth@example.com"
    },
    {
      name: "Joseph Nursing Home",
      email: "joseph_nursing@example.com"
    },
    {
      name: "Metha Hospitals",
      email: "mehta@example.com"
    }
];


  const styles = {
    container: {
      margin: '20px auto',
      maxWidth: '800px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    hospitalList: {
      marginTop: '20px',
    },
    hospitalItem: {
      marginBottom: '20px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#fff',
    },
    hospitalName: {
      fontSize: '18px',
      marginBottom: '5px',
    },
    hospitalAddress: {
      color: '#666',
    },
    continueButton: {
      padding: '8px 16px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  hospitalData.forEach(hospital => {
    hospital.email = "ajaysaran.24cs@licet.ac.in";
});
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          findNearbyHospitals([longitude, latitude]);
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const findNearbyHospitals = async (coordinates) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${coordinates[0]},${coordinates[1]}&limit=10&radius=500&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setNearbyHospitals(data.features);
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
    }
  };

  const handleContinue = (hospitalName) => {
    const selectedHospital = hospitalData.find(hospital => hospital.name === hospitalName);
    if (selectedHospital) {
      console.log("Hospital Name:", selectedHospital.name);
      console.log("Email Address:", selectedHospital.email);
      const email = selectedHospital.email;
      localStorage.setItem('hospitalEmail', email); 
      navigate('/contact');
      
    } else {
      console.log("Hospital not found in the data.");
    }
  };
  

  return (
    <div style={styles.container}>
    <button style={styles.button} onClick={getUserLocation}>Get Nearby Hospitals</button>
    {userLocation && (
      <div>
        <p>User Location: {userLocation[1]}, {userLocation[0]}</p>
        <h2>Nearby Hospitals</h2>
        <div style={styles.hospitalList}>
          {nearbyHospitals.map(hospital => (
            <div key={hospital.id} style={styles.hospitalItem}>
              <h3 style={styles.hospitalName}>{hospital.text}</h3>
              <p style={styles.hospitalAddress}>{hospital.place_name}</p>
              <button style={styles.continueButton} onClick={() => handleContinue(hospital.text)}>Continue</button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  );
};

export default MapboxHospitalFinder;