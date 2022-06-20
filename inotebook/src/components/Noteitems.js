import React from 'react'
import '../style/main.css'
import notecontext from '../context/notes/noteContext'
import { useContext } from 'react'


export default function Noteitems(props) {
    const handletoggleitem = (e) => {
        const id = e.target.parentElement.nextElementSibling.id
        document.getElementById(id).classList.toggle('toggle')
    }
    let context =  useContext(notecontext);
    let {deletenote} =  context;

    const handledelnote=(e)=>{
        const id = e.target.id
        deletenote(id)
    }

    const handleedit=(e)=>{
        const id = e.target.id;
        props.edit(id,'update')
        window.scrollTo(0,0)  
    }

    let { _id, title, description, tag, date } = props.noteitem
    let ndate = new Date(date).toDateString()
    let ntime = new Date(date).toLocaleTimeString()
    const darkthemelocal = localStorage.getItem('dark')
    return (
        <>
            <div className='scroll-smooth'>
                <div onClick={handletoggleitem} className={`closer-item ${darkthemelocal==='true'?'bg-zinc-800 hover:bg-zinc-700':'bg-white hover:bg-slate-100'}  rounded-t-md flex justify-between items-center gap-5 mb-0 cursor-pointer  hover:shadow-lg`}>
                    <button className='w-full px-2 h-12 flex justify-between items-center font-bold uppercase'>
                        {title}
                        <ion-icon name="chevron-down-outline"></ion-icon>
                    </button>
                </div>
                <div id={_id} className='w-full p-2 text-center overflow-hidden border mt-0 rounded-b-md max-h-0 opacity-0 transition-all duration-1000'>
                   
                    <h1 className='text-right text-sm font-semibold text-white'>{ndate} {ntime}</h1>
                    <h1 className='capitalize text-lg font-semibold '>{tag}</h1>
                    <p className='capitalize'>{description}</p>

                    <div className='flex items-center justify-center gap-5 mt-5'>
                        <button id={_id} onClick={handleedit} className='bg-red-400 w-fit text-white p-1 px-5 text-lg font-semibold rounded-md self-center hover:bg-red-500 hover:shadow-lg hover:-translate-y-1 hover:scale-100 transition-all'>Edit</button>

                        <button onClick={handledelnote} id={_id} className='bg-red-400 w-fit text-white p-1 px-5 text-lg font-semibold rounded-md self-center hover:bg-red-500 hover:shadow-lg hover:-translate-y-1 hover:scale-100 transition-all'>Delete</button>
                    </div>
                </div>
            </div>
           
           
        </>
    )
}
