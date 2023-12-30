import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'TOKEN_NO', width: 70 },
  { field: 'name', headerName: 'NMAE', width: 130 },
  { field: 'cate', headerName: 'CATEGORY', width: 130 },
];

// const rows = [
//   { TOKEN_NO: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { TOKEN_NO: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { TOKEN_NO: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   {TOKEN_NO: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { TOKEN_NO: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null }
// ];
// function getRowId(row) {
//   return row.internalId;
// }
export default function Cemp_tble() {

  
  const [rowss,setRowss]=React.useState([])
  
  
    React.useEffect(()=>{
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.152:5000';
        axios.get(`${apiUrl}/canteen/c_usrl`)
        .then(res=>{
            console.log(res.data);
            res.data.forEach(emp => {
              setRowss((row)=>[...row,{
                id:emp.tk_no,
                name:emp.name,
                cate:emp.cate
              }])
            });
        })
    },[])
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        
        rows={rowss}
        
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}