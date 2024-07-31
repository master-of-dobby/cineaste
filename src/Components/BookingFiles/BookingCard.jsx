import React from "react";
import "./BookingCard.css"; // Import your CSS file for styling

const BookingCard = ({ booking }) => {
  const {
    show: {
      movie: { imageUrl, name, language },
      showTime,
      theatre: { name: theatreName, location },
    },
    totalTickets,
    seats,
  } = booking;

  const convertTime = (timestamp) => {
    const date = new Date(timestamp);

    // Adjust for GMT+5:30 (330 minutes)
    const localDate = new Date(date.getTime() + 330 * 60 * 1000);

    // Format the date
    const dateOfShow = localDate.toISOString().split("T")[0];

    // Format the time in 12-hour format
    let hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    const seconds = localDate.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const timeOfShow = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    } ${ampm}`;

    return `${dateOfShow}, ${timeOfShow}`;
  };

  return (
    <div className="booking-card">
      <img src={imageUrl} alt="Movie Poster" className="movie-poster" />
      <div className="booking-details">
        <h2>{name}</h2>
        <p>
          Language: <span style={{ fontWeight: "bold" }}>{language}</span>
        </p>
        <p>
          Date:{" "}
          <span style={{ fontWeight: "bold" }}>{convertTime(showTime)}</span>
        </p>
        <p>
          Theatre: <span style={{ fontWeight: "bold" }}>{theatreName}</span>
        </p>
        <p>
          Location: <span style={{ fontWeight: "bold" }}>{location}</span>
        </p>
        <p>
          No. of Tickets:{" "}
          <span style={{ fontWeight: "bold" }}>{totalTickets}</span>
        </p>
        <p>
          Seat Number:{" "}
          <span style={{ fontWeight: "bold" }}>{seats.join(", ")}</span>
        </p>
      </div>
    </div>
  );
};

export default BookingCard;

// import React, { useEffect, useState } from "react";
// import "./BookingCard.css"; // Import your CSS file for styling
// import axios from "axios";

// const BookingCard = () => {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     const getTickets = async () => {
//       try {
//         const response = await axios.get("http://13.60.81.230:8080/tickets");
//         setTickets(response.data);
//       } catch (err) {
//         console.log("Error in fetching tickets " + err);
//       }
//     };
//     getTickets();
//   }, []); // Empty dependency array ensures this runs only once when the component mounts

//   const convertTime = (timestamp) => {
//     const date = new Date(timestamp);

//     // Adjust for GMT+5:30 (330 minutes)
//     const localDate = new Date(date.getTime() + 330 * 60 * 1000);

//     // Format the date
//     const dateOfShow = localDate.toISOString().split("T")[0];

//     // Format the time in 12-hour format
//     let hours = localDate.getHours();
//     const minutes = localDate.getMinutes();
//     const seconds = localDate.getSeconds();
//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'

//     const timeOfShow = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
//       seconds < 10 ? "0" + seconds : seconds
//     } ${ampm}`;

//     return `${dateOfShow} , ${timeOfShow}`;
//   };

//   return (
//     <>
//       {tickets.length > 0 ? (
//         tickets.map((t, key) => (
//           <div className="booking-card" key={key}>
//             <img
//               src={t.show.movie.imageUrl}
//               alt="Movie Poster"
//               className="movie-poster"
//             />
//             <div className="booking-details">
//               <h2>{t.show.movie.name}</h2>
//               <p>Language: {t.show.movie.language}</p>
//               <p>Date: {convertTime(t.show.showTime)}</p>
//               <p>Theatre: {t.show.theatre.name}</p>
//               <p>Location: {t.show.theatre.location}</p>
//               <p>No. of Tickets: {t.totalTickets}</p>
//               <p>Seat Number: {t.seats.join(", ")}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>Loading tickets...</p>
//       )}
//     </>
//   );
// };

// export default BookingCard;

// // import React, { useEffect, useState } from "react";
// // import "./BookingCard.css"; // Import your CSS file for styling
// // import axios from "axios";

// // const BookingCard = ({ booking }) => {
// //   const {
// //     movieImage,
// //     movieName,
// //     language,
// //     date,
// //     time,
// //     theatreName,
// //     location,
// //     ticketsBooked,
// //     seatNumbers,
// //   } = booking;
// //   // const [movie, setMovie] = useState();
// //   // const [show, setShow] = useState();
// //   // const [theatre, setTheatre] = useState();

// //   const [tickets, setTickets] = useState([]);

// //   useEffect(() => {
// //     const getTickets = async () => {
// //       try {
// //         const response = await axios.get("http://13.60.81.230:8080/tickets");
// //         // console.log(response.data);
// //         setTickets(response.data);
// //       } catch (err) {
// //         console.log("Error in fetching tickets " + err);
// //       }
// //     };
// //     getTickets();
// //   }, []);

// //   // useEffect(() => {

// //   //   const settingTheatre = async () =>{

// //   //     try{
// //   //       const response = await axios.get(`http://13.60.81.230:8080/theatre`)
// //   //     }
// //   //     catch(err){
// //   //       console.log("Error in setting theatre : " + err);
// //   //     }

// //   //   }

// //   // },[]);
// //   const convertTime = (timestamp) => {
// //     const date = new Date(timestamp);

// //     // Get UTC components
// //     const utcYear = date.getUTCFullYear();
// //     const utcMonth = date.getUTCMonth(); // Note: Months are zero-indexed
// //     const utcDay = date.getUTCDate();
// //     const utcHours = date.getUTCHours();
// //     const utcMinutes = date.getUTCMinutes();
// //     const utcSeconds = date.getUTCSeconds();

// //     // Adjust for GMT+5:30 (330 minutes)
// //     const localDate = new Date(
// //       Date.UTC(
// //         utcYear,
// //         utcMonth,
// //         utcDay,
// //         utcHours,
// //         utcMinutes + 330,
// //         utcSeconds
// //       )
// //     );

// //     // Format the date
// //     const dateOfShow = localDate.toISOString().split("T")[0];

// //     // Format the time in 12-hour format
// //     let hours = localDate.getHours();
// //     const minutes = localDate.getMinutes();
// //     const seconds = localDate.getSeconds();
// //     const ampm = hours >= 12 ? "PM" : "AM";
// //     hours = hours % 12;
// //     hours = hours ? hours : 12; // the hour '0' should be '12'

// //     const timeOfShow = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
// //       seconds < 10 ? "0" + seconds : seconds
// //     } ${ampm}`;

// //     return `${dateOfShow} , ${timeOfShow}`;
// //   };

// //   return (
// //     <>
// //       {/* {console.log(tickets)} */}
// //       {tickets.length > 0 ? (
// //         tickets.map((t, key) => (
// //           // {t + " " + key}
// //           // {console.log(t)}
// //           <div className="booking-card">
// //             <img
// //               // src={movieImage}
// //               src={t.show.movie.imageUrl}
// //               alt="Movie Poster"
// //               className="movie-poster"
// //             />
// //             <div className="booking-details">
// //               {/* <h2>{movieName}</h2> */}
// //               <h2>{t.show.movie.name}</h2>
// //               {/* <p>Language: {language}</p> */}
// //               <p>Language: {t.show.movie.language}</p>
// //               {/* <p>Date: {date}</p> */}
// //               <p>Date: {convertTime(t.show.showTime)}</p>
// //               {/* <p>Time: {time}</p> */}
// //               {/* <p>Theatre: {theatreName}</p> */}
// //               <p>Theatre: {t.show.theatre.name}</p>
// //               {/* <p>Location: {location}</p> */}
// //               <p>Location: {t.show.theatre.location}</p>
// //               {/* <p>No. of Tickets: {ticketsBooked}</p> */}
// //               <p>No. of Tickets: {t.totalTickets}</p>
// //               {/* <p>Seat Number: {seatNumbers.join(", ")}</p> */}
// //               <p>Seat Number: {t.seats.join(", ")}</p>
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <p>Loading tickets...</p>
// //       )}
// //     </>
// //   );
// // };

// // export default BookingCard;
