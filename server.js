var express = require("express");
var fs = require("fs");
var path = require("path")
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./homework_10")));

// pathing
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"), "utf8")
      .then(function (res) {
          return res.json(JSON.parse(res));
      });
});


app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8")
});

// end pathing
// actions
app.get("/api/notes", function(req, res) {
fs.readFile(path.join("./db/db", res , (err)=>{
  if (err) throw (err);
}))
  });

  
  app.post("/api/notes", function(req, res) {
let note = req.body;
    let noteData = fs.readFile(path.join("./db/db", res , (err)=>{
      if (err) throw (err);
    }));
    let newNote = JSON.parse(noteData);

    newNote.push(note);
  
    fs.writeFile("newNote", newNote, (err)=>{
        if (err) throw (console.log(err));
        console.log("new note success wrote");
    });
     
    
  });

  app.delete('/delete/:id', function (req, res) {

    fs.readFile(__dirname + "/api/notes", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data = data.filter(x=>x.id!=req.params.id);
        console.log(data);
        fs.writeFile('users.json', JSON.stringify(data), function (err) {
            if(err){return console.log(err);}
        });
    });
});
  
// end of actions

require("./routes")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
