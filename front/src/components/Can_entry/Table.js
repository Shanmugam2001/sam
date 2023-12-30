// src/Table.js
import React, { useState } from 'react';
import './Centry.css'
import axios from 'axios';
const Table = ({ tableData,setTableData}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const handleDelete = async() => {
    
    if (selectedRow !== null) {
      // Filter out the item with the specified id
      const shouldDelete = window.confirm('Are you sure you want to delete?');
      if(shouldDelete){
      try{
        const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.152:5000';
        const res= await axios.delete(`${apiUrl}/canteen/${selectedRow.shift_date}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.status===200){
          alert(res.data.msg);
          const updatedData = tableData.filter(item => item.shift_date !== selectedRow.shift_date);
          
          setTableData(updatedData);
          setSelectedRow(null);
           // Clear the selected row after deletion
          
        }

      }catch (error){
          console.log("error in ",error);
      }
    }
      
    }
  };
  const currentData=tableData.slice(0,15);  
  return (
    <table>
      <thead>
        <tr>
          <th>Token No</th>
          <th>Shift Code</th>
          <th>Shift Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((record, index) => (
          <tr key={index}
          className={selectedRow && selectedRow.shift_date === record.shift_date ? 'selected-row' : ''}
          onClick={() => setSelectedRow(record)}
          >
            <td>{record.tk_no}</td>
            <td>{record.shift_code}</td>
            <td>{record.shift_date}</td>
            <td>
            {selectedRow && selectedRow.shift_date === record.shift_date && (
                <button onClick={() => handleDelete()}>Delete</button>
            )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

//  onClick={() => onDelete(record.id)}
export default Table;
