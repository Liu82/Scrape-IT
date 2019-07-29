var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var NoteSchema = new Schema({

  title: String,

  body: String
});


var Node = mongoose.model("Note", NoteSchema);


module.exports = Note;