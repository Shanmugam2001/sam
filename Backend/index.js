const express=require('express');
const cors=require('cors');
const staff=require('./bio/staff');
const master=require('./bio/master');
const sql=require('mssql');
const canteen=require('./bio/canteen');
const config = require('./bio/db');
const bodyParser = require('body-parser');
// const sql=require('mssql');

const app=express();
app.use(cors());
app.use( bodyParser.json());    
app.get('/',(req,res)=>{

    res.send("Welcome")
})



app


app.use('/m',master);
app.use('/canteen',canteen);



app.listen(3006,()=>{
    console.log("server started 3006 port");
})





// sql.connect(config)
// .then(() => {
//   console.log('Connected to MSSQL database');
//   // Your code here
// })
// .catch((err) => {
//   console.error('Error connecting to MSSQL database:', err);
// });

// const pool = new sql.ConnectionPool(config);
// const poolConnect = pool.connect(); 
// app.get('/data', async (req, res) => {
//     try {
//       await poolConnect; // Wait for the connection to be established
  
//       const request = pool.request();
//       const result = await request.query('SELECT * FROM canteen_usr where cate=01');
  
//       res.json(result.recordset);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
