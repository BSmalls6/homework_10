var express = require("express");
var fs = require("fs");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("public/assets/js/index.js", function(req, res) {
    res.json(activeNote);
  });

  
  app.post("./journal.json", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    fs.writeFile("newNote", activeNote, (err)=>{
        if (err) throw (err);
        console.log("new note success wrote");
    });
     
    
  });
  


require("./routes")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
