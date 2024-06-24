import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

const DetailProduct = () => {
    const params=useParams()
    const state=useContext(GlobalState)
    const [products]=state.ProductAPI.products
    const[detailProduct,setDetailProduct]=useState([])

    useEffect(()=>{
        if(params){
            products.forEach(product =>{
               if(product._id === params.id) 
                setDetailProduct(product)
            })
        }
    },[params,products])

    if(detailProduct.length === 0) return null;


    console.log(detailProduct)
  return (
    <div className='detail'>
        <img src={detailProduct.images.url} alt=''/>

    </div>
  )
}

export default DetailProduct

