import { useLocation, useNavigate } from "react-router-dom"

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <nav className="w-full bg-amber-900 text-amber-100">
        <button 
        className={`m-2 p-2 shadow-amber-50 shadow-xs ${location.pathname === '/' ? "bg-amber-100 text-black": ""}`}
        onClick={()=>{
            navigate('/')
        }}
        >
            Dashboard 
        </button>
        <button 
        className={`m-2 p-2 shadow-amber-50 shadow-xs ${location.pathname === '/products' ? "bg-amber-100 text-black": ""}`}
        onClick={()=>{
            navigate('/products')
        }}
        >
            Products 
        </button>
        <button 
        className={`m-2 p-2 shadow-amber-50 shadow-xs ${location.pathname === '/auctions' ? "bg-amber-100 text-black": ""}`}
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