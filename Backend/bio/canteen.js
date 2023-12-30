const express=require('express')
const rs=express.Router()
const sql =require('mssql')

const config=require('./db')
//add user for canteen 
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect(); 
const dbf = require('dbf');

rs.get("/c_entry",(req,res)=>{
  const pc = pool.request(); 
  pc.query('select  top 200 * from canteen  order by f_time desc ')
  .then((result)=>{
    res.send(result.recordsets[0])
  })
  .catch((err)=>{
        res.send({"error":err})
  })
  // let dateObj = new Date();
 
// // Subtract one day from current time                        
// dateObj.setDate(dateObj.getDate() - 1);
 
// console.log(dateObj.toJSON().slice(0,10));
//   res.send(dateObj.toJSON().slice(0,10));
})


rs.post("/c_entry",(req,res)=>{
  const pc = pool.request(); 
  pc.input('tk',sql.NVarChar,req.body.TOKEN_NO)
  .input('shift_c',sql.Int,req.body.SHIFT_C)
  .input('shift_date',sql.DateTime,req.body.SHIFT_DATE)
  .query('INSERT INTO CANTEEN (TOKEN_NO,SHIFT_C,SHIFT_DATE) VALUES(@tk,@shift_c,@shift_date)')
  .then((result)=>{
    send({status:200,data:"added"});
  })
  .catch((err)=>{
    res.send({status:400,data:"faild to insert"});
  })
})

// rs.delete("/c_entry",(req,res)=>{
//   const pc=pool.request();
//   pc.input()
// })



   




module.exports =rs