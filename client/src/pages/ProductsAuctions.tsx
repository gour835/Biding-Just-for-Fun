import { useParams } from "react-router-dom"
import ProductsIndex from "../components/ProductsIndex.tsx";
import AuctionsIndex from "../components/AuctionsIndex.tsx";
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
           <ProductsIndex products={products}/>
        </>)
    }
    return (
        <>
            <AuctionsIndex auctions={auctions} />
        </>
    )
}

export default ProductsAuctions