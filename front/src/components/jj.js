import React, {useEffect, useContext, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { getTypographyUtilityClass, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const Listproduct = () => {
  const [data,setData]=useState([])
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentEmp,setCurrentEmp]=useState({})
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const handleClose = () => setOpen(false);

  useEffect(()=>{
      axios.get(`http://localhost:3002/product`).then(response=>{
        if(response.data.status==200)
        {
          
          setData(response.data.data)
        }
      })
  },[])
  const getpro=()=>{
    axios.get(`http://localhost:3002/product`).then(response=>
        setData(response.data.data)
        )
  }
  const getDataById = (val) => {
    const filteredRows = data.filter((row) => {
      return row.id === val;
    });
    setCurrentEmp(filteredRows[0]);
    setOpen(true);
  };
  const DeleteEmp = () => {
    axios.delete(`http://localhost:3002/product/delete/${deleteId}`).then(response=>{
      console.log(response.data)
      if(response.data.status === 200){
        getpro();
      }
      else{

      }
    }).catch(error=>{
      console.log(error)
    })
    setDeleteOpen(false)
  }
  const UpdateEmp = () => {
    axios.put('http://localhost:3002/employee/update', {currentEmp}).then(response=>{
      console.log(response.data)
      if(response.data.status === 200){
        getpro();
      }
      else{
      }
    }).catch(error=>{
      console.log(error)
    })
    setOpen(false);
  }

  
  return (
   <div style={{maxWidth:1000,maxHeight:1000}}>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         
        <Box sx={style}>
        <TextField id="standard-basic" variant="outlined" label="Product Name" style={{width:'100%',padding:10}} 
          defaultValue={currentEmp?currentEmp.pro_name:null} 
          onChange={(event)=>setCurrentEmp({...currentEmp, pro_name: event.target.value})}></TextField>
        <TextField id="standard-basic" variant="outlined" label="category" style={{width:'100%',padding:10}} 
          defaultValue={currentEmp?currentEmp.catagories:null} 
          onChange={(event)=>setCurrentEmp({...currentEmp, catagories: event.target.value})}/>
        <TextField id="standard-basic" variant="outlined" label="quantity" style={{width:'100%',padding:10}} 
          defaultValue={currentEmp?currentEmp.quan:null} 
          onChange={(event)=>setCurrentEmp({...currentEmp, quan: event.target.value})}/>
          <TextField id="standard-basic" variant="outlined" label="supplier_name" style={{width:'100%',padding:10}} 
          defaultValue={currentEmp?currentEmp.supplier:null} 
          onChange={(event)=>setCurrentEmp({...currentEmp, supplier: event.target.value})}/>
          
          <TextField id="standard-basic" variant="outlined" label="buying_price" style={{width:'100%',padding:10}} 
          defaultValue={currentEmp?currentEmp.buy_price:null} 
          onChange={(event)=>setCurrentEmp({...currentEmp, buy_price: event.target.value})}/>
          <TextField id="standard-basic" variant="outlined" label="Selling_Price" style={{width:'100%',padding:10}} 
          defaultValue={currentEmp?currentEmp.price:null} 
          onChange={(event)=>setCurrentEmp({...currentEmp, price: event.target.value})}/>
          <Grid container>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" style={{width:'100%',backgroundColor:'#ccc',color:'#000'}}
              onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" color="primary" style={{width:'100%'}}
              disabled={currentEmp.user_name == '' || currentEmp.password == '' || currentEmp.phone == ''? true:false}
              onClick={UpdateEmp}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={deleteOpen}
        onClose={()=>setDeleteOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography style={{textAlign:'center'}}>
                <h3>Are you sure to remove this Delete Product</h3>
            </Typography>
            
            <Grid container>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" style={{width:'100%',backgroundColor:'#ccc',color:'#000'}}
              onClick={()=>setDeleteOpen(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={6} item style={{padding:10,alignItems:'center'}} >
              <Button variant="contained" color="primary" style={{width:'100%'}}
              onClick={DeleteEmp}>
                Yes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
   
    
    <Box>
      <br/><br/>
    
    
    <Card elevation={3}>
    <TableContainer sx={{ maxHeight: 540 }}>
      <Table stickyHeader aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={9}>
              <b>Number of Product: </b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Id</b></TableCell>
            <TableCell><b>Product Name</b></TableCell>
            <TableCell><b>Category</b></TableCell>
            <TableCell><b>Supplier_name</b></TableCell>
            <TableCell><b>quantity</b></TableCell>
            <TableCell><b>Buying_price</b></TableCell>
            <TableCell><b>Selling_Price</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((data,index)=>(
              <TableRow 
              key={data.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{index}</TableCell> 
              <TableCell>{data.pro_name}</TableCell>
              <TableCell>{data.catagories}</TableCell>
              <TableCell>{data.supplier}</TableCell>
              <TableCell>{data.quan}</TableCell>
              <TableCell>{data.buy_price}</TableCell>
              <TableCell>{data.price}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell style={{width:180}}>
              <Button variant="contained" onClick={()=>getDataById(data.id)}>
                    <EditIcon style={{fontSize:16}} />
                </Button>&nbsp;
                <Button variant="contained" style={{backgroundColor:'#0f1d6b'}} 
                onClick={()=>{
                  setDeleteOpen(true)
                  setDeleteId(data.id)
                }}>
                    <DeleteIcon style={{fontSize:16}} />
                </Button></TableCell>               
              </TableRow>
            ))
          }
        </TableBody>
    
      </Table>
      
    </TableContainer>
    </Card>
    </Box>
    <br/>
    <Link to="/addproduct" style={{textDecoration:'none',position:'absolute'}}>
        <Button variant="contained">Add Product &nbsp;<PersonAddAltIcon /></Button>
      </Link>
   </div>
  )
}

export default Listproduct