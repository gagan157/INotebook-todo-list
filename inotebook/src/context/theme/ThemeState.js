import React, { useCallback, useState } from 'react'
import { createContext } from "react";



export const Themecontext = createContext()


function ThemeState(props) {
    const [isdark,setIsdark] = useState(false)

    const handledarktheme= useCallback(()=>{        
        localStorage.setItem('dark',!isdark)
        setIsdark(isdark=>!isdark)
    },[isdark])
  return (
    <Themecontext.Provider value={{handledarktheme,isdark}}>
        {props.children}
    </Themecontext.Provider>
  )
}

export default ThemeState