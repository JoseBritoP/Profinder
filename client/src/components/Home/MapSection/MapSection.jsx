import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from './icon.png';

const MapSection = () => {
  const suppliers = useSelector((state) => state.suppliers);
  console.log(suppliers);

  // Coordenadas de latitud y longitud de Buenos Aires
  const initialPosition = [-34.6118, -58.4173];

  // Define el icono personalizado para los marcadores
  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  useEffect(() => {
    // Código para cargar los datos del servidor si es necesario
  }, []);

  // Función para manejar el evento de clic en el mapa
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log('Latitud:', lat);
    console.log('Longitud:', lng);
    const popupContent = `You clicked the map at (${lat}, ${lng})`;

    // Crea una nueva ventana emergente y la abre en la ubicación del clic
    L.popup()
      .setLatLng(e.latlng)
      .setContent(popupContent)
      .openOn(e.target);
      console.log(e.latlng);
  };

  return (
    <div style={{ height: '400px',width: '600px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      {/* El componente MapContainer debe tener un tamaño definido para que el mapa sea visible */}
      <MapContainer center={initialPosition} zoom={2.3} style={{ height: '100%' }} onClick={handleMapClick}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Agrega los marcadores y popups para cada proveedor */}
        {suppliers.map((supplier) => (
          <Marker key={supplier.id} position={supplier.geolocation} icon={customIcon}>
            <Popup>
            <div>
                <h2>{supplier.name}</h2>
                <p>Location: {supplier.ubication.location}</p>
                {/* Si el proveedor tiene al menos una ocupación */}
                {supplier.professions.length > 0 && (
                  <p>Category: {supplier.professions[0].category}</p>
                )}
              </div>

            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapSection;
