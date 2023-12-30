import axios from 'axios';
import './Emp_table.css'
import React, {  useState } from 'react'


const Emp_table=({data,setData})=>{
  

  
 

const itemsPerPage = 15;

const [selectedRow, setSelectedRow] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const [currentPage, setCurrentPage] = useState(1);


const handleDelete = async () => {
  if (selectedRow !== null) {
    // Filter out the item with the specified id

    // axios.delete(`http://192.168.1.152:3006/m/cemp_del/${selectedRow.tk_no}`)
    // .then((res=>{
    //   console.log(res.data)
    //   if(res.data.status==200){
    //     alert(res.data.data)
    //     const updatedData = data.filter(item => item.tk_no!== selectedRow.tk_no);

    // setData(updatedData);
    // setSelectedRow(null);
    //   }else{
    //     alert(res.status.code)
    //   }
    // }))
    const shouldDelete = window.confirm('Are you sure you want to delete?');
    if (shouldDelete){
    try{
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.152:5000';
      const res= await axios.delete(`${apiUrl}/cemp/${selectedRow.tk_no}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if(res.status===200){
        alert(res.data.msg);
        const updatedData = data.filter(item => item.tk_no!== selectedRow.tk_no);
        setData(updatedData);
        setSelectedRow(null);
      }
    }catch(error){
        console.log(error);
    }
    

  }// Clear the selected row after deletion
  }
};

const filteredData = data.filter(item =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

// Calculate the indexes of the items to display on the current page
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentData = filteredData.slice(startIndex, endIndex);

// Calculate the total number of pages
const totalPages = Math.ceil(filteredData.length / itemsPerPage);

return (
  <div>
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>TOKEN NO</th>
            <th>Name</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(item => (
            <tr
              key={item.tk_no}
              className={selectedRow && selectedRow.tk_no === item.tk_no ? 'selected-row' : ''}
              onClick={() => setSelectedRow(item)}
            >
              <td>{item.tk_no}</td>
              <td>{item.name}</td>
              <td>{item.cate}</td>
              <td>
                {selectedRow && selectedRow.tk_no === item.tk_no && (
                  <button onClick={() => handleDelete()}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="pagination">
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  </div>
);
}

export default Emp_table;