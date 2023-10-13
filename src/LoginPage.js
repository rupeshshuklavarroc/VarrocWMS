import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from "./Actions/GlobalContext";
import { fetchUser } from './Actions/utils';
import './LoginPage.css';
import logo from './logo.png';

const LoginPage = () => {
  const { setData3 } = useContext(GlobalContext);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle user login
  const handleUserSearch = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      const LoginData = { user, password };
      const fetchedUserData = await fetchUser(LoginData);
      setData3(fetchedUserData);
      
      if (fetchedUserData.userFound === true) {
        navigate('/select'); // Redirect to "/select" route if user is found
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to handle input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "user") {
      setUser(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="login-container">
      <div className="blue-half">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
      </div>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="input-container">
            <input className="login-input"
              type="text"
              name="user"
              value={user}
              onChange={handleInputChange}
              placeholder="Username"
            />
            <input className="login-input"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Password"
            />
          </div>
          <div className="forgot-register">
            <a href="#">Forgot Password?</a>
            <span className="separator">|</span>
            <a href="#">Register</a>
          </div>
          <button className="login-button" type="submit" onClick={handleUserSearch}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
