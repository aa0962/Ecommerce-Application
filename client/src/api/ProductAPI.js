import { useEffect, useState } from 'react'
import axios from 'axios'
const ProductAPI=()=>{

    const [products,setProducts]=useState([])

    const getProducts=async()=>{
        try{
            const res=await axios.get('/api/products')
        console.log(res.data.products)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getProducts()
    },[])

    return{
        products:[products,setProducts]

    }
}

export default ProductAPI