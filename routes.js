
var path = require("path");



module.exports = function(app) {
 
//   app.get("/notes", function(req, res) {
//     res.sendFile(path.join(__dirname, "./public/notes.html"));
//   });

//   app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "./public/index.html"));
//   });

//   app.get("/api/notes", function(req, res) {
//     false.sendFile(path.join(__dirname, "./db/db.json"), "utf8")
//   });
// };

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function (req, res) {
  readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
      .then(function (data) {
          return res.json(JSON.parse(data));
      });
});
app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
});

};
