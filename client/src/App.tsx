import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import './App.css'
import './main.css'
import Login from './pages/Login'
import ProtectedRoutes from './routes/ProtectedRoutes.tsx'
import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard.tsx'
import axios from 'axios'
import Register from './pages/Register.tsx'
import Logout from './pages/Logout.tsx'
import Create from './components/Create.tsx'
import ProductsAuctions from './pages/ProductsAuctions.tsx'

function App() {

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
  }, []);

  return (
    <>
      <RouterProvider router={
        createBrowserRouter(
          createRoutesFromElements(
            <>
              <Route path='/login' element={<Login setIsAuthenticated = {setIsAuthenticated} />} />
              <Route path='/register' element={<Register />} />
              <Route path='/logout' element={<Logout setIsAuthenticated= {setIsAuthenticated}/>} />

              <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} loading={loading} />}>
                <Route path='/' element={<Dashboard />} />
                <Route path=':action' element={<ProductsAuctions/>}/>
                <Route path=':action/:type' element={<Create/>}/>
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
