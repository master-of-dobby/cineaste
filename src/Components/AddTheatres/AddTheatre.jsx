import React, { useState } from "react";
import "./AddTheatre.css";

function AddTheater() {
  const [formData, setFormData] = useState({
    theatreName: "",
    movieName: "",
    location: "",
    amenities: "",
    capacity: {
      gold: "",
      diamond: "",
      platinum: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "capacityType") {
      const capacityType = value;
      setFormData({
        ...formData,
        capacity: {
          ...formData.capacity,
          [capacityType]: ""
        }
      });
    } else if (name.includes("capacity")) {
      const capacityType = name.split("-")[1];
      setFormData({
        ...formData,
        capacity: {
          ...formData.capacity,
          [capacityType]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    // Reset form data
    setFormData({
      theatreName: "",
      movieName: "",
      location: "",
      amenities: "",
      capacity: {
        gold: "",
        diamond: "",
        platinum: ""
      }
    });
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
            <input
              type="text"
              className="form-control"
              id="movieName"
              name="movieName"
              value={formData.movieName}
              onChange={handleChange}
              required
            />
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
            <select
              className="form-control"
              id="amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              required
            >
              <option value="">Select Amenities</option>
              <option value="AC DOLBY">AC DOLBY</option>
              <option value="AC DOLBY 8DX">AC DOLBY 8DX</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="capacity">Capacity:</label>
            <div className="capacity-group">
              <input
                type="number"
                className="form-control"
                id="gold-capacity"
                name="capacity-gold"
                value={formData.capacity.gold}
                onChange={handleChange}
                placeholder="Gold Capacity"
                required
              />
              <input
                type="number"
                className="form-control"
                id="diamond-capacity"
                name="capacity-diamond"
                value={formData.capacity.diamond}
                onChange={handleChange}
                placeholder="Diamond Capacity"
                required
              />
              <input
                type="number"
                className="form-control"
                id="platinum-capacity"
                name="capacity-platinum"
                value={formData.capacity.platinum}
                onChange={handleChange}
                placeholder="Platinum Capacity"
                required
              />
            </div>
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
