// import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Add_emp from './Add_emp';
import Emp_table from './Emp_table';


const Can_emp=()=>{

    const [data,setData]=useState([]);
    useEffect(()=>{
        const get_emp=async ()=>{
            try{
                const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.152:5000';
                const response= await axios.get(`${apiUrl}/cemp/`,{
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                  });
                if (response.status===200){

                    setData(response.data.items);
                }
            }catch(error){
                console.log(error);
            }
        }
        get_emp();
        
        // axios.get(`http://192.168.1.152:5000/cemp`,null,{
        //     headers: {
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     }
        // })
        // .then(res=>{
        //     console.log(res.data);
        //     setData(res.data);
        // })
    },[])

    return (
    //     <Box sx={{ flexGrow: 1 }}>
    //     <Stack direction="row" spacing={5} useFlexGap flexWrap="wrap">
    //     <Grid item sx={{ width: '50%' }}>
    //         <Add_emp/>
    //     </Grid>
    //     <Grid item sx={{ width: '60%' }}>
    //         <Emp_table/>
    //     </Grid>
    //     </Stack>
    // </Box>
    <div style={{display:"flex",flexDirection:"row"}}>
        <div style={{width:300}}>
            <Add_emp data={data}setData={setData}/>
        </div>
        <div style={{width:600,marginLeft: 30}}>
            <Emp_table  data={data}setData={setData}/>
        </div>
    </div>
    );
}


export default Can_emp;