var express = require('express');
var router = express.Router();


/* GET users listing. */
//router.get('/', function(req, res, next) {
 // var db = req.db;
  //var collection = db.get('userlist');
  //collection.find({},{},function(e,docs){
    //res.json(docs);
  //});
 // res.send('respond with a resource');
//});

//module.exports = router;

//var Connection = require('tedious').Connection;
//var Request = require('tedious').Request;

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = {
  userName: 'astrani', // update me
  password: 'Ast@2017', // update me
  server: 'nodejssserver.database.windows.net',
 // update me
  options: {
      encrypt: 'true',
            database: 'nodejs_db'//update me
      }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
        console.log(err)
    }
    else{
        queryDatabase()
    }
});

function queryDatabase(){
    console.log('Reading rows from the Table...');

    // Read all rows from table
    try{
    request = new Request(
        //"SELECT TOP 1 pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid",
        "SELECT * from Sample", 
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
            //request.write(column.value)
        });
    });

    connection.execSql(request);
}
catch(e)
{
console.log("failed to get the records",e);
}
}
module.exports = router;