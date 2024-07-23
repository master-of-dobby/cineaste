import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Styles/AddShow.css";
import Header from "./HomePageFiles/Header";

function AddShow() {
  const [theatre, setTheatre] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { theatreId } = useParams();

  useEffect(() => {
    const getTheatre = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/theatre/${theatreId}`
        );
        setTheatre(response.data);
      } catch (err) {
        console.log("Error in fetching theatre: " + err);
      }
    };

    getTheatre();
  }, [theatreId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addShow();
  };

  const addShow = async () => {
    // Combine date and time into the desired format
    const dateTime = new Date(`${date}T${time}:00.000+05:30`).toISOString();

    console.log(dateTime);

    const payload = {
      theatre: {
        id: theatre.id,
      },
      movie: {
        id: theatre.movie.id,
      },
      showTime: dateTime,
      platinumRemaining: theatre.platinumCapacity,
      diamondRemaining: theatre.diamondCapacity,
      goldRemaining: theatre.goldCapacity,
      eligibleAge: 11,
    };

    try {
      const response = await axios.post(`http://localhost:8080/show`, payload);
      console.log(response.data);
      window.alert("Show added successfully");
      setDate("");
      setTime("");
    } catch (err) {
      setError(err);
      console.log("Error in adding show " + err);
    }
  };

  const [error, setError] = useState(null); // Track API errors

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  if (!theatre) {
    return (
      <>
        <Header />
        <div>Loading theatres...</div>
      </>
    ); // Display loading state
  }

  return (
    <>
      <div className="add-show-parent">
        <div className="add-show">
          <h1>Add Show</h1>
          <h1>
            {theatre.name} - ID : {theatre.id}
          </h1>
          <form className="add-show-form" onSubmit={handleSubmit}>
            <label>Select Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <label>Select Time</label>
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <br />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddShow;
