import { useEffect, useState } from 'react'
import axios from 'axios'
const ProductAPI=()=>{

    const [products,setProducts]=useState([])

    const getProducts=async()=>{
        try{
            const res=await axios.get('http://localhost:5000/api/products')
            setProducts(res.data.data.products)
        // console.log(res.data.products)
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
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProductAPI = () => {
//     const [products, setProducts] = useState([]);

//     const getProducts = async () => {
//         try {
//             const res = await axios.get('http://localhost:5000/api/products');
//             setProducts(res.data.data.products);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         getProducts();
//     }, []);

//     return {
//         products: [products, setProducts]
//     };
// };

// export default ProductAPI;

