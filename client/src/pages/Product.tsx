import { Navigate, useNavigate, useParams } from "react-router-dom"

interface products {
    _id: string,
    title: string,
    description: string,
    basePrice: string,
    hasAuction: boolean,
    userId: {
        _id: string,
        name: string
    }
}
interface ProductsProp {
    products: products[]
}
function Product({ products }: ProductsProp) {
    const { id } = useParams()
    const navigate = useNavigate();
    const product = products.find((product) => product._id === id);
    return (
        <>
            <h1>
                {product ? product.title : 'product not found'}

            </h1>
            {product ? 
            <div className="flex gap-2 flex-col w-full h-full">
                <span className="group flex flex-row">
                    <div className="w-[50%] h-8 border-2 font-bold text-amber-100 border-amber-100 border-dotted  transition-all group-hover:border-blue-300 shadow-amber-500 group-hover:shadow ">
                        Title
                    </div>
                    <div className="w-[50%] h-8 border-2 text-amber-100 border-amber-50 border-dotted transition-all group-hover:border-red-300 group-hover:shadow-amber-50 shadow-blue-100 group-hover:shadow">
                        {product.title}
                    </div>
                </span>
                
                <span className="group flex flex-row">
                    <div className="w-[50%] h-8 border-2 font-bold text-amber-100 border-amber-100 border-dotted  transition-all group-hover:border-blue-300 shadow-amber-500 group-hover:shadow ">
                        Description
                    </div>
                    <div className="w-[50%] h-8 border-2 text-amber-100 border-amber-50 border-dotted transition-all group-hover:border-red-300 group-hover:shadow-amber-50 shadow-blue-100 group-hover:shadow">
                        {product.description}
                    </div>
                </span>
                
                <span className="group flex flex-row">
                    <div className="w-[50%] h-8 border-2 font-bold text-amber-100 border-amber-100 border-dotted  transition-all group-hover:border-blue-300 shadow-amber-500 group-hover:shadow ">
                        Base Price
                    </div>
                    <div className="w-[50%] h-8 border-2 text-amber-100 border-amber-50 border-dotted transition-all group-hover:border-red-300 group-hover:shadow-amber-50 shadow-blue-100 group-hover:shadow">
                        {product.basePrice}
                    </div>
                </span>
                <span className="group flex flex-row">
                    <div className="w-[50%] h-8 border-2 font-bold text-amber-100 border-amber-100 border-dotted  transition-all group-hover:border-blue-300 shadow-amber-500 group-hover:shadow ">
                        Created By
                    </div>
                    <div className="w-[50%] h-8 border-2 text-amber-100 border-amber-50 border-dotted transition-all group-hover:border-red-300 group-hover:shadow-amber-50 shadow-blue-100 group-hover:shadow">
                        { product? product.userId ? product.userId.name :'User name is not given ':'Not found' }
                    </div>
                </span>
                
                <span className={`group flex flex-row ${product.hasAuction? '': 'hidden'}`}>
                    <div className="w-[50%] h-12 border-2 font-bold text-amber-100 border-amber-100 border-dotted  transition-all group-hover:border-blue-300 shadow-amber-500 group-hover:shadow ">
                        Auction
                    </div>
                    <div className="w-[50%] h-12 border-2 text-amber-100 border-amber-50 border-dotted transition-all group-hover:border-red-300 group-hover:shadow-amber-50 shadow-blue-100 group-hover:shadow">
                        <button 
                        key={product._id}
                        className={`bg-yellow-400 p-1 m-2 rounded shadow-amber-50 shadow-xs text-black hover:shadow hover:scale-105 transition-all`}
                        onClick={()=>{
                            navigate(`/auction/${product._id}`);
                        }}
                        >
                            Visit Auction 
                        </button>
                    </div>
                </span>
                
            </div>: ''}

            
        </>
    )
}

export default Product