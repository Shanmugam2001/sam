import React, { useState } from 'react'
import './Centry.css'
import axios from 'axios';
import Report from './Report';

const Add_entry = ({tableData,setTableData}) => {
    const [formData, setFormData] = useState({
        tk_no: '',
        shift_code: '1', // Set default shift_code
        shift_date: new Date().toISOString().split('T')[0]
      });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const dataa={
            tk_no: formData.tk_no,
        shift_code: formData.shift_code, // Set default shift_code
        shift_date: formData.shift_date+" "+new Date().toISOString().split('T')[1].slice(0,8)
        }

        try{
            const apiUrl=process.env.REACT_APP_API_BASE_URL;
            const response= await axios.post(`${apiUrl}/canteen/`,dataa,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  },
            });
            
            if(response.status==201){
              console.log({shift_code:parseInt(dataa.shift_code),shift_date:dataa.shift_date,tk_no:dataa.tk_no});
              
                setTableData([dataa,...tableData,]);
                
                
                setFormData({
                    tk_no: '',
                    shift_code: '1', // Set default shift_code
                    shift_date: new Date().toISOString().split('T')[0],
                })
                
            }else{
              console.log(response.data.status);
              alert("Check no  already exist or the value not submitted or network Error");
            }
        }catch(error){
            console.log("error :"+error);
            alert("error check the  Token_no or browser console log");
        }


      };
  return (
    <div>
       <form onSubmit={handleSubmit}>
      <label>
        TK No:
        <input type="text" name="tk_no" value={formData.tk_no} onChange={handleChange} />
      </label>
      <label>
        Shift Code:
        <select name="shift_code" value={formData.shift_code} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>
      <label>
        Shift Date:
        <input type="date" name="shift_date" value={formData.shift_date} disabled />
      </label>
      <button type="submit">Submit</button>
    </form>

    </div>
  )
}

export default Add_entry
