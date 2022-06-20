import React from 'react'

export default function Footer() {
    return (
        <>

            <div className='w-full'>
                <div className='relative '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280">
                    <path fill="#f3f4f5" fillOpacity=".1" d="M0,128L60,154.7C120,181,240,235,360,240C480,245,600,203,720,202.7C840,203,960,245,1080,240C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
                <span className='absolute bottom-5 w-full text-center  text-sm tracking-wide'>
                    Copyright &#169; 2022 I-Notebook. All right reserved.
                </span>
                </div>
                
            </div>
            {/* <div className='w-full h-full'>

            </div> */}

        </>
    )
}
