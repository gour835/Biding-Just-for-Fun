import { useEffect } from "react"

interface products{
  _id: string,
  title: string
}
interface auctions{
  userId: string,
  productId:{
    title: string
  }
}
interface DashboardProps{
  products: products[],
  auctions: auctions[]
  
}

function Dashboard({products, auctions}: DashboardProps) {
 
  useEffect(()=>{
    
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-start items-start m-2">
        <h4 className=" text-blue-500">Active Auctions</h4>
        <ul>
          {auctions.length == 0 ? "no auction found": auctions.map((auction)=>{
            return <li className="auc" key={auction.userId}>
              {auction.productId.title}
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