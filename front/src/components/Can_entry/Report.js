import React, { useState } from 'react'
import './Centry.css'
import axios from 'axios';
const Report = ({setRdata}) => {
  
    const[stdata,setStdata]=useState("");
    const[etdata,setEtdata]=useState("");
    const handleFetchData= async ()=>{
        console.log(stdata,etdata);
        const ddata={
          st:stdata,
          ed:etdata,
        }
        try{
          const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.152:5000';
            
          const response = await axios.get(`${apiUrl}/canteen/report`,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }, params: {
              arg1: stdata,
              arg2:etdata
            },
          },);
          if (response.status===200){
            
            setRdata(response.data.data);
          }

        }catch (error){
          console.log('error in :'+error);
        }
    }
  return (
    <div>
    <label>
      From Date:
      <input type="date" name="fromDate" value={stdata} onChange={(e)=>{setStdata(e.target.value)}} />
    </label>
    <label>
      To Date:
      <input type="date" name="toDate" value={etdata} onChange={(e)=>{setEtdata(e.target.value)}} />
    </label>
    <button onClick={handleFetchData}>Fetch Data</button>
    {/* <button onClick={handleExportToExcel}>Export to Excel</button>value={formData.fromDate} */}
  </div>
  )
}

export default Report
