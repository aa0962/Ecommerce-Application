import { createContext } from "react";
import ProductAPI from "./api/ProductAPI";
import { useState } from "react";
export const GlobalState=createContext();

export  const DataProvider=({children})=>{
    

    const[token,setToken]=useState(false)

    const state={
        token:[token,setToken],
        ProductAPI:ProductAPI()
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
