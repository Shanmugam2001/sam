// YourFormComponent.js

import React, { useState } from 'react';
import axios from 'axios';
import './Add_emp.css'; // Import your CSS file


const Add_emp = ({data,setData}) => {
    const [formData, setFormData] = useState({
        tk_no: '',
        name: '',
        cate: '',
      });
      const [errors, setErrors] = useState({});
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });

      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
    if (!formData.tk_no.trim()) {
      alert("Token Number is required");
      validationErrors.tk_no = 'Token Number is required';
    }
    if (!formData.name.trim()) {
      alert('Name is required')
      validationErrors.name = 'Name is required';
    }
    if (!formData.cate.trim()) {
      alert('Category is required');
      validationErrors.cate = 'Category is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(validationErrors);
    
      return;
    }
        try {
          // Assuming your backend endpoint is http://your-backend-api.com/submit
            const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.152:5000';
            console.log(formData);
            const response = await axios.post(`${apiUrl}/cemp/add`, formData,{
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            });
      
            // Handle the response as needed
            console.log(response.data)
            
            if(response.status===201){
              console.log('Response:', response.data);
              alert(response.data.msg);
              setData([...data,formData]);
              setFormData({tk_no: '',
              name: '',
              cate: '',});
            }else{
              console.log(response.data.status);
              alert("Check no  already exist or the value not submitted or network Error");
            }
        console.log(formData);
        setErrors({});
        } catch (error) {
          // Handle errors
          if (error.response.status===500){
            alert("The Employee is already in List check the Token_no");
          }
          console.error('Error submitting data:', error);
        }
      };

  return (
    <>
   
    <form onSubmit={handleSubmit}>
      <label>
        Token No:
        <input
          type="text"
          name="tk_no"
          value={formData.tk_no}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Category:
        <input
          type="number"
          name="cate"
          value={formData.cate}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    
    
 
    </>
  );
};

export default Add_emp;
