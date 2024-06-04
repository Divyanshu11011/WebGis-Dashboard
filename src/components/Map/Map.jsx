import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './map.css';

const Map = ({ selectedProperties }) => {
  const [geoData, setGeoData] = useState(null);
  const [stateData, setStateData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await axios.get('http://localhost:8080/geoserver/Assignment/ows', {
          params: {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typeName: 'Assignment:India3A_State_Boundary_2023',
            maxFeatures: 50,
            outputFormat: 'application/json',
          },
        });
        console.log('GeoJSON Data:', response.data);
        setGeoData(response.data);
      } catch (error) {
        console.error('Error fetching GeoJSON:', error);
      }
    };

    const fetchStateData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/state-data');
        console.log('State Data:', response.data);
        setStateData(response.data);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    };

    fetchGeoJSON();
    fetchStateData();
  }, []);

  const mergeData = (geoData, stateData) => {
    if (!geoData || !stateData) return null;

    const stateDataMap = stateData.reduce((acc, curr) => {
      acc[curr.state_name] = curr.num_colleges;
      return acc;
    }, {});

    geoData.features = geoData.features.map(feature => {
      const stateName = feature.properties.name;
      if (stateDataMap[stateName]) {
        feature.properties.num_colleges = stateDataMap[stateName];
      }
      return feature;
    });

    console.log('Merged Data:', geoData);
    return geoData;
  };

  const mergedData = mergeData(geoData, stateData);

  const getColor = (num_colleges) => {
    return num_colleges > 20 ? '#800026' :
           num_colleges > 15 ? '#BD0026' :
           num_colleges > 10 ? '#E31A1C' :
           num_colleges > 8  ? '#FC4E2A' :
           num_colleges > 5  ? '#FD8D3C' :
           num_colleges > 3  ? '#FEB24C' :
                               '#FFEDA0';
  };

  const style = (feature) => {
    return {
      fillColor: getColor(feature.properties.num_colleges),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: (e) => {
        setSelectedFeature(feature);
        setPopupPosition(e.latlng);
      },
    });
  };

  return (
    <div className="map-container h-full w-full">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {mergedData && <GeoJSON data={mergedData} style={style} onEachFeature={onEachFeature} />}
        {selectedFeature && popupPosition && (
          <Popup
            position={popupPosition}
            onClose={() => {
              setSelectedFeature(null);
              setPopupPosition(null);
            }}
          >
            <div>
              <h4>{selectedFeature.properties.name}</h4>
              {selectedProperties.map((prop) => (
                <p key={prop}><strong>{prop}:</strong> {selectedFeature.properties[prop]}</p>
              ))}
              <p><strong>Number of Colleges:</strong> {selectedFeature.properties.num_colleges}</p>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
