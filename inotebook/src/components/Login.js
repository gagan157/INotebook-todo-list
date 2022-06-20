import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import usercontext from '../context/users/userscontext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const context = useContext(usercontext)
    const nav = useNavigate()
    const { loginuser, msg } = context

    const [login, setLogin] = useState({ email: '', password: '' })


    const onchange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const handlelogin = (e) => {
        e.preventDefault()
        if(login.email && login.password){           
            loginuser(login.email, login.password)
            setLogin({ email: '', password: '' })
        }
        else{
            document.getElementById('emtyinpmsg').style.display = 'block'
            document.getElementById('emtyinpmsg').innerText='* all filed are required'
            setTimeout(() => {
                document.getElementById('emtyinpmsg').style.display = 'none'
                document.getElementById('emtyinpmsg').innerText=''
                
            }, 2000);
            
        }
        
    }
    useEffect(() => {
        if(localStorage.getItem('auttoken')){
            nav('/home')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <div className="w-full h-screen flex justify-center mt-16 absolute -top-16 z-50 bg-login-bg filter
        backdrop-blur-lg bg-cover bg-center
        before:content-[''] before:absolute before:bg-white before:w-full before:h-full before:bg-opacity-10
        before:filter before:backdrop-blur-lg
        "> 
            <form method='POST' className='relative rounded-md bg-white bg-opacity-20 filter backdrop-blur-lg h-fit p-5 flex flex-col shadow-lg pt-10 gap-8 mt-32 mx-3 sm:mx-0'>
                <div className='w-full text-center text-xl font-extrabold'>
                    <h1 className='text-white tracking-wider capitalize'>Login Form</h1>
                </div>
                <div className='absolute top-5 right-5 w-6 h-7 origin-center hover:rotate-180 transition-all'>
                    <Link to='/'>
                        <span className='text-2xl text-white '>
                            <ion-icon name="close-outline"></ion-icon>
                        </span>
                    </Link>
                </div>

                <div className='w-full'>
                    <input required className='peer relative w-full p-2 bg-transparent border-b-2 outline-none' type="email" name='email' autoComplete='username' id='email' onChange={onchange} value={login.email} />
                    <label className="p-2 absolute left-5  -z-10 text-slate-600 opacity-1 peer-focus:-translate-y-6 peer-focus:opacity-100 peer-focus:text-black peer-focus:text-sm transition-all peer-valid:-translate-y-6 peer-valid:text-black after:content-['*'] after:absolute after: after:text-red-700 after:ml-2">Email</label>
                    <span className={`text-red-700 capitalize opacity-0 ${login.email.length !== 0 ? 'peer-invalid:opacity-100' : ''}`} >email not correct</span>
                </div>
                <div className='w-full'>
                    <input required className='peer relative w-full p-2 bg-transparent border-b-2  outline-none' autoComplete='current-password' type="password" name='password' id='password' onChange={onchange} value={login.password} />
                    <label className="p-2 absolute left-5  -z-10 text-slate-600 opacity-1 peer-focus:-translate-y-6 peer-focus:opacity-100 peer-focus:text-black peer-focus:text-sm transition-all peer-valid:-translate-y-6 peer-valid:text-black after:content-['*'] after:absolute after: after:text-red-700 after:ml-2">Password</label>
                </div>
                   <ul className='flex justify-between capitalize text-slate-200 underline px-3'>
                       <li className='cursor-pointer hover:text-white hover:decoration-white hover:scale-105'>forgot password?</li>
                       <li className='cursor-pointer hover:text-white hover:decoration-white hover:scale-105'> <Link to='/signup'>create new account</Link></li>
                   </ul>
                <button onClick={handlelogin} type='submit' className=' ring-1 w-fit p-2 rounded-md ring-white self-center hover:ring-2 hover:-translate-y-1 transition-all uppercase text-lg text-white font-bold hover:shadow-lg
                disabled:hover:translate-y-0 disabled:hover:ring-1 disabled:hover:shadow-none
                disabled:cursor-not-allowed
                '>login</button>            
                <div>
                    <h1 className={`text-center text-sm capitalize font-semibold text-green-500`}>
                        {msg.sucess}</h1>
                    <h1 className={` text-center text-sm capitalize font-semibold text-red-500`}>
                        {msg.error}</h1>
                </div>
                <h1 id='emtyinpmsg' className='absolute -bottom-10 text-red-600 font-extrabold hidden text-sm capitalize'>*</h1>
            </form>

        </div>
    )
}
