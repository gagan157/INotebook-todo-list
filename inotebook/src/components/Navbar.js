import React, { useEffect, useState, memo, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../style/Navbar.css'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import usercontext from '../context/users/userscontext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faGear, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { Themecontext } from '../context/theme/ThemeState'



function Navbar(props) {
    const context = useContext(usercontext)
    const theme = useContext(Themecontext)
    const divouterside = useRef()

    const { isdark, handledarktheme } = theme
    const [uprofile, setUprofile] = useState(false)
    const { getuserdetail, userdtl } = context || ''
    const [onelettername,setOnelettername] = useState('')



    const location = useLocation()
    const nav = useNavigate()
    const handlelogout = () => {
        handledarktheme()
        localStorage.removeItem('dark')
        localStorage.removeItem('auttoken')
        nav('/')
    }



    const handletoggleprofile = () => {
        // setUprofile(uprofile => !uprofile)
        setUprofile(uprofile ? false : true)
    }
    const handletogglecloseprofile = (e) => {
        if (!divouterside.current.contains(e.target)) {
            setUprofile(false)

        }
    }

    const handletoggle = () => {
        document.getElementById('sidnav').style.transform = 'translateX(0%)';
    }
    const handlecross = () => {
        document.getElementById('sidnav').style.transform = 'translateX(-100%)';
    }
    useEffect(() => {
        if (localStorage.getItem('auttoken')) {
            getuserdetail()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])


    

    useEffect(() => {
        document.addEventListener("mousedown", handletogglecloseprofile);
        return () => document.removeEventListener("mousedown", handletogglecloseprofile);
    })
    useEffect(()=>{
        if(userdtl.name){            
           const oneleetre = userdtl.name.slice(0,1)
           setOnelettername(oneleetre)
        }
        return ()=>{
            setOnelettername('')
        }
    },[userdtl])
    const darkthemelocal = localStorage.getItem('dark')
    return (<>

        <div className="sticky top-0 z-50 flex justify-between items-center py-5 text-white bg-transparent md:mx-10 scroll">
            <div className='ml-10 text-2xl w-full font-extrabold tracking-widest uppercase'>i-notebook</div>
            <div id='sidnav' className='sidnav transition-all md:w-full absolute bg-white text-black top-0 h-screen w-full p-5 md:bg-transparent bg-opacity-30 backdrop-blur-xl md:h-fit md:relative md:bg-opacity-100 md:backdrop-blur-none -translate-x-full md:translate-x-0 z-10'>
                <div className='md:hidden text-3xl  text-white flex justify-between items-center'>
                    <h1 className='tracking-widest font-semibold'>I-Notebook</h1>
                    <span onClick={handlecross} className=''><ion-icon name="close-outline"></ion-icon></span>
                </div>
                <div className='md:mx-10 md:w-full md:bg-transparent md:relative  md:flex text-white md:h-fit  md:justify-end md:gap-6 md:items-center'>
                    <ul className='md:flex md:flex-row md:gap-10 md:capitalize md:justify-end items-center md:font-semibold md:tracking-wide md:flex-wrap flex flex-col gap-10 py-11 justify-center uppercase md:border-0  md:text-base md:py-0 md:mr-3 text-3xl'>

                        {localStorage.getItem('auttoken') ?
                            <li className={`${location.pathname === "/home" ? "md:active" : ""} md:transition-all md:shadow-md md:ring-0 md:ring-offset-1 md:hover:shadow-xl md:hover:shadow-pink-400 md:hover:ring-1 md:hover:-translate-y-1 md:ring-white md:px-2 md:rounded-sm md:p-1 md:w-fit md:border-0 px-1 border-l-8  border-purple-300 w-full md:tracking-normal tracking-widest  text-center rounded-r-md`}><Link to="/home">home</Link></li> : ""}

                        <li className={`${location.pathname === "/about" ? "md:active" : ""} md:transition-all md:shadow-md  md:ring-0 md:ring-offset-1 md:hover:shadow-xl md:hover:shadow-pink-400 md:hover:ring-1 md:hover:-translate-y-1 md:ring-white md:px-2 md:rounded-sm md:p-1 md:w-fit md:border-0 px-1 border-l-8  border-purple-300 w-full md:tracking-normal tracking-widest  text-center rounded-r-md`}><Link to="/about">about</Link></li>

                        {!localStorage.getItem('auttoken') ?
                            <>
                                <li className='md:transition-all md:shadow-md md:ring-0 md:ring-offset-1 md:hover:shadow-xl md:hover:shadow-pink-400 md:hover:ring-1 md:hover:-translate-y-1 md:ring-white md:px-2 md:rounded-sm md:p-1 border-l-8  border-purple-300 w-full md:tracking-normal tracking-widest  text-center rounded-r-md md:w-fit md:border-0'><Link to="signup/">signup</Link></li>

                                <li className='md:transition-all md:shadow-md md:ring-0 md:ring-offset-1 md:hover:shadow-xl md:hover:shadow-pink-400 md:hover:ring-1 md:hover:-translate-y-1 md:ring-white md:px-2 md:rounded-sm md:p-1 border-l-8  border-purple-300 w-full md:tracking-normal tracking-widest  text-center rounded-r-md md:w-fit md:border-0'><Link to="/login">login</Link></li>
                            </>
                            : ''
                        }
                    </ul>
                    {localStorage.getItem('auttoken') && <div className='md:flex md:justify-center md:items-center md:gap-3'>
                        <div className='md:w-[2.7rem] md:relative md:cursor-pointer md:hover:shadow-lg md:rounded-full group md:mr-10 '>
                            <div ref={divouterside} onClick={() => handletoggleprofile()}
                                className='w-full h-10 flex justify-center items-center bg-pink-400 rounded-full'>
                                <h1 className='flex-none text-3xl font-bold font-serif'>{onelettername}</h1>
                            </div>

                            <div className={`md:flex md:flex-col md:overflow-hidden md:absolute md:bg-stone-800 md:-left-32 md:top-12 md:rounded-md md:opacity-0 md:invisible md:group-hover:visible md:group-hover:opacity-100 md:transition-all md:w-52 p-1 md:cursor-text ${uprofile ? 'md:group-hover:opacity-0' : ''}`}>
                                <hr className='md:invisible visible' />
                                <div className='flex flex-col my-0 px-1'>
                                    <h1 className='capitalize text-white'>i-notebook account</h1>
                                    <h1 className='capitalize text-white/70'>{userdtl.name}</h1>
                                    <h1 className='text-white/70'>{userdtl.email}</h1>
                                </div>
                            </div>
                            <div  className={`md:absolute md:max-w-xs md:right-0 md:top-12 md:bg-stone-800 overflow-hidden md:overflow-hidden md:w-96 md:rounded-md md:pt-10 md:pb-5 md:text-center cursor-default transition-all ${uprofile ? 'opacity-100 visible' : 'invisible opacity-0'}`}>
                                <div className='absolute top-4 right-5 cursor-pointer transition-all duration-700 flex flex-row justify-center items-center gap-5'>
                                    <FontAwesomeIcon onClick={handledarktheme} className={`shadow-lg  ${isdark || darkthemelocal === 'true' ? 'text-yellow-400 shadow-yellow-400' : 'shadow-white text-white'}`} icon={faLightbulb} />
                                    <FontAwesomeIcon className='transition-all duration-700 hover:rotate-180 origin-center' icon={faGear} />
                                </div>
                                <div className='flex flex-col justify-center items-center w-full h-full gap-3 '>
                                    <div className='w-20 h-20 flex justify-center items-center bg-pink-400 rounded-full relative'>
                                        <h1 className='flex-none text-5xl font-bold font-serif'>{onelettername}</h1>
                                        <div className='absolute w-7 h-7 bg-zinc-900 rounded-full bottom-0 right-0 cursor-pointer'>
                                            <FontAwesomeIcon className='hover:text-blue-400' icon={faCamera} />
                                        </div>
                                    </div>
                                    <div className='details text-center'>
                                        <h1 className='cursor-text'>{userdtl.name}</h1>
                                        <h1 className='cursor-text'>{userdtl.email}</h1>
                                    </div>
                                </div>
                                <hr className='my-5' />
                                <button onClick={handlelogout} className='w-fit md:border md:p-1 md:px-6 capitalize rounded-md hover:bg-zinc-800'>Sign out</button>
                                <hr className='my-5' />

                                <ul className='flex justify-center items-center gap-3 text-sm'>
                                    <li>Privacy Policy</li>
                                    <li>Terms of Service</li>
                                </ul>

                            </div>
                        </div>
                    </div>}
                </div></div>
            <span onClick={handletoggle} className='mr-10 text-2xl flex justify-center items-center border-2 p-1 shadow-lg cursor-pointer rounded-md md:hidden sm:visible'><ion-icon name="menu-outline"></ion-icon></span>
        </div>

    </>
    )
}

export default memo(Navbar);