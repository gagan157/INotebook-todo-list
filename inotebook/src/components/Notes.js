import React, { useState, useEffect,memo } from 'react'
import notecontext from '../context/notes/noteContext'
import usercontext from '../context/users/userscontext'
import { useContext } from 'react'
import Noteitems from './Noteitems'
import Formnote from './Formnote'
import { useNavigate } from 'react-router-dom'
import { Themecontext } from '../context/theme/ThemeState'

function Notes(props) {
  let nav = useNavigate()
  let notes = useContext(notecontext).notes
  let context = useContext(notecontext) 
  let context2 = useContext(usercontext) 
  let { getnotesdata} = context
  let { islogin,userdtl } = context2
  let notetitleo = 'Add';
  const [ntitleo, setNtitle] = useState(notetitleo)
  const [noteobj, setNoteobj] = useState({ id: '', title: '', des: '', tag: '' })
  const [filter, setFilter] = useState({ sort: 'filter' })
  
  
  const handlefilter = (e) => {
    // let val = e.target.value
    setFilter({sort:'newest first'})
    notes.reverse()
    // if(val==='sort'){
      
      //  let newnotes = tagsort.map((itemcat)=>{
      //    return notes.filter((item)=>{
      //      let iteminitemtag = item.tag.charAt(0).toUpperCase() + item.tag.slice(1).toLowerCase()
      //      return itemcat===iteminitemtag && item
      //     })
      //  })
      //  console.log(newnotes)
      // let notessort = []
      // for (let index = 0; index < tagsort.length; index++) {
      //   const elementcat = tagsort[index];       
      //   for (let index = 0; index < notes.length; index++) {
      //     const element = notes[index];         
      //     let elementtagcap = element.tag.charAt(0).toUpperCase() + element.tag.slice(1).toLowerCase()          
      //       if(elementcat === elementtagcap){              
      //         notessort.push(element)         
      //       }
      //   }
      // }
      // setnotess(notessort)
    // } 
  }

  const handleaddorupdatebtn = (id, name) => {
    setNtitle(name);
    setNoteobj({ id: id, })
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        setNoteobj({ id: element._id, title: element.title, des: element.description, tag: element.tag })
      }
    }
  }



  const handlecancleupdte = (name) => {
    setNtitle(name);
  }

  useEffect(() => {
    let tok = localStorage.getItem('auttoken')
    if (tok) {
      getnotesdata()
      
    }
    else {
      nav('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
     
      <div className='bg-transparent flex w-full justify-center items-start h-full my-10 md:flex-row flex-col gap-2 md:px-5'>
        {/* ------------------left--------------------- */}
        <div className={`md:sticky top-12 md:w-full md:h-full p-10 bg-gray-100 rounded-md bg-opacity-20 backdrop-blur-md  shadow-lg w-11/12 mx-auto `}>
          <h1 className='text-center uppercase text-2xl font-bold mb-10 text-white'>{ntitleo} your Notes</h1>
          <Formnote ntitle={ntitleo} cancle={handlecancleupdte} noteobj={noteobj} />
        </div>

        {/* ------------------right--------------------- */}
        <div className='md:w-full md:h-full p-10 bg-gray-100 rounded-md bg-opacity-20 backdrop-blur-md  shadow-lg w-11/12 mx-auto'>

          <div className='flex flex-col gap-3 w-full '>
            <h1 className='text-center uppercase text-2xl font-bold text-white mb-3'>Your Notes</h1>
            <div className='w-full flex justify-end z-10'>
              <div className=' relative group mx-5'>
                <button onClick={handlefilter} type='button' className=' w-fit bg-slate-50 py-2 px-4 font-semibold tracking-widest rounded-md capitalize'>filter</button>
                {/* <div className='bg-blue-400 w-fit absolute -left-2 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all my-1 rounded-md text-white shadow-lg'>
                  <option onClick={handlefilter} className='hover:bg-blue-300 hover:rounded-md p-2 capitalize cursor-pointer hover:shadow-lg hover:scale-105' value="sort">oldest first</option>
                  <option onClick={handlefilter} className='hover:bg-blue-300 hover:rounded-md p-2 capitalize cursor-pointer hover:shadow-lg hover:scale-105' value="newest">newest first</option>
                </div> */}
              </div>
            </div>

            {notes.length === 0 && <h1 className='text-lg capitalize font-extrabold text-white tracking-widest text-center'>No notes added yet..</h1>}
            {notes.map((noteitem) =>
              <Noteitems key={noteitem._id} noteitem={noteitem} edit={handleaddorupdatebtn} />
            )}

          </div>
        </div>
      </div>

    </>
  )
}


export default memo(Notes)