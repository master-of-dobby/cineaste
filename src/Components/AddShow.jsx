import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Styles/AddShow.css";
import Header from "./HomePageFiles/Header";

function AddShow() {
  const [theatre, setTheatre] = useState({});
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
        // console.log(response.data);
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
    const dateTime = `${date}T${time}:00`;
    console.log(dateTime);

    const payload = {
      theatre: {
        id: theatre.id,
      },
      movie: {
        id: theatre.movie.id,
      },
      // showTime: "2024-07-14T19:43:07.930+05:30",
      showTime: dateTime,
      platinumRemaining: theatre.platinumCapacity,
      diamondRemaining: theatre.diamondCapacity,
      goldRemaining: theatre.goldCapacity,
      eligibleAge: 11,
      // isAvailable: 0xx1,
    };

    // console.log(payload);

    try {
      const response = await axios.post(`http://localhost:8080/show`, payload);
      console.log(response.data);
    } catch (err) {
      console.log("Error in adding show " + err);
    }
  };

  return (
    <>
      <Header />
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
