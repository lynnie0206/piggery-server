
const express = require('express'); 
  
const app = express(); 
var http = require("http").Server(app);
var mysql = require("mysql");
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
  host: "localhost",
  user: "dimpkqca_dimple",
  password: "Baboy@4722635",
  database: "dimpkqca_piggery"
});
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "piggerydb",
// });
connection.connect((err) => {
  if (err) return console.error(err.message);

  console.log('Connected to the MySQL server.');
});

const cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 ,// some legacy browsers (IE11, various SmartTVs) choke on 204 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(function (req, res, next) {
  //res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH, PUT, DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //	res.header("Access-Control-Allow-Origin", "*");

  next();
});

  
app.post("/loginData", async(req, res) => {
  try {
    var username = req.body.username;
    var password = req.body.password;
    var sql = "SELECT * FROM account WHERE Username = ? AND Password=?";
    connection.query(sql, [username,password], async function (err, rows, fields) {
      if (err) throw err;
      if (rows.length==0) {
          return res.status(404).send('User not found.');
        }
       else{
          return res.status(200).send(true);
       }
  
    });
  } catch (error) {
    console.log(error);
  }
 
});

app.post("/sowB4farrow", (req, res) => {
  var data = req.body;

  var sql = "INSERT INTO sow_before_farrow SET ?";
  var values = [data];

  connection.query(sql, values, function (err, rows, fields) {
    if (err) throw err;
    //console.log("Number of records inserted: " + rows.affectedRows);
    //console.log(rows);
    res.json(" records inserted ");
  });
});
app.post("/sowB4farrow1", (req, res) => {
  var data = req.body;

  var sql = "INSERT INTO breeding_records_nursery_pen SET ?";
  var values = [data];

  connection.query(sql, values, function (err, rows, fields) {
    if (err) throw err;
    //console.log("Number of records inserted: " + rows.affectedRows);
    //console.log(rows);
    res.json(" records inserted ");
  });
});
app.get("/SBFData", (req, res) => {
  connection.query(
    'SELECT *,DATE_FORMAT(STR_TO_DATE(28_ADE,"%m/%d/%Y"),"%m-%d") As 28_ADE,DATE_FORMAT(STR_TO_DATE(28_DEWORM,"%m/%d/%Y"),"%m-%d") As 28_DEWORM,DATE_FORMAT(STR_TO_DATE(21_HC,"%m/%d/%Y"),"%m-%d") As 21_HC,DATE_FORMAT(STR_TO_DATE(14_PARVO,"%m/%d/%Y"),"%m-%d") As 14_PARVO,DATE_FORMAT(STR_TO_DATE(IRON,"%m/%d/%Y"),"%m-%d") As IRON,DATE_FORMAT(STR_TO_DATE(107_DEWORM,"%m/%d/%Y"),"%m-%d") As 107_DEWORM,DATE_FORMAT(STR_TO_DATE(100_MYCO,"%m/%d/%Y"),"%m-%d") As 100_MYCO,DATE_FORMAT(STR_TO_DATE(93_HC,"%m/%d/%Y"),"%m-%d") As 93_HC,DATE_FORMAT(STR_TO_DATE(85_ECO,"%m/%d/%Y"),"%m-%d") As 85_ECO,DATE_FORMAT(STR_TO_DATE(78_PCV,"%m/%d/%Y"),"%m-%d") As 78_PCV,DATE_FORMAT(STR_TO_DATE(6871_PCV,"%m/%d/%Y"),"%m-%d") As 6871_PCV,DATE_FORMAT(STR_TO_DATE(6871_PRS,"%m/%d/%Y"),"%m-%d") As 6871_PRS,DATE_FORMAT(STR_TO_DATE(Wean,"%m/%d/%Y"),"%m-%d") As Wean,DATE_FORMAT(STR_TO_DATE(EFDate,"%m/%d/%Y"),"%m-%d") As EFDate,DATE_FORMAT(STR_TO_DATE(DateBreed,"%m/%d/%Y"),"%m-%d") As DateBreed,DATE_FORMAT(STR_TO_DATE(HeatCycle_21,"%m/%d/%Y"),"%m-%d") As HeatCycle_21,DATE_FORMAT(STR_TO_DATE(HeatCycle_42,"%m/%d/%Y"),"%m-%d") As HeatCycle_42,DATE_FORMAT(STR_TO_DATE(HeatCycle_63,"%m/%d/%Y"),"%m-%d") As HeatCycle_63,DATE_FORMAT(STR_TO_DATE(EFDate,"%m/%d/%Y"),"%M %Y") As DateFarrow FROM sow_before_farrow WHERE isDeleted=0',
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    }
  );
});
app.get("/login", (req, res) => {
    connection.query(
      'SELECT * FROM account',
      function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
      }
    );
  });
app.post("/SBFData3", (req, res) => {
  var ToNum = req.body.ToNum;
  var FromNum = req.body.FromNum;

  var sql =
    'SELECT *,DATE_FORMAT(STR_TO_DATE(28_ADE,"%m/%d/%Y"),"%m-%d") As 28_ADE,DATE_FORMAT(STR_TO_DATE(28_DEWORM,"%m/%d/%Y"),"%m-%d") As 28_DEWORM,DATE_FORMAT(STR_TO_DATE(21_HC,"%m/%d/%Y"),"%m-%d") As 21_HC,DATE_FORMAT(STR_TO_DATE(14_PARVO,"%m/%d/%Y"),"%m-%d") As 14_PARVO,DATE_FORMAT(STR_TO_DATE(IRON,"%m/%d/%Y"),"%m-%d") As IRON,DATE_FORMAT(STR_TO_DATE(107_DEWORM,"%m/%d/%Y"),"%m-%d") As 107_DEWORM,DATE_FORMAT(STR_TO_DATE(100_MYCO,"%m/%d/%Y"),"%m-%d") As 100_MYCO,DATE_FORMAT(STR_TO_DATE(93_HC,"%m/%d/%Y"),"%m-%d") As 93_HC,DATE_FORMAT(STR_TO_DATE(85_ECO,"%m/%d/%Y"),"%m-%d") As 85_ECO,DATE_FORMAT(STR_TO_DATE(78_PCV,"%m/%d/%Y"),"%m-%d") As 78_PCV,DATE_FORMAT(STR_TO_DATE(6871_PCV,"%m/%d/%Y"),"%m-%d") As 6871_PCV,DATE_FORMAT(STR_TO_DATE(6871_PRS,"%m/%d/%Y"),"%m-%d") As 6871_PRS,DATE_FORMAT(STR_TO_DATE(Wean,"%m/%d/%Y"),"%m-%d") As Wean,DATE_FORMAT(STR_TO_DATE(EFDate,"%m/%d/%Y"),"%m-%d") As EFDate,DATE_FORMAT(STR_TO_DATE(DateBreed,"%m/%d/%Y"),"%m-%d") As DateBreed,DATE_FORMAT(STR_TO_DATE(HeatCycle_21,"%m/%d/%Y"),"%m-%d") As HeatCycle_21,DATE_FORMAT(STR_TO_DATE(HeatCycle_42,"%m/%d/%Y"),"%m-%d") As HeatCycle_42,DATE_FORMAT(STR_TO_DATE(HeatCycle_63,"%m/%d/%Y"),"%m-%d") As HeatCycle_63,DATE_FORMAT(STR_TO_DATE(EFDate,"%m/%d/%Y"),"%M %Y") As DateFarrow FROM sow_before_farrow WHERE SowNo BETWEEN ? AND ?';
  connection.query(sql, [ToNum, FromNum], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});
app.post("/SBFData4", (req, res) => {
  var ToNum = req.body.ToNum;
  var str = req.body.ToNum;
  var arr = str.split(",");
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i];

    array.push(arr[i]);
  }
  console.log(array);
  var sql =
    'SELECT *,DATE_FORMAT(STR_TO_DATE(28_ADE,"%m/%d/%Y"),"%m-%d") As 28_ADE,DATE_FORMAT(STR_TO_DATE(28_DEWORM,"%m/%d/%Y"),"%m-%d") As 28_DEWORM,DATE_FORMAT(STR_TO_DATE(21_HC,"%m/%d/%Y"),"%m-%d") As 21_HC,DATE_FORMAT(STR_TO_DATE(14_PARVO,"%m/%d/%Y"),"%m-%d") As 14_PARVO,DATE_FORMAT(STR_TO_DATE(IRON,"%m/%d/%Y"),"%m-%d") As IRON,DATE_FORMAT(STR_TO_DATE(107_DEWORM,"%m/%d/%Y"),"%m-%d") As 107_DEWORM,DATE_FORMAT(STR_TO_DATE(100_MYCO,"%m/%d/%Y"),"%m-%d") As 100_MYCO,DATE_FORMAT(STR_TO_DATE(93_HC,"%m/%d/%Y"),"%m-%d") As 93_HC,DATE_FORMAT(STR_TO_DATE(85_ECO,"%m/%d/%Y"),"%m-%d") As 85_ECO,DATE_FORMAT(STR_TO_DATE(78_PCV,"%m/%d/%Y"),"%m-%d") As 78_PCV,DATE_FORMAT(STR_TO_DATE(6871_PCV,"%m/%d/%Y"),"%m-%d") As 6871_PCV,DATE_FORMAT(STR_TO_DATE(6871_PRS,"%m/%d/%Y"),"%m-%d") As 6871_PRS,DATE_FORMAT(STR_TO_DATE(Wean,"%m/%d/%Y"),"%m-%d") As Wean,DATE_FORMAT(STR_TO_DATE(EFDate,"%m/%d/%Y"),"%m-%d") As EFDate,DATE_FORMAT(STR_TO_DATE(DateBreed,"%m/%d/%Y"),"%m-%d") As DateBreed,DATE_FORMAT(STR_TO_DATE(HeatCycle_21,"%m/%d/%Y"),"%m-%d") As HeatCycle_21,DATE_FORMAT(STR_TO_DATE(HeatCycle_42,"%m/%d/%Y"),"%m-%d") As HeatCycle_42,DATE_FORMAT(STR_TO_DATE(HeatCycle_63,"%m/%d/%Y"),"%m-%d") As HeatCycle_63,DATE_FORMAT(STR_TO_DATE(EFDate,"%m/%d/%Y"),"%M %Y") As DateFarrow FROM sow_before_farrow WHERE SowNo IN(?)';
  connection.query(sql, [array], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.post("/account", (req, res) => {
  var data = req.body;

  var sql = "INSERT INTO account SET ?";
  var values = [data];

  connection.query(sql, values, function (err, rows, fields) {
    if (err) throw err;
    //console.log("Number of records inserted: " + rows.affectedRows);
    //console.log(rows);
    res.json(" records inserted ");
  });
});
app.get("/SBFData1", (req, res) => {
  connection.query(
    'SELECT *,DATE_FORMAT(STR_TO_DATE(DateBreed,"%m/%d/%Y"),"%Y") AS DateBreed1 FROM sow_before_farrow WHERE isDeleted=0 GROUP BY SowNo ORDER BY DateBreed1 DESC',
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    }
  );
});
app.get("/SBFDataMonthly", (req, res) => {
  connection.query(
    'SELECT *,DATE_FORMAT(STR_TO_DATE(EFDate,"%m/%d/%Y"),"%M %Y") As DateFarrow FROM sow_before_farrow GROUP BY DateFarrow',
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    }
  );
});
app.post("/typeData1", (req, res) => {
  var table = req.body.Table;
  var group = req.body.Group;
  var sql = "SELECT * FROM ??";
  connection.query(sql, [table], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});
app.post("/typeData", (req, res) => {
  var table = req.body.Table;
  var group = req.body.Group;
  var sql = "SELECT * FROM ?? GROUP BY ??";
  connection.query(sql, [table, group], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});
app.post("/SBFDataID", (req, res) => {
  var id = req.body.ID;
  var sql = "SELECT * FROM sow_before_farrow WHERE SowNo=? AND isDeleted=0";
  connection.query(sql, [id], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});
app.post("/updateAccount", (req, res) => {
  var id = req.body.ID;
  //console.log(req.body);
  var data = req.body;
  var sql = "UPDATE account SET ? WHERE ID = ?";
  var values = [data, id];
  connection.query(sql, values, function (err, rows, fields) {
    if (err) throw err;
    //console.log("Number of records inserted: " + rows.affectedRows);
    //console.log(rows);
    res.json("records upated");
  });
});
app.post("/SBFDataID", (req, res) => {
  var id = req.body.ID;
  var sql = "SELECT * FROM sow_before_farrow WHERE SowNo=?";
  connection.query(sql, [id], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.post("/updatesowB4farrow", (req, res) => {
  var id = req.body.ID;
  //console.log(req.body);
  var data = req.body;
  var sql = "UPDATE sow_before_farrow SET ? WHERE ID = ?";
  var values = [data, id];
  connection.query(sql, values, function (err, rows, fields) {
    if (err) throw err;
    //console.log("Number of records inserted: " + rows.affectedRows);
    //console.log(rows);
    res.json("records upated");
  });
});
app.get("/breedingData", (req, res) => {
  connection.query(
    'SELECT *,DATE_FORMAT(STR_TO_DATE(DateBorn,"%m/%d/%Y"),"%M %Y") As DateBorn1 FROM breeding_records_nursery_pen WHERE isDeleted=0 GROUP BY LitterNo ORDER BY DateBorn ASC',
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    }
  );
});
app.post("/SBFDataID1", (req, res) => {
  var id = req.body.ID;
  var sql =
    'SELECT * FROM sow_before_farrow WHERE DATE_FORMAT(STR_TO_DATE(EFDate,"%m/%d/%Y"),"%M %Y")=? and isDeleted=0';
  connection.query(sql, [id], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});
app.post("/breedingDataID", (req, res) => {
  var id = req.body.ID;
  var sql =
    'SELECT *,DATE_FORMAT(STR_TO_DATE(DateBorn,"%m/%d/%Y"),"%m-%d") As DateBorn1,DATE_FORMAT(STR_TO_DATE(DateWeaned,"%m/%d/%Y"),"%m-%d") As DateWeaned,DATE_FORMAT(STR_TO_DATE(13_Iron,"%m/%d/%Y"),"%m-%d") As 13_Iron,DATE_FORMAT(STR_TO_DATE(7_SUVAXYHPS,"%m/%d/%Y"),"%m-%d") As 7_SUVAXYHPS,DATE_FORMAT(STR_TO_DATE(1214_IRONCASTR,"%m/%d/%Y"),"%m-%d") As 1214_IRONCASTR,DATE_FORMAT(STR_TO_DATE(21_HC,"%m/%d/%Y"),"%m-%d") As 21_HC,DATE_FORMAT(STR_TO_DATE(28_B12OXYWEAN,"%m/%d/%Y"),"%m-%d") As 28_B12OXYWEAN,DATE_FORMAT(STR_TO_DATE(35_HPSHC,"%m/%d/%Y"),"%m-%d") As 35_HPSHC,DATE_FORMAT(STR_TO_DATE(42_PRRS,"%m/%d/%Y"),"%m-%d") As 42_PPRS,DATE_FORMAT(STR_TO_DATE(51_DEWORM,"%m/%d/%Y"),"%m-%d") As 51_DEWORM,DATE_FORMAT(STR_TO_DATE(65_PRV,"%m/%d/%Y"),"%m-%d") As 65_PRV,DATE_FORMAT(STR_TO_DATE(130_PCV,"%m/%d/%Y"),"%m-%d") As 130_PCV,DATE_FORMAT(STR_TO_DATE(21_myco,"%m/%d/%Y"),"%m-%d") As 21_myco,DATE_FORMAT(STR_TO_DATE(42_PRRS,"%m/%d/%Y"),"%m-%d") As 42_PRRS FROM breeding_records_nursery_pen WHERE DATE_FORMAT(STR_TO_DATE(DateBorn,"%m/%d/%Y"),"%M %Y")=?';
  connection.query(sql, [id], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});
app.post("/breedingDataID1", (req, res) => {
  var id = req.body.ID;
  var sql = "SELECT * FROM breeding_records_nursery_pen WHERE LitterNo=? and isDeleted=0";
  connection.query(sql, [id], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});
app.post("/deleteBreeding", (req, res) => {
    var id = req.body.ID;
    var sql = "UPDATE breeding_records_nursery_pen SET isDeleted=1 WHERE ID = ?";
    connection.query(sql, [id], function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    });
  });
  app.post("/deleteSow", (req, res) => {
    var id = req.body.ID;
    var sql = "UPDATE sow_before_farrow SET isDeleted=1 WHERE ID = ?";
    connection.query(sql, [id], function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    });
  });
app.post("/delete", (req, res) => {
  var id = req.body.ID;
  var table = req.body.tableName;

  var sql = "DELETE FROM ?? where ID= ?";
  connection.query(sql, [table, id], function (err, rows, fields) {
    if (err) throw err;
    //console.log(rows);
    res.json(rows);
  });
});
app.post("/searchData", (req, res) => {
  var column = req.body.searchList;
  var table = req.body.tableName;
  var field = req.body.search;
  var search = "%" + req.body.search + "%";
  var sql = "SELECT * FROM ?? WHERE ?? LIKE ? GROUP BY ??";
  connection.query(
    sql,
    [table, column, search, column],
    function (err, rows, fields) {
      if (err) throw err;
      //console.log(rows);
      res.json(rows);
    }
  );
});
app.post("/searchData1", (req, res) => {
  var column = req.body.searchList;
  var table = req.body.tableName;
  var field = req.body.search;
  var search = "%" + req.body.search + "%";
  var sql = "SELECT ?? FROM ?? WHERE ?? LIKE ?";
  connection.query(
    sql,
    [column, table, column, search],
    function (err, rows, fields) {
      if (err) throw err;
      //console.log(rows);
      res.json(rows);
    }
  );
});
app.post("/breeding", (req, res) => {
  var data = req.body;
  var sql = "INSERT INTO breeding_records_nursery_pen SET ?";
  var values = [data];
  connection.query(sql, values, function (err, rows, fields) {
    if (err) throw err;
    res.json(" records inserted ");
  });
});

app.post("/updatebreedingRecords", (req, res) => {
  var id = req.body.ID;
  //console.log(req.body);
  var data = req.body;
  var sql = "UPDATE breeding_records_nursery_pen SET ? WHERE ID = ?";
  var values = [data, id];
  connection.query(sql, values, function (err, rows, fields) {
    if (err) throw err;
    //console.log("Number of records inserted: " + rows.affectedRows);
    //console.log(rows);
    res.json("records upated");
  });
});
app.use('/', (req, res) => { 
    res.status(404).send('<h1>404! Page not found</h1>'); 
  }); 
http.listen(process.env.PORT || 3000, function () {
  console.log("Connected & Listen to port 8080");
});
