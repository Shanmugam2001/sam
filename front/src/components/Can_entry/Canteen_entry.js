import React, { useEffect, useState } from 'react'
import './Centry.css'
import Table from './Table'
import Add_entry from './Add_entry'
import axios from 'axios'
import Report from './Report'
import Report_table from './Report_table'
const Canteen_entry = () => {
    const [tableData, setTableData] = useState([]);
    const [rdata,setRdata]=useState([]);
    useEffect(()=>{
      getData();
    },[]);
    const getData=async ()=>{
      try{
        const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.152:5000';
            
            const response = await axios.get(`${apiUrl}/canteen/`,{
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              
            });
            if (response.status===200){
              console.log(response.data.data);
              setTableData(response.data.data);
            }
      }catch(error){
        alert("chech the console");
        console.log(error);
      }
    }
    
  return (
    <div className='App'>
      <div className="left">
      <Add_entry setTableData={setTableData} tableData={tableData}/>
      <br/>
      <Report setRdata={setRdata}/>
      </div>
    <div className="right">
       <Table tableData={tableData}setTableData={setTableData}/>
    </div>
    <div className='Report'>
      <Report_table rdata={rdata}/>
    </div>
    </div>
  )
}

export default Canteen_entry
