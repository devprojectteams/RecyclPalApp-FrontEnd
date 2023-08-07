import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const RecyclPalMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");

  useEffect(() => {
    axios
      .get("/api/agents") //change this endpoint to reflect your API endpoint
      .then((response) => {
        const updatedAgents = response.data.map((agent) => {
          const { lat, lng } = agent.position;
          return { ...agent, position: { lat, lng } };
        });
        setAgents(updatedAgents);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleMarkerClick = (agentId) => {
    axios
      .get(`/api/agents/${agentId}`) //change this endpoint to reflect your API endpoint for retrieving agent details by ID
      .then((response) => {
        setSelectedAgent(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleInfoWindowClose = () => {
    setSelectedAgent(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //assuming that you have separate API endpoints for searching and filtering
    axios
      .get(`/api/agents/search?term=${searchTerm}`)
      .then((response) => {
        const updatedAgents = response.data.map((agent) => {
          const { lat, lng } = agent.position;
          return { ...agent, position: { lat, lng } };
        });
        setAgents(updatedAgents);
      })
      .catch((error) => console.log(error));

    axios
      .get(`/api/agents/filter?criteria=${filterCriteria}`)
      .then((response) => {
        const updatedAgents = response.data.map((agent) => {
          const { lat, lng } = agent.position;
          return { ...agent, position: { lat, lng } };
        });
        setAgents(updatedAgents);
      })
      .catch((error) => console.log(error));
  };

  const handleAddAgent = (newAgent) => {
    axios
      .post("/api/agents", newAgent) //change this endpoint to reflect your API endpoint for adding a new agent
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return isLoaded ? (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Search:
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </label>
          <label>
            Filter:
            <select value={filterCriteria} onChange={handleFilterChange}>
              <option value="">Select Criteria...</option>
              <option value="location">Location</option>
              <option value="services">Services Offered</option>
              <option value="ratings">Ratings</option>
            </select>
          </label>
          <button type="submit">Go</button>
        </form>
        <form onSubmit={handleAddAgent}>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Address:
            <input type="text" name="address" />
          </label>
          <button type="submit">Add Agent</button>
        </form>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 0, lng: 0 }} // Set your initial center
        zoom={2} // Set your initial zoom level
      >
        {agents.map((agent) => (
          <Marker
            key={agent.id}
            position={agent.position}
            title={agent.name}
            onClick={() => handleMarkerClick(agent.id)}
          />
        ))}
        {selectedAgent && (
          <InfoWindow
            position={selectedAgent.position}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h2>{selectedAgent.name}</h2>
              <p>{selectedAgent.details}</p>
              {/* Add additional details, contact information, and ratings/reviews here */}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default RecyclPalMap;
