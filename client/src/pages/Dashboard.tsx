import axios from "axios";
import { useEffect, useState } from "react"

function Dashboard() {
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
  return (
    <div>
      <div className="flex flex-col justify-start items-start m-2">
        <h4 className=" text-blue-500">Active Auctions</h4>
        <ul>
          {auctions.length == 0 ? "no auction found": auctions.map((auction)=>{
            return <li className="auc" key={auction.userId}>
              {auction.title};
            </li>
          })}
        </ul>
      </div>
      <div className="flex flex-col justify-start items-start m-2">
        <h4 className=" text-blue-500">Products</h4>
        <ul>
          {products.length == 0 ? "No Products Found" : products.map((product)=>{
            return <li key={product._id}>
              {product.title}
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard