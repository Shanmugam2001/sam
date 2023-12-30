import React from 'react'
import './Centry.css'
import * as XLSX from 'xlsx';
const Report_table = ({rdata}) => {
    // console.log(rdata);
    
    const handleExport = () => {
        //Convert table data to worksheet
        const cdata=[];
        if(cdata.length!=0){
          rdata.map((rec)=>{
            cdata.push({
                "TokenNo":rec.tk_no,
                "Name":rec.name,
                "Cate":rec.cate,
                "Count":rec.Count <=25 ? 25:rec.Count,
                "Recount":rec.Count >25 ? rec.Count-25:''
            })
        })
        var wb = XLSX.utils.book_new(),
        ws=XLSX.utils.json_to_sheet(cdata);
        XLSX.utils.book_append_sheet(wb,ws,"Canteen");
        // Save the workbook as an Excel file
        XLSX.writeFile(wb, "Canteen.xlsx");
        }else{
          alert("column is empty")
        }
        
      };
  return (
    <div>
        <div >
        <button  style={{marginRight:10}} onClick={handleExport}>Export to Excel</button>
        </div>
      <table style={{width:500,height:400}}>
      <thead>
        <tr>
          <th>Token No</th>
          <th style={{width:300}}>Name</th>
          <th>Cate</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {
            rdata.map((rec)=>(
                <tr style={{maxHeight:10}}>
                    <td>{rec.tk_no}</td>
                    <td>{rec.name}</td>
                    <td>{rec.cate}</td>
                    <td>{rec.Count}</td>
                </tr>
            ))
        }
      </tbody>
      </table>
    </div>
  )
}

export default Report_table



