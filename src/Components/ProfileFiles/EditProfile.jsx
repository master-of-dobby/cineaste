import { useParams } from "react-router-dom";
import "./EditProfile.css";
// import userData from "../../Collection/userData.json";
import { useEffect, useState } from "react";
import axios from "axios";

function EditProfile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      // console.log(userId);
      // console.log(userData);
      // Fetch the data for this particular user

      try {
        const response = axios.get(`http://localhost:8080/user/${userId}`);
        setUser((await response).data);
        // console.log("response " + (await response).data);
        console.log(user);
        // console.log((await response).data);
      } catch (err) {
        console.log("USER NOT FOUND! " + err);
      }
    };

    fetchUserData();
  }, [userId]);

  const updateData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/user/${userId}`,
        user
      );
      console.log(response.data);
    } catch (err) {
      console.log("error in updating " + err);
    }
  };

  if (!user) {
    // Render loading state or return null if you don't want to render anything until data is loaded
    return <p>Loading...</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // const userIndex = userData.findIndex((u) => u.id === userId);

    // const updatedUserData = [...userData];

    // updatedUserData[userIndex] = user;

    updateData();

    console.log(user);
  };

  return (
    <>
      <h2>Profile</h2>
      <div className="edit-profile-main">
        <div className="edit-profile">
          <form className="edit-profile-form">
            <label>First Name </label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              defaultValue={user ? user.firstName : ''}
              onChange={handleInputChange}
            ></input>
            <br />
            <br />
            <label>Last Name </label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              defaultValue={user ? user.lastName : ''}
              onChange={handleInputChange}
            ></input>
            <br />
            <br />
            <label>Location &nbsp;&nbsp;&nbsp;</label>
            <input
              type="text"
              name="location"
              value={user.location}
              defaultValue={user ? user.location : ''}
              onChange={handleInputChange}
            ></input>
            <br />
            <br />
            <label>
              Role &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <select name="role" value={user.role} onChange={handleInputChange}>
              <optgroup itemType="text">
                <option>USER</option>
                <option>ADMIN</option>
              </optgroup>
            </select>
            <br />
            <br />
            <label>Pass * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              name="passHoling"
              type="text"
              defaultValue={user ? user.pass : ''}
              value={user.pass ? user.pass.passType : " "}
            ></input>
            <br />
            <br />
            <div className="edit-profile-form-btn">
              <button
                onClick={handleSave}
                className="edit-profile-form-button"
                type="submit"
              >
                SAVE
              </button>
            </div>
            <p>* denotes cannot be changed</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
