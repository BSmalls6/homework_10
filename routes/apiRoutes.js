const router = require("express").Router();
const db = require("../db/database");

// GET "/api/notes" responds with all notes from the database
router.get("/notes", function(req, res) {
  db
    .getNotes()
    .then(notes => res.json(notes))
});

router.post("/notes", (req, res) => {
  db
    .addNote(req.body)
    .then((note) => res.json(note))
});

// DELETE "/api/notes" deletes the note with an id equal to req.params.id
router.delete("/notes/:id", function(req, res) {
  db
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
});

module.exports = router;
