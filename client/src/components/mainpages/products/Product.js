import React,{useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductLists/ProductList';

const Product=()=>{
    const state=useContext(GlobalState)
    const [products]=state.ProductAPI.products;
    console.log(products)
    return(       
        <div className='products'>
            {
                products?.map((product,key) =>{
                    return <ProductList key={key} pr={product}/>
                })
            }
        
        </div>
    )
}

export default Product

// import React, { useContext } from 'react';
// import { GlobalState } from '../../../GlobalState';
// import ProductList from '../utils/ProductLists/ProductList';

// const Product = () => {
//     const state = useContext(GlobalState);

//     console.log('GlobalState:', state); // Log the whole state for debugging
    

//     if (!state || !state.productAPI) {
//         return <div>Loading...</div>; // Add a loading state or handle error
//     }

//     const [products] = state.productAPI.products;

//     return (
//         <div className='products'>
//             {products.map((product) => (
//                 <ProductList key={product.id} product={product} />
//             ))}
//         </div>
//     );
// };

// export default Product;
