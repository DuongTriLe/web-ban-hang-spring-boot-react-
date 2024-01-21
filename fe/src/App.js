
import './App.css';
import Product from './component/User/listProduct/Product';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './component/Admin/Main/Main';
import FormProduct from './component/Admin/Product/FormProduct';
import ListProduct from './component/Admin/Product/ListProduct';
import Home from './component/Admin/Home/Home';
import Category from './component/Admin/Category/Category';
import Color from './component/Admin/Color/Color';
import Size from './component/Admin/Size/Size';
import Order from './component/Admin/Order/Order';

import Index from './component/User/Index/Index';
import Detail from './component/User/DetailProduct/Detail';
import Cart from './component/User/Cart/Cart';
import Checkout from './component/User/Checkout/Checkout';
import Login from './component/User/Login/Login';
import HomePage from './component/User/HomePage/HomePage';
import TypeProduct from './component/Admin/TypeProduct/TypeProduct';
import Register from './component/User/Login/Register';


function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/admin" element={<Main />}>


            <Route path='category' element={<Category />} />
            <Route path='addProduct' element={<FormProduct />} />
            <Route path='listproduct' element={<ListProduct />} />
            <Route path="edit-product/:id" element={<FormProduct />} />
            <Route path='color' element={<Color />} />
            <Route path='size' element={<Size />} />
            <Route path='order' element={<Order />} />

            <Route path='typeproduct' element={<TypeProduct />} />
          </Route>

          <Route path="/" element={<Index />}>
            {/* <Route index element={<Product />} /> */}
            <Route index element={<HomePage />} />
            <Route path='/detail/:id' element={<Detail />} />

            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path="typeproduct/:id/:name" element={<Product />} />
        


          </Route>

          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
