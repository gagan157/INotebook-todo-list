const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes')
const fetchuser = require('../Middlewares/fetchuserdetail')

//get notes
router.get('/getnotes', fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id })
  res.json(notes)
})


// add notes user wise
router.post('/addnotes',
  // call middleware and get id verfy tokken
  fetchuser,
  // validation 
  [
    body('title', '').isLength({ min: 3 }),
    body('description', '').isLength({ min: 5 }),
  ],
  // async callback in router
  async (req, res) => {
    const userid = req.user.id
    let tag =  req.body.tag
    if(!tag){
      tag
    }
    else{
      tag.charAt(0).toUpperCase() + req.body.tag.slice(1).toLowerCase()
    }
    const notes = await Notes.create({
      user: userid,
      title: req.body.title, 
      description: req.body.description,
      tag: tag
      
    })
    res.json({ notes: notes, msg: "add note successfully!" })
  })


module.exports = router


//update notes -- login reqired  http://localhost:5000/api/notes/updatenotes/:id
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
  const userid = req.user.id
  //detstuctre 
  const { title, description, tag } = req.body
  //craete new obj 
  const newNotes = {};
  //if title,description or tag is avalible then add in new obj
  if (title) { newNotes.title = title }
  if (description) { newNotes.description = description }
  if (tag) { newNotes.tag = tag }

  //get note by id if note not avalable then return  msg = not found
  let note = await Notes.findById(req.params.id)
  if (!note) {
    return res.status(404).send("Not Found")
  }

  //check fetchuser id and note user id equal each other if not equal then return msg = not allowed
  if (note.user.toString() !== userid) {
    return res.status(401).send("Not Allowed")
  }
  //get note by param id
  //findByIdAndUpdate reqired two argumnets 1.param id(given by user) , 2.new object
  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
  res.json({ note: note, msg: "update note successfully!" })
})



//delete note 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  //get user id by fetchuser token 
  const userid = req.user.id
  //get notes by id 
  let note = await Notes.findById(req.params.id)
  //if not get note by id  return not found
  if (!note) {
    return res.status(404).send("Not Found")
  }
  //compare notes in userid and fetchuser id 
  //if not equall to each other then return not allowed
  if (note.user.toString() !== userid) {
    return res.status(401).send("Not Allowed")
  }
  //get notes by id and delete
  await Notes.findByIdAndDelete(req.params.id)
  res.json({ msg: "delete note successfully!" })
})