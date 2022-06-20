import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import usercontext from '../context/users/userscontext'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const nav = useNavigate()
    const [singnup, setSignup] = useState({ firstname: '', lastname: '', email: '', password: '', Confirm_Password: '' })
    const [checkpass, setCheckpass] = useState('')
    const context = useContext(usercontext)
    const { usersignup, msg } = context
    const checkemail = () => {
        const rex = new RegExp(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)
        const email = singnup.email
        const emails = rex.test(email)
        if (!emails) {
            document.getElementById('msgemail').innerText = '* email not correct'
        }
        else {
            document.getElementById('msgemail').innerText = ''
        }
    }


    const checkpassword = () => {
        let pass = singnup.password
        let cpass = singnup.Confirm_Password
        if (pass === cpass) {
            if (pass.length <= 0 || cpass.length <= 0) {
                setCheckpass('')
            }
            else {
                setCheckpass(' password match')
                document.getElementById('checkpass').style.color = 'darkgreen'
            }
        }
        else if (cpass === "") {
            setCheckpass('')
        }
        else {
            setCheckpass(' password not match')
            document.getElementById('checkpass').style.color = 'red'

        }
    }

    const handleshowpass = (e) => {
        document.getElementById('eye-outline').style.display = 'none'
        document.getElementById('eye-off-outline').style.display = 'block'
        document.getElementById('password').setAttribute('type', 'text')
    }
    const handlehidepass = () => {
        document.getElementById('eye-outline').style.display = 'block'
        document.getElementById('eye-off-outline').style.display = 'none'
        document.getElementById('password').setAttribute('type', 'password')
    }

    const handlesingnup = (e) => {
        e.preventDefault()
        let name = singnup.firstname + " " + singnup.lastname
        if (singnup.firstname && singnup.email && singnup.password && singnup.Confirm_Password) {
            console.log('im in')
            if (singnup.password.length < 5) {
                console.log('password must be atleast 5 chracter')
                document.getElementById('allfield').style.display = 'block'
                document.getElementById('allfield').innerText = '* password must be atleast 5 chracter'
                
                setTimeout(() => {
                    document.getElementById('allfield').style.display = 'none'
                    document.getElementById('allfield').innerText = ''
                }, 2000);
            }
            else {

                usersignup(name, singnup.email, singnup.password)
                setSignup({ firstname: '', lastname: '', email: '', password: '', Confirm_Password: '' })
            }
        }
        else {
            document.getElementById('allfield').style.display = 'block'
            document.getElementById('allfield').innerText = '* All Feild are required'
            setTimeout(() => {
                document.getElementById('allfield').style.display = 'none'
                document.getElementById('allfield').innerText = ''
            }, 2000);
        }
    }
    const onchange = (e) => {
        setSignup({ ...singnup, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (localStorage.getItem('auttoken')) {
            nav('/home')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="w-full h-screen flex justify-center mt-16 absolute -top-16 bg-singnup-bg  bg-cover bg-center z-50
        before:content-[''] before:absolute before:bg-white before:w-full before:h-full before:bg-opacity-10
        before:filter before:backdrop-blur-lg   
        ">
            <form method='POST' className='relative lg:w-[40%] md:w-[60%] w-[80%] rounded-md bg-white bg-opacity-20 filter backdrop-blur-lg h-fit p-5 flex flex-col shadow-lg pt-10 gap-8 my-auto '>
                <div className='w-full text-center text-xl font-extrabold'>
                    <h1 className='text-white tracking-wider capitalize'>Singn up Form</h1>
                </div>
                <div className='absolute top-5 w-6 h-7 right-5 origin-center hover:rotate-180 p-0 m-0 transition-all'>
                    <Link to='/'>
                        <span className='text-2xl text-white p-0 m-0 items-center'>
                            <ion-icon name="close-outline"></ion-icon>
                        </span>
                    </Link>
                </div>
                <div className='w-full'>
                    <input required className='peer relative w-full p-2 bg-transparent border-b-2 outline-none placeholder:text-slate-500' name='firstname' id='firstname' type="text" value={singnup.firstname} onChange={onchange} />
                    <label className="p-2 absolute left-5 -z-10 w-full text-slate-500 peer-focus:-translate-y-6 peer-focus:opacity-100 peer-focus:text-black peer-focus:text-sm  peer-valid:-translate-y-6 transition-all peer-checked:opacity-100 after:content-['*'] after:absolute after: after:text-red-700 after:ml-2" >First Name</label>

                </div>
                <div className='w-full'>
                    <input required className='peer relative w-full p-2 bg-transparent border-b-2  outline-none' name='lastname' id='lastname' type="text" value={singnup.lastname} onChange={onchange} />
                    <label className='p-2 absolute left-5  -z-10 text-slate-500 opacity-1 peer-focus:-translate-y-6 peer-focus:opacity-100 peer-focus:text-black peer-focus:text-sm transition-all peer-valid:-translate-y-6'>Last Name</label>
                </div>
                <div className='w-full'>
                    <input required className='peer relative w-full p-2 bg-transparent border-b-2 outline-none' name='email' id='email' type="email" value={singnup.email} onChange={onchange} onKeyUp={checkemail} />
                    <label className="p-2 absolute left-5  -z-10 text-slate-500 opacity-1 peer-focus:-translate-y-6 peer-focus:opacity-100 peer-focus:text-black peer-focus:text-sm transition-all peer-valid:-translate-y-6 after:content-['*'] after:absolute after: after:text-red-700 after:ml-2">Email</label>
                    <span id='msgemail' className='text-xs font-extrabold capitalize text-red-700'></span>
                </div>
                <div className='w-full'>
                    <input required className='peer relative w-full p-2 bg-transparent border-b-2  outline-none' name='password' id='password' type="password" value={singnup.password} onChange={onchange} />
                    <label className="p-2 absolute left-5  -z-10 text-slate-500 opacity-1 peer-focus:-translate-y-6 peer-focus:opacity-100 peer-focus:text-black peer-focus:text-sm transition-all peer-valid:-translate-y-6 after:content-['*'] after:absolute after: after:text-red-700 after:ml-2">Password</label>
                    <span id='eye-outline' onClick={handleshowpass} className='text-white absolute block -translate-y-10 right-10 text-xl cursor-pointer'><ion-icon name="eye-outline"></ion-icon></span>
                    <span id='eye-off-outline' onClick={handlehidepass} className='text-white absolute -translate-y-10 right-10 text-xl cursor-pointer hidden'><ion-icon name="eye-off-outline"></ion-icon></span>
                </div>
                <div className='w-full'>
                    <input required className='peer relative w-full p-2 bg-transparent border-b-2  outline-none' name='Confirm_Password' id='Confirm_Password' type="password" value={singnup.Confirm_Password} onChange={onchange} onKeyUp={checkpassword} />
                    <label className="p-2 absolute left-5  -z-10 text-slate-500 opacity-1 peer-focus:-translate-y-6 peer-focus:opacity-100 peer-focus:text-black peer-focus:text-sm transition-all peer-valid:-translate-y-6 after:content-['*'] after:absolute after: after:text-red-700 after:ml-2">Confirm-Password</label>
                    <span id='checkpass' className="text-xs font-extrabold capitalize">{checkpass}</span>
                </div>
                <button
                    onClick={handlesingnup} type='submit' className='mt-5 ring-1 w-fit p-2 rounded-md ring-white self-center hover:ring-2 hover:-translate-y-1 transition-all uppercase text-lg text-white font-bold hover:shadow-lg disabled:cursor-not-allowed disabled:text-white/20 disabled:hover:ring-1 disabled:hover:translate-y-0 disabled:hover:shadow-none'>
                    Singn up
                </button>
            </form>
                <div className={`text-center ${msg.error ? 'text-red-600' : 'text-green-600'} absolute bottom-10`}>{msg.error}</div>
                <div id='allfield' className='text-red-700 absolute bottom-10 hidden'></div>
        </div>
    )
}
