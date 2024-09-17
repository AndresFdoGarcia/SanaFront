import { useRoutes,BrowserRouter,Navigate } from 'react-router-dom'
import Home from '../Home'
import { store } from '../../store'
import { Provider } from 'react-redux'
import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'
import Cart from '../../Components/Cart'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'

const AppRoutes = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const isAuthenticated = user && user.custid;

    let routes = useRoutes([
        { path: '/', element: <Home/> },
        { path: '/cart',element: <Cart/>},
        { path: '/myorders', element: isAuthenticated ? <MyOrders /> : <Navigate to="/notfound" /> },
        { path: '/*', element: <NotFound/>}
    ])
    return routes
}

const App = () =>{
    return(
        <BrowserRouter>
        <Provider store={store}>        
            <Layout>
                <Navbar />             
                <AppRoutes/>                
            </Layout>
        </Provider>                
        </BrowserRouter>
    )        
}
export default App