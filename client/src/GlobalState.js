import { createContext, useEffect } from "react";
import ProductAPI from "./api/ProductAPI";
import { useState } from "react";
import axios from "axios";
import UserAPI from "./api/UserAPI";
export const GlobalState=createContext();

export  const DataProvider=({children})=>{
    

    const[token,setToken]=useState(false)

    const refreshToken=async()=>{
        const res=await axios.get('/user/refresh_token')

        setToken(res.data.accesstoken)

    }

    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    },[])

    const state={
        token:[token,setToken],
        ProductAPI:ProductAPI(),
        UserAPI:UserAPI(token)
    }

    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
// import React, { createContext, useState } from 'react';
// import ProductAPI from './api/ProductAPI';

// export const GlobalState = createContext();

// export const DataProvider = ({ children }) => {
//     const [token, setToken] = useState(false);
//     const productAPI = ProductAPI(); // Initialize ProductAPI here

//     const state = {
//         token: [token, setToken],
//         productAPI
//     };

//     return (
//         <GlobalState.Provider value={state}>
//             {children}
//         </GlobalState.Provider>
//     );
// };
