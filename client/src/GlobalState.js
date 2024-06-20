import { createContext } from "react";
import ProductAPI from "./api/ProductAPI";
import React from 'react';
export const GlobalState=createContext();

export  const DataProvider=({children})=>{
    ProductAPI()

    return(
        <GlobalState.Provider value={"Value is Global"}>
            {children}
        </GlobalState.Provider>
    )
}