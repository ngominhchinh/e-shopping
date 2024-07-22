import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/users/Home/Home';
import ListProduct from './pages/users/products/ListProduct';
import DetailProduct from './pages/users/products/DetailProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/users/Cart/Cart';
import Admin from './pages/admin/Admin';
import ListUsers from './pages/admin/users/ListUsers';
import ListCarts from './pages/admin/carts/ListCarts';
import Products from './pages/admin/products/Products';
import AddProduct from './pages/admin/products/AddProduct';
import EditProduct from './pages/admin/products/EditProduct';
import AdminProduct from './pages/admin/products/AdminProduct';

function App() {
  
  return (
    <>
        <Routes>
          <Route path='' element={<Login/>}></Route>
          <Route path='register' element={<Register/>}></Route>       
          <Route path='cart' element={<Cart/>}></Route>
          <Route path="products" element={<Home />}>
            <Route path="" element={<ListProduct />}></Route>
            <Route path='detail/:id' element={<DetailProduct/>}></Route>            
          </Route>
          <Route path='admin' element={<Admin></Admin>}>
            <Route path='users' element={<ListUsers></ListUsers>}></Route>
            <Route path='carts' element={<ListCarts></ListCarts>}></Route>
            <Route path='products' element={<AdminProduct></AdminProduct>}>
              <Route path='' element={<Products></Products>}></Route>
              <Route path='add'element={<AddProduct></AddProduct>}></Route>
              <Route path='edit/:id' element = {<EditProduct></EditProduct>}></Route>
            </Route>
          </Route>
            
        </Routes>
    </>
  );
}

export default App;
