import { useParams } from "react-router-dom"
import ProductsDisplay from "../components/ProductsDisplay.tsx";
import AuctionsDisplay from "../components/AuctionsDisplay.tsx";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductsAuctions() {
    const { action } = useParams();
    const [products, setProducts] = useState([]);
  const [auctions, setAuctions] = useState([]);
  useEffect(()=>{
    async function FetchData() {
      const [ProductsResponse, AuctionsResponse] = await Promise.all([
        axios.get('http://localhost:8080/api/user/products', {withCredentials: true}),
        axios.get('http://localhost:8080/api/user/auctions', {withCredentials: true})
      ]);
      if(ProductsResponse.status === 200){
        setProducts(ProductsResponse.data.products);
      }
      if(AuctionsResponse.status === 200){
        setAuctions(AuctionsResponse.data.auctions);
      }
    }
    FetchData()
  }, []);

    if (action === 'products') {
        return (<>
           <ProductsDisplay products={products}/>
        </>)
    }
    return (
        <>
            <AuctionsDisplay auctions={auctions} />
        </>
    )
}

export default ProductsAuctions