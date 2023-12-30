var dbf = require('dbf-reader');
var fs = require('fs');

var buffer=fs.readFileSync('Z:/UNIT1/MANPOWER/MANMST.dbf')
var datatable = dbf.read(buffer);
if (datatable) {
    datatable.rows.forEach((row) => {
        datatable.columns.forEach((col) => {
            console.log(row[col.name]);
        });
    });
}