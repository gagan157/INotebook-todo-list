import React from 'react'


export const msgOpen = (msg)=>{
    document.getElementById('msgnote').innerText = msg
    document.getElementById('msg').style.display = 'block';
    document.getElementById('msg').style.transform = 'translateX(0)';
    document.getElementById('msg').style.opacity = '1';
    setTimeout(() => {
        document.getElementById('msg').style.transform = 'translateX(300px)';
    }, 3500);
}

export default function Message(props) {
      
    return (
        <>
        <div id='msg' className='hidden z-50 translate-x-72 transition-all duration-[2s] fixed bottom-10 right-10 bg-gradient-to-tr bg-opacity-10 backdrop-blur-lg w-60 h-28 rounded-md border-0 border-opacity-20 border-slate-600 box-border p-2 shadow-lg'>
            <div className='flex items-center justify-center relative'>
                <h1 className='text-lg uppercase font-semibold text-white tracking-widest font-serif'>Message</h1>
                {/* <span className='cursor-pointer absolute right-2 top-1 text-lg text-white hover:scale-105'><ion-icon name="close-outline"></ion-icon></span> */}
            </div>
            <div className='w-full my-5 text-center'>
                <h1 id='msgnote' className='uppercase text-white'>add note successfully!</h1>
            </div>
        </div>
        </>
    )
}
