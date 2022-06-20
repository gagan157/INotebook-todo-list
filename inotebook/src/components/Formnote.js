import React, { useState ,useEffect } from 'react'
import notecontext from '../context/notes/noteContext'
import { useContext } from 'react'


export default function Formnote(props) {
  const [note,setNote] = useState({title:'',desciption:'',tag:''})
  const [unote,setUnote]=useState({utitle:'',udesciption:'',utag:''})
  let context =  useContext(notecontext);
  let {addnote,updatenote} =  context;



  const handleaddnotes=(e)=>{
    e.preventDefault()
    if(note.title && note.desciption){    
      addnote(note.title,note.desciption,note.tag);
      setNote({title:'',desciption:'',tag:''})
    }
    else{
      document.getElementById('noteermsg').innerHTML='* all field are required'
      setTimeout(()=>{
        document.getElementById('noteermsg').innerHTML=''
      },2000)      
    
    }
  }
  const handlecancle =()=>{    
    props.cancle('Add')
  }

  const handleupdate =(e)=>{    
    e.preventDefault()
    const id = props.noteobj.id
    updatenote(id,unote.utitle,unote.udesciption,unote.utag)
    setUnote({utitle:'',udesciption:'',utag:''})
  }

  const onChange=(e)=>{
    if(props.ntitle==='Add'){

      setNote({...note,[e.target.name]: e.target.value})
    }
    setUnote({...unote,[e.target.name]: e.target.value})
  }

  useEffect(() => { 
    
    setUnote({
      utitle: props.noteobj.title,
      udesciption: props.noteobj.des,
      utag: props.noteobj.tag,
    })
    
  }, [props.noteobj.title,props.noteobj.des,props.noteobj.tag])
  
  
  
  return (    
    <>
    
    <form id='addorupdateform' className=' flex flex-col justify-center gap-20 box-border relative' action="" method="post">
      <div className="relative">
        <input required className="peer z-10 w-full relative focus:rounded-md p-2 capitalize outline-none bg-transparent border-b-2 border-white focus:ring-2 focus:ring-offset-2 transition-all focus:shadow-lg" type="text" id="title" name={`${props.ntitle==='Add'?'title':'utitle'}`}   value={`${props.ntitle==='Add'?note.title:unote.utitle}`} onChange={onChange}/>
        <label className="absolute left-0 p-2 peer-focus:-translate-y-9 peer-focus:translate-x-6 text-slate-500 transition-all peer-focus:text-black uppercase peer-focus:tracking-wider peer-focus:font-semibold peer-valid:-translate-y-9 
        after:content-['*'] after:absolute after: after:text-red-700 after:ml-2
        ">Title</label>
        {/* <span className='uppercase text-red-600 hidden '>titile is empty</span> */}
      </div>
      <div className='relative'>
        <textarea required className='peer z-10 w-full relative focus:rounded-md p-2 capitalize outline-none bg-transparent border-b-2 border-white focus:ring-2 focus:ring-offset-2 transition-all focus:shadow-lg' name={`${props.ntitle==='Add'?'desciption':'udesciption'}`}   value={`${props.ntitle==='Add'?note.desciption:unote.udesciption}`} id="desciption" cols="30" rows="1" onChange={onChange}></textarea>
        <label className="absolute left-0 top-0 p-2 peer-focus:-translate-y-9 peer-focus:translate-x-6 text-slate-500 transition-all peer-focus:text-black uppercase peer-focus:tracking-wider peer-focus:font-semibold peer-valid:-translate-y-9 after:content-['*'] after:absolute after: after:text-red-700 after:ml-2">Description</label>
      </div>
      <div className='relative'>
        <input required className="peer z-10 w-full relative focus:rounded-md p-2 capitalize outline-none bg-transparent border-b-2 border-white focus:ring-2 focus:ring-offset-2 transition-all focus:shadow-lg" type="text" name={`${props.ntitle==='Add'?'tag':'utag'}`}   value={`${props.ntitle==='Add'?note.tag:unote.utag}`} id="tag" onChange={onChange}/>
        <label className="absolute left-0 p-2 peer-focus:-translate-y-9 peer-focus:translate-x-6 text-slate-500 transition-all peer-focus:text-black uppercase peer-focus:tracking-wider peer-focus:font-semibold peer-valid:-translate-y-9">Tag</label>
      </div>
      <button onClick={handleaddnotes} className={`${props.ntitle==='Add'?'':'hidden'} bg-red-400 w-fit text-white p-1 px-5 text-lg font-semibold rounded-md self-center hover:bg-red-500 hover:shadow-lg hover:-translate-y-1 hover:scale-100 transition-all disabled:bg-gray-300 disabled:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed`} type="submit">Add Note</button>

      <div disabled={unote.utitle==='' || unote.udesciption===''} className={`flex gap-2 justify-center ${props.ntitle!=='Add'?'':'hidden'}`}>
      <button onClick={handleupdate} className=' bg-red-400 w-fit text-white p-1 px-5 text-lg font-semibold rounded-md self-center hover:bg-red-500 hover:shadow-lg hover:-translate-y-1 hover:scale-100 transition-all disabled:bg-gray-300 disabled:translate-y-0 disabled:hover:shadow-none' type="submit">update Note</button>

      <button onClick={handlecancle} className='bg-red-400 w-fit text-white p-1 px-5 text-lg font-semibold rounded-md self-center hover:bg-red-500 hover:shadow-lg hover:-translate-y-1 hover:scale-100 transition-all' type="button">cancle</button>
      </div>
      <div id='noteermsg' className='absolute bottom-0 text-red-700 capitalize'></div>
    </form>
    </>
  )
}
