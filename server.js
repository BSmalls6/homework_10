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
  fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8", function(data,err){
    console.log(data);
          return res.json(JSON.parse(data));
      });
});



// actions


  
  app.post("/api/notes", function(req, res) {
let note = req.body;
console.log(note);
    let noteData = fs.readFileSync(path.join("./db/db.json"), res , (err)=>{
      if (err) throw (err);
    });
    console.log(noteData);
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
