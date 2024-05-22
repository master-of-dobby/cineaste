import React, { useState } from "react";
import "./AddMovie.css";
import axios from "axios";

function AddMovie() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    genre: [],
    language: "",
    rating: "",
    releaseDate: "",
    trailerUrl: "",
    imageUrl: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "genre") {
      const selectedGenres = value.split(",").map((item) => item.trim());

      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedGenres,
      }));
    } else {
      // For other fields, just update the state with the new value
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission

    console.log(formData);

    try {
      const respone = await axios.post("http://localhost:8080/movie", formData);
      console.log(respone);
    } catch (err) {
      console.error(err);
      <p>Error occured in adding...</p>;
    } finally {
      console.log("Done");
    }

    // Reset form data
    setFormData({
      id: "",
      name: "",
      genre: [],
      language: "",
      rating: "",
      releaseDate: "",
      trailerUrl: "",
      imageUrl: "",
      description: "",
      location: "",
    });
  };

  return (
    <div className="add-movie-container">
      <div className="container">
        <h2>Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              name="genre"
              value={formData.genre.join(", ")}
              onChange={handleChange}
              placeholder="Enter Genre seperated by Comma ' , ' "
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">Language:</label>
            <input
              type="text"
              className="form-control"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="form-control"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="releaseDate">Release Date:</label>
            <input
              type="date"
              className="form-control"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="trailerUrl">Trailer URL:</label>
            <input
              type="url"
              className="form-control"
              id="trailerUrl"
              name="trailerUrl"
              value={formData.trailerUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="url"
              className="form-control"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
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

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
