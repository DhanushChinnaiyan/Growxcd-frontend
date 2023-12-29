import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import SingleProduct from './Components/Products/SingleProduct';
import CartComponent from './Components/Cart/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/singleproduct/:productId' element={<SingleProduct/>}/>
        <Route path='/carts' element={<CartComponent/>}/>
      </Routes>
    </div>
  );
}

export default App;
