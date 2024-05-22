import React from "react";
import "./AddTheatres/AddTheatre"

function BuyPass() {
  return (
    <div className="add-theater-container">
      <div className="container">
      <h1 style={{color:"white"}}>Get a Pass - Enjoy Time</h1>
      <div>
        <p style={{color:"white"}}>Select Pass Type : </p>
        <select className="form-control">
          <optgroup>
          <option value="" disabled selected>enter pass type...</option>
            <option>Golden</option>
            <option>Silver</option>
          </optgroup>
        </select>
      </div>

      <p style={{color:"white"}}>Enter Plan : </p>
      <select className="form-control">
      <option value="" disabled selected>enter plan...</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="annually">Annually</option>
      </select>
      <br/><br/>
      <div className="button-container">
        <button className="submit-btn">Submit</button>
      </div>
      </div>
    </div>
  );
}

export default BuyPass;
