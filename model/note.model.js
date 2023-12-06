const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    userID: String,
    username: String,
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = {
  NoteModel,
};
