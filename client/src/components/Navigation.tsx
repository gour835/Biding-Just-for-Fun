import { useNavigate } from "react-router-dom"

function Navigation() {
    const navigate = useNavigate();
  return (
    <nav className="w-full bg-amber-900 text-amber-100">
        <button 
        className="m-2 p-2 shadow-amber-50 shadow-xs"
        onClick={()=>{
            navigate('/products')
        }}
        >
            Products 
        </button>
        <button 
        className="m-2 p-2 shadow-amber-50 shadow-xs"
        onClick={()=>{
            navigate('/auctions')
        }}
        >
            Auctions
        </button>
    </nav>
  )
}

export default Navigation