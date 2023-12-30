// const fs = require('fs');

// const dbfFilePath = 'Z:/UNIT1/MANPOWER/MANMST.dbf'; // Replace with the actual path to your FoxPro DBF file

// const readFoxProDbfFile = () => {
//   try {
//     const buffer = fs.readFileSync(dbfFilePath);
    
//     // Parse the header
//     const header = parseHeader(buffer);

//     // Parse the field descriptors
//     const fieldDescriptors = parseFieldDescriptors(buffer, header.fieldCount);

//     // Parse the records
//     const records = parseRecords(buffer, header.recordCount, fieldDescriptors);

//     console.log(records);
//   } catch (error) {
//     console.error('Error reading FoxPro DBF file:', error);
//   }
// };

// const parseHeader = (buffer) => {
//   // Implement logic to parse the header
// };

// const parseFieldDescriptors = (buffer, fieldCount) => {
//   // Implement logic to parse field descriptors
// };

// const parseRecords = (buffer, recordCount, fieldDescriptors) => {
//   // Implement logic to parse records
// };

// readFoxProDbfFile();
const express =require('express')
const rs= express.Router()
const sql =require('mssql')
const config=require('./db')
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect(); 


rs.get("/c_usrl",(req,res)=>{
  const pc = pool.request(); 
  pc.query('select * from canteen_user')
  .then((result)=>{
    res.send(result.recordsets[0])
  })
  .catch((err)=>{
        res.send({"error":err})
  })
    
        
})


rs.post("/create",(req,res)=>{
  const pc = pool.request(); 
  console.log(`person: ${JSON.stringify(req.body)}`);
  pc.input('tk',sql.NVarChar,req.body.TOKEN_NO)
  .input('name',sql.NVarChar,req.body.NAME)
  .input('cate',sql.Int,req.body.CATE)
  .query(`INSERT INTO canteen_user (TOKEN_NO,NAME,CATE) VALUES(@tk,@name,@cate)`,(err,result)=>{
      if(err){
        res.send({ data: err, status: 400 });
        console.log(err);
      }else{
        res.send({data:"Emp_added SuccuessFully",status:200});
        console.log(result);
      }
    })
})

rs.delete("/cemp_del/:token_no",(req,res)=>{
  console.log("sssf");
  const pc = pool.request(); 
   pc.input('tk',sql.NVarChar,req.params.token_no)
      .query("DELETE FROM canteen_user WHERE token_no=@tk",(err,result)=>{
    if(err){
      res.send({ data: err, status: 400 });
      console.log(err);ccc
    }else{
      res.send({data:"Emp_deleted",status:200});
      console.log(result);
    }
   })

})


rs.get("/c_usr",(req,res)=>{
  const pc = pool.request(); 
  pc.query('select * from canteen')
  .then((result)=>{
    res.send(result.recordsets[0])
  })
  .catch((err)=>{
        res.send({"error":err})
  })
    
        
})




module.exports =rs