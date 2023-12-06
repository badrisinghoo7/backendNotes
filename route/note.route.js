const express = require("express");
const { NoteModel } = require("../model/note.model");
const noteRouter = express.Router();

const { auth } = require("../middleware/auth.middleware");

noteRouter.use(auth);

noteRouter.post("/create", async (req, res) => {
  //   const { title, body } = req.body;
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res
      .status(200)
      .send({ msg: "A New note has been created", "new Note": req.body });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ username: req.body.username });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send(error);
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    if (req.body.userID == note.userID) {
      await NoteModel.findById({ _id: noteID }, req.body);
      res
        .status(200)
        .send({ msg: `The note with ID ${noteID} has been updated` });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
noteRouter.delete("/delete/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    if (req.body.userID == note.userID) {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res
        .status(200)
        .send({ msg: `The note with ID ${noteID} has been deleted` });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = {
  noteRouter,
};
