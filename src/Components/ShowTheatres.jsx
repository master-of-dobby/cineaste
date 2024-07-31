import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./HomePageFiles/Header";

function ShowTheatres() {
  const [theatres, setTheatres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTheatres = async () => {
      try {
        const response = await axios.get(`http://13.60.81.230:8080/theatres`);
        setTheatres(response.data);
        // console.log(response.data);
      } catch (err) {
        console.log("Error in fetching theatres: " + err);
      }
    };

    getTheatres();
  }, []);

  return (
    <>
      {!theatres ? (
        <>
          <Header />
          <div>Loading theatres...</div>
        </>
      ) : (
        <>
          <Header />
          <div className="container" style={{ marginTop: "0.13rem" }}>
            <div className="row">
              <div className="col-md-12">
                <h1>Available Theatres</h1>
                <div className="row">
                  {theatres.map((theatre) => (
                    <div className="col-md-4" key={theatre.id}>
                      <div className="card mb-4">
                        <div
                          className="card-body"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            backgroundColor: "wheat",
                            borderRadius: "2rem",
                            margin: "1.2rem",
                          }}
                        >
                          <h5
                            className="card-title"
                            style={{ marginRight: "20px" }}
                          >
                            {theatre.name}
                          </h5>{" "}
                          <button
                            className="btn btn-primary"
                            style={{ marginBottom: "2rem" }}
                            onClick={() => navigate(`/add-show/${theatre.id}`)}
                          >
                            Add Show
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ShowTheatres;
