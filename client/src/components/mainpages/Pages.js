import React from 'react';
import Login from './login/Login';
import Cart from './cart/Cart';
import Register from './login/Register'
import { Route,Routes } from 'react-router-dom';
import Product from './products/Product';
import DetailProduct from './utils/DetailProducts/DetailProduct';


const Pages=()=>{
    return(
        <Routes>
            <Route path='/' element={<Product/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/detail/:id' element={<DetailProduct/>}/>

        </Routes>
    )
}
export default Pages