import handler from "./handler.js";
import express from "express";
import sqlite3 from "sqlite3";

const port = 8080;
const app = express();
const db_name = "database.sqlite";
import bodyParser from "body-parser";
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

console.log("Connected to the database.");

app.use("/", express.static("static"));

app.use("/foo", express.json());
app.post("/bar", function (req, res) {
    const responseObj = handler(req.body);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(responseObj));
});



app.get("/find_restaurant", function (req, res) {
    let sql = "SELECT town_id, town_name FROM town_list";
    let db = new sqlite3.Database(db_name);


  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.town_name);
  });
  res.send(rows [0].town_name);
});
db.close();
})



app.get("/list_towns", function (req, res) {
    let sql = "SELECT town_id, town_name FROM town_list";
    let db = new sqlite3.Database(db_name);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.send(JSON.stringify(rows));
});
db.close();
});




app.get("/list_restaurants", function (req, res) {
  let sql = "SELECT restaurant_id, restaurant_name FROM restaurant_list";
  let db = new sqlite3.Database(db_name);
db.all(sql, [], (err, rows) => {
if (err) {
  throw err;
}
res.send(JSON.stringify(rows));
});
db.close();
});



app.get("/list_reviews", function (req, res) {
  let sql = `SELECT  rl.restaurant_name, rv.requirement, rv.star_rating,
  rv.comment FROM reviews rv
  inner join restaurant_list rl on rl.restaurant_id = rv.restaurant_id
  where rv.restaurant_id = ? and rv.requirement = ?`;
  let db = new sqlite3.Database(db_name);
  let restaurant = req.query.restaurant_choice;
  let requirement = req.query.requirement_choice;
db.all(sql, [restaurant, requirement], (err, rows) => {
if (err) {
  throw err;
}
res.send(JSON.stringify(rows));
});
db.close();
});



app.post("/add_review", function (req, res) {
   let db = new sqlite3.Database(db_name);
   let sql = `INSERT INTO reviews( restaurant_id,
    requirement,
    star_rating,
    comment)
   VALUES(?, ?, ?, ?)`;
   let restaurant = req.body.restaurant_choice;
   let requirement = req.body.requirement_choice;
   let star_rating = req.body.star_rating;
   let comment = req.body.comment;
db.run(sql, [restaurant, requirement, star_rating, comment],
  function(err) {
  if (err) {
    return console.log(err.message);
  }
 // console.log(`A row has been inserted with rowid ${this.lastID}`);
  console.log(restaurant, requirement, star_rating, comment);
});
//MAKE THIS WORK TOMORROW!!
let sql1 = `UPDATE restaurant_list set ${requirement}_total_stars=${requirement}_total_stars + ?,
${requirement}_num_reviews = ${requirement}_num_reviews + 1 where restaurant_id =?`;
  db.run(sql1, [star_rating, restaurant],
    function(err) {
    if (err) {
      return console.log(err.message);
    }
 //  console.log(`row ${this.lastID} has been updated`);
db.close();
res.redirect("back");
});
});



app.get("/restaurants_for_town_needs", function (req, res) {
    let sql = `SELECT restaurant_id, restaurant_name,
    vegan_total_stars, vegan_num_reviews, vegan_total_stars,
    vegan_num_options, vegetarian_total_stars, vegetarian_num_reviews,
    vegetarian_total_stars, vegetarian_num_options,
    coeliac_total_stars, coeliac_num_reviews,
    coeliac_total_stars, coeliac_num_options,
    town_name
    from restaurant_list r
    inner join town_list t on r.town_id=t.town_id
    where r.town_id = ?`;
    let db = new sqlite3.Database(db_name);
    let town = req.query.town_list;
    db.all(sql, [town], (err, rows) => {
        if (err) {
          throw err;
        }
        res.send(JSON.stringify(rows));

    });


    db.close();

});


let server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("listening at http://%s:%s", host, port);
});
