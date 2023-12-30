import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Can_emp from './components/Canteen_emp/Can_emp.js';
import Cemp_tble from './components/Canteen_emp/Cemp_tble.js';
import Login from './components/login/Login.js';
import { useEffect, useState } from 'react';
import Canteen_entry from './components/Can_entry/Canteen_entry.js';

function App() {
  const [loading, setLoading] = useState(true);
  const [token,setToken]=useState(null);
  useEffect(()=>{
    const getToken=async()=>{
      
      let token= await localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = parseJwt(token);
  
          // Check if the token is expired
          if (decodedToken.exp * 1000 < Date.now()) {
            // Token is expired, perform logout action and navigate to login page
            console.log('Token is expired. Logging out.');
            localStorage.removeItem('token');
            window.location.href = 'login'; // Redirect to the login page
          }
        } catch (error) {
          console.error('Error decoding JWT token:', error);
        }
      }
      if(token!=null){
        setLoading(false);
        console.log(token);
      }

    }
    getToken();
  },[])
    // Helper function to parse JWT token
    const parseJwt = (token) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
  
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error('Error parsing JWT token:', error);
        throw error;
      }
    };

  return (
    
     loading? <Login/>:
     <div>
     <Routes>
        
        <Route path="/" element={<Main/>}>
        <Route path="/can_empp" element={<Cemp_tble/>}/>
        <Route path="/can_emp" element={<Can_emp/>}/>
        <Route path='/canteen' element={<Canteen_entry/>}/>
        
      </Route>
      <Route path="login" element={<Login/>}/> 

    </Routes></div>
    
  );
}

export default App;
