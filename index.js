const express = require('express');
const app = express();
const mysql = require('mysql');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// create connection to database
// make sure to replace your own connection details
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blogdb"
});

// connect to database
con.connect(err => {
  if (err) throw err;
  console.log("Connected to database");
});

// create blog table
// con.query(
//   "CREATE TABLE IF NOT EXISTS blogs (id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, body TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)",
//   (err, result) => {
//     if (err) throw err;
//     console.log("Blog table created");
//   }
// );

// create a new blog
app.post("/blogs", (req, res) => {
  let sql = "INSERT INTO blogs (id,title, body) VALUES ?";
  let values = [
    [req.body.id, req.body.title, req.body.body]
  ];
  con.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log("New blog created");
    res.send("New blog created");
  });
});

// read a blog
app.get("/blogs/:id", (req, res) => {
  let sql = "SELECT * FROM blogs WHERE id = ?";
  let id = req.params.id;
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log("Blog retrieved");
    res.send(result);
  });
});

// update a blog
app.put("/blogs/:id", (req, res) => {
  let sql = "UPDATE blogs SET title = ?, body = ? WHERE id = ?";
  let values = [req.body.title, req.body.body, req.params.id];
  con.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log("Blog updated");
    res.send("Blog updated");
  });
});

// delete a blog
app.delete("/blogs/:id", (req, res) => {
  let sql = "DELETE FROM blogs WHERE id = ?";
  let id = req.params.id;
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log("Blog deleted");
    res.send("Blog deleted");
  });
});


// start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
