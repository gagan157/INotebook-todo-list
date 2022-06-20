import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/main.css'



export default function Main() {
  const nav = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('auttoken')) {
      nav('/home')
    }
  })


  return (
    <>

      

      <div className='flex flex-col w-10/12 mx-auto my-auto md:flex-row md:gap-5 mt-10'>
      
          <div className='fixed -left-20 -top-5'><img className='w-64' src={process.env.PUBLIC_URL + "/ban3.png"} alt="" /></div>
          <div className='shadow-lg bg-slate-200 w-full p-4 pb-5 rounded-md flex flex-col gap-10 bg-opacity-10 filter backdrop-blur-xl justify-around items-center text-justify text-white'>
            <h1 className='font-semibold text-2xl capitalize'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, at fuga explicabo magni ex, excepturi iste dolorum, animi debitis maiores molestias error quod earum et tempora ad fugiat. Corrupti, eaque?
            </h1>
            
            <button type='button' className='capitalize text-lg border w-fit px-3 rounded-md self-center hover:border-2 cursor-pointer transition-all hover:-translate-y-1'>show more</button>
          </div>
   
        <div className='aspect-w-2 aspect-h-1 sm:aspect-w-3 sm:aspect-h-2 md:w-2/3 md:aspect-h-1'>
          <img className='object-cover rounded-md shadow-lg' src="https://cdn.pixabay.com/photo/2017/12/22/08/01/school-supplies-3033204__340.jpg" alt="" />
        </div>
        
      </div>

    </>
  )
}
