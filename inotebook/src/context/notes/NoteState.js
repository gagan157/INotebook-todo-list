import Notecontext from "./noteContext";
import React, { useState ,useEffect} from 'react'
import { msgOpen } from "../../components/Message";

export default function NoteState(props) {
  const host = 'http://localhost:5000'
 
  const Notes = []


  const [notes, setNotes] = useState(Notes)
  

  //get data
  const getnotesdata = async () => {
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auttoken')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }

    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(json)
  }

  //add notes
  const addnote = async (title, description, tag) => {
    let data = {}
    if(tag){
      data = {title, description ,tag}
    }
    else{
      data = {title, description}
    }
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auttoken')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    const res = await json.notes
    setNotes(notes.concat(res));
    msgOpen(json.msg)
  }
  //update notes
  const updatenote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auttoken')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description ,tag})
    });
    const json = await response.json();
    let newnotes = [...notes]
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        setNotes(newnotes)
      }
      msgOpen(json.msg)
    }
  }
  //delete notes
  const deletenote = async (nid) => {
    const response = await fetch(`${host}/api/notes/deletenote/${nid}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auttoken')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    // console.log(json)
    const newnotes = notes.filter((note) => { return note._id !== nid })
    setNotes(newnotes)
    msgOpen(json.msg)
  }

useEffect(() => {  
   
}, [])


  return (
    <Notecontext.Provider value={{notes, addnote, updatenote, deletenote, getnotesdata }}>
      {props.children}
    </Notecontext.Provider>
  )
}





