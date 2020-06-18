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
/* function StringifyData(err, rows) {
    if (err) {
      throw err;
    }
/*     rows.forEach((row) => {
      console.log(row.town_name);
    }); 
    res.send(rows [0].town_name);
  } */

function SelectRestFromList(req, res) {
    let sql = "SELECT town_id, town_name FROM town_list";
    let db = new sqlite3.Database(db_name);
    function StringifyData(err, rows) {
      if (err) {
        throw err;
      }
  /*     rows.forEach((row) => {
        console.log(row.town_name);
      }); */
      res.send(rows [0].town_name);
    }
  db.all(sql, [], StringifyData);
db.close();
}

app.get("/find_restaurant", SelectRestFromList);

function SelectTownFromList(req, res) {
    let sql = "SELECT town_id, town_name FROM town_list";
    let db = new sqlite3.Database(db_name);
    function StringifyData(err, rows) {
      if (err) {
        throw err;
      }
  /*     rows.forEach((row) => {
        console.log(row.town_name);
      }); */
      res.send(rows [0].town_name);
    }
  db.all(sql, [], StringifyData);
db.close();
}

app.get("/list_towns", SelectTownFromList);

function ListRestaurant(req, res) {
    let sql = "SELECT restaurant_id, restaurant_name FROM restaurant_list";
    let db = new sqlite3.Database(db_name);
    function StringifyData(err, rows) {
      if (err) {
        throw err;
      }
  /*     rows.forEach((row) => {
        console.log(row.town_name);
      }); */
      res.send(rows [0].town_name);
    }
  db.all(sql, [], StringifyData);
  db.close();
}

app.get("/list_restaurants", ListRestaurant);

function SelectReviews(req, res) {
    let sql = `SELECT  rl.restaurant_name, rv.requirement, rv.star_rating,
    rv.comment FROM reviews rv
    inner join restaurant_list rl on rl.restaurant_id = rv.restaurant_id
    where rv.restaurant_id = ? and rv.requirement = ?`;
    let db = new sqlite3.Database(db_name);
    let restaurant = req.query.restaurant_choice;
    let requirement = req.query.requirement_choice;
    function StringifyData(err, rows) {
      if (err) {
        throw err;
      }
  /*     rows.forEach((row) => {
        console.log(row.town_name);
      }); */
      res.send(rows [0].town_name);
    }
  db.all(sql, [restaurant, requirement], StringifyData);
  db.close();
  }

app.get("/list_reviews", SelectReviews);

function ReviewFunction(req, res) {
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
 }

app.post("/add_review", ReviewFunction);

function RestaurantsForNeeds(req, res) {
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
    function StringifyData(err, rows) {
      if (err) {
        throw err;
      }
  /*     rows.forEach((row) => {
        console.log(row.town_name);
      }); */
      res.send(rows [0].town_name);
    }
    db.all(sql, [town], StringifyData);
    db.close();
}

app.get("/restaurants_for_town_needs", RestaurantsForNeeds);


let server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("listening at http://%s:%s", host, port);
});
