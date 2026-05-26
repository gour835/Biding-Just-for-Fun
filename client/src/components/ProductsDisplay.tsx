import { useNavigate } from "react-router-dom"

interface Product{
    _id: number,
    title: string,
    hasAuction: boolean
}
interface ProductsProp{
    products: Product[]
}
function ProductsDisplay({products}: ProductsProp) {
    const navigate = useNavigate();
  return (
    <>
        <div className="flex flex-row"> 
        <h1 className="w-full">Products Display</h1>
        <button 
        className="bg-green-300 w-auto h-fit p-2 mx-2 my-auto rounded text-black"
        onClick={()=>{
            navigate('/create/product')
        }}
        >
            Create
        </button>
        </div>
        <div>
            <table className="w-full border-2 border-amber-100 rounded">
                <tr className="border-2 border-dotted border-amber-100"> 
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
                {products.length===0? 
                <tr>
                    <td colSpan={3}>
                        No Products Found...
                    </td>
                </tr>: 
                products.map((product, index)=>{
                return(<tr className="border-2 border-dashed border-amber-100">
                    <td >
                        {index+1}
                    </td>
                    <td>
                        {product.title}
                    </td>
                    <td>

                        {product.hasAuction ? 
                         <button 
                        key={product._id}
                        className={`bg-yellow-400 p-1 m-2 rounded shadow-amber-50 shadow-xs text-black hover:shadow hover:scale-105 transition-all`}
                        onClick={()=>{
                            navigate(`/auction/${product._id}`);
                        }}
                        >
                            Visit Auction 
                        </button> : 
                         <button 
                        key={product._id}
                        className={`bg-green-400 p-1 m-2 rounded shadow-amber-50 shadow-xs text-black hover:shadow hover:scale-105 transition-all ${!product.hasAuction ? '-': "hidden"}`}
                        onClick={()=>{
                            navigate(`/create/product/${product._id}`);
                        }}
                        >
                            Create Auction 
                        </button>}
                        
                    </td>
                </tr>)            
                })}
            </table>
            
        </div>
    </>
  )
}

export default ProductsDisplay