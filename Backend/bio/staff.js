const dbf = require('dbf');
const fs = require('fs');
const express = require('express')
const router = express.Router()


// router.use((req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
//   })

function AddNumbers(a,b){
  return a+b;
}
router.get('/2',(req,res)=>{
    
    res.send("here you can get all details ")
})
router.get('/ls',(req,res)=>{
  // const filePath = 'D:/SAM/backend/bio/MANMST.DBF';

  // // Create a new DBF reader
  // const reader = new dbf.Reader(filePath);
  
  // // Get column names
  // const columnNames = reader.fields.map((field) => field.name);
  
  // console.log('Column Names:', columnNames);
  
  // let totalRecords = 0;
  
  // // Read records from the DBF file and count them
  // reader.readRecords((record) => {
  //   // Process each record if needed
  //   totalRecords++;
  // });
  
  // // Handle the 'end' event when all records have been read
  // reader.on('end', () => {
  //   console.log('Total Records:', totalRecords);
  // });
  
  // // Handle errors
  // reader.on('error', (err) => {
  //   console.error('Error reading DBF file:', err);
  // });
  const filePath = 'D:/SAM/backend/bio/MANMST.DBF';

const buffer = fs.readFileSync(filePath);
const table = dbf.Table(buffer);

// Get column names
const columnNames = table.fields.map((field) => field.name);
console.log('Column Names:', columnNames);

// Get total number of records
const totalRecords = table.recordCount;
console.log('Total Records:', totalRecords);
  const v = AddNumbers(5,6);
  res.send({ value:totalRecords})
})

  module.exports = router