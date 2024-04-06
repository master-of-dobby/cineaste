import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

function Redirect() {
  const { email, otp } = useParams();
  const navigate = useNavigate();
  // http://localhost:8080/user/verify-account?email=naveenm2718@gmail.com&otp=532012

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      axios.put(`http://localhost:8080/user/verify-account?email=${email}&otp=${otp}`);
      navigate("/");
    } catch (err) {
      console.error("OTP Authenticatoin Failed!");
      navigate("/");
    }
  };

  return (
    <div>
        <div className="redirect-div">
          {/* <h1>Email : {email}</h1>
          <h2>OTP : {otp}</h2> */}
          <h1>Thanks for Registering for us, click here to enjoy watching :) </h1>
        <button onClick={handleClick}>Redirect</button>
      </div>
    </div>
  );
}

export default Redirect;
