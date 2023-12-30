// StyledLoginForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const Login = () => {
  const [uname, setUname] = useState('');
  const [passwd, setPasswd] = useState('');
//   const { dispatch } = useAuth();
const navigate = useNavigate();
  const handleNormalLogin = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.152:5000';

      const response = await axios.post(`${apiUrl}/login`, {
        uname,
        passwd,
      });
      console.log(response.status)
      const data = response.data;
      // Store the token in local storage
      if (response.status === 200){localStorage.setItem('token',data.token);
      
      navigate("/")
      window.location.reload();
      }
      else{
        alert(data.message);
      }
      

    //   dispatch({ type: 'LOGIN', payload: data.token });
     
    } catch (error) {
      alert( error.response.data.message);
      console.error('Login failed:', error.response.data.message);
    }
  };
//   useEffect(() => {
//     handleNormalLogin();
//     // const data = response.data;
//     // console.log(response.data);
//   }, []);

  return (
    <div className="container">
      <form className="form" onSubmit={(e) => { e.preventDefault(); handleNormalLogin(); }}>
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
        />
        <div className="btnlg"><button className="button" type="submit">Login</button></div>
        
      </form>
    </div>
  );
};

export default Login;
