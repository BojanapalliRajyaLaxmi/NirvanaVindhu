import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

function UserLocation({ destination }) {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError("");
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Failed to get location. Please allow location access.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const getRoute = async () => {
    if (!location || !destination) {
      setError("Please get your location first!");
      return;
    }

    const start = `${location.longitude},${location.latitude}`;
    const end = `${destination.lon},${destination.lat}`;

    try {
      const response = await axios.get(`http://localhost:3002/route`, {
        params: { start, end },
      });

      if (response.data.features.length === 0) {
        setError("No route found!");
        return;
      }

      // Convert route coordinates to [lat, lng] format
      const routeCoordinates = response.data.features[0].geometry.coordinates.map(
        (coord) => [coord[1], coord[0]]
      );

      setRoute(routeCoordinates);
      setError("");
    } catch (error) {
      console.error("Error fetching route:", error);
      setError("Failed to fetch route. Is the backend running?");
    }
  };

  return (
    <div>
      <button onClick={getRoute}>Get Route</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {location && destination && (
        <MapContainer center={[location.latitude, location.longitude]} zoom={14} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User's Current Location */}
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>Your Location</Popup>
          </Marker>

          {/* Destination Marker */}
          <Marker position={[destination.lat, destination.lon]}>
            <Popup>{destination.name}</Popup>
          </Marker>

          {/* Route Line */}
          {route.length > 0 && <Polyline positions={route} color="blue" />}
        </MapContainer>
      )}
    </div>
  );
}

export default UserLocation;
