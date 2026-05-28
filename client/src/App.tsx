import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import './App.css'
import './main.css'
import Login from './pages/Login'
import ProtectedRoutes from './routes/ProtectedRoutes.tsx'
import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard.tsx'
import axios, { type AxiosResponse } from 'axios'
import Register from './pages/Register.tsx'
import Logout from './pages/Logout.tsx'
import Create from './components/Create.tsx'
import ProductsAuctions from './pages/ProductsAuctions.tsx'
import Product from './pages/Product.tsx'

interface Products {
  _id: string,
  title: string,
  basePrice: string
}

interface Auctions {
  userId: string,
  productId: {
    title: string
  }
}

interface ProductsAPIResponse {
  products: Products[]
}

interface AuctionsAPIResponse {
  auctions: Auctions[]
}

function App() {

  const [products, setProducts] = useState<Products[]>([]);
  const [auctions, setAuctions] = useState<Auctions[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function Auth() {
      try {
        const user = await axios.get('http://localhost:8080/api/auth/token', {
          withCredentials: true
        });
        console.log(user);
        if (user.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    Auth();

    async function FetchData() {
      const [ProductsResponse, AuctionsResponse]:[
        AxiosResponse<ProductsAPIResponse>, AxiosResponse<AuctionsAPIResponse>
      ] = await Promise.all([
        axios.get<ProductsAPIResponse>('http://localhost:8080/api/user/products', {withCredentials: true}),
        axios.get<AuctionsAPIResponse>('http://localhost:8080/api/user/auctions', {withCredentials: true})
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
    <>
      <RouterProvider router={
        createBrowserRouter(
          createRoutesFromElements(
            <>
              <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path='/register' element={<Register />} />
              <Route path='/logout' element={<Logout setIsAuthenticated={setIsAuthenticated} />} />

              <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} loading={loading} />}>
                <Route path='/' element={<Dashboard products={products}  auctions={auctions} />} />
                <Route path=':action' element={<ProductsAuctions />} />
                <Route path ='/product/:id'  element={<Product products={products} />}/>
                <Route path=':action/:type' element={<Create products={products}  auctions={auctions} />} />
                <Route path=':action/:type/:id' element={<Create products={products}  auctions={auctions} />} />
              </Route>
            </>
          )
        )
      }
      />
    </>
  )
}

export default App
