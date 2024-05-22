import React, { useState, useEffect } from "react";
import "./AddTheatre.css";
import axios from "axios";

function AddTheater() {
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [formData, setFormData] = useState({
    theatreName: "",
    location: "",
    amenities: [],
    goldCapacity: "",
    diamondCapacity: "",
    platinumCapacity: "",
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/movies");
        setMoviesList(response.data);
      } catch (err) {
        console.log("Movies NOT FOUND!" + err);
      }
    };

    fetchMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amenities") {
      const selectedAmenities = value.split(",").map((item) => item.trim());
      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedAmenities,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleMovieChange = (e) => {
    setSelectedMovieId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      name: formData.theatreName,
      location: formData.location,
      amenities: formData.amenities,
      goldCapacity: parseInt(formData.goldCapacity, 10),
      diamondCapacity: parseInt(formData.diamondCapacity, 10),
      platinumCapacity: parseInt(formData.platinumCapacity, 10),
      capacity:
        parseInt(formData.goldCapacity, 10) +
        parseInt(formData.diamondCapacity, 10) +
        parseInt(formData.platinumCapacity, 10),
      movie: { id: selectedMovieId },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/theatre",
        dataToSubmit
      );
      console.log(response);
      // Reset form data after successful submission
      setFormData({
        theatreName: "",
        location: "",
        amenities: [],
        goldCapacity: "",
        diamondCapacity: "",
        platinumCapacity: "",
      });
      setSelectedMovieId(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-theater-container">
      <div className="container">
        <h2 style={{ color: "white" }}>Add New Theatre</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="theatreName">Theatre Name:</label>
            <input
              type="text"
              className="form-control"
              id="theatreName"
              name="theatreName"
              value={formData.theatreName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="movieName">Movie Name:</label>
            <br />
            <select
              onChange={handleMovieChange}
              className="form-control"
              value={selectedMovieId || ""}
              required
            >
              <option value="">Select a movie...</option>
              {moviesList.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amenities">Amenities:</label>
            <input
              type="text"
              className="form-control"
              id="amenities"
              name="amenities"
              value={formData.amenities.join(", ")}
              onChange={handleChange}
              placeholder="Enter amenities separated by commas"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="goldCapacity">Gold Capacity:</label>
            <input
              type="number"
              className="form-control"
              id="goldCapacity"
              name="goldCapacity"
              value={formData.goldCapacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="diamondCapacity">Diamond Capacity:</label>
            <input
              type="number"
              className="form-control"
              id="diamondCapacity"
              name="diamondCapacity"
              value={formData.diamondCapacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="platinumCapacity">Platinum Capacity:</label>
            <input
              type="number"
              className="form-control"
              id="platinumCapacity"
              name="platinumCapacity"
              value={formData.platinumCapacity}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTheater;
