import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/signUp'
import Login from './pages/logIn'
import SellProduct from './pages/sellProduct'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/'        element={  <Home /> }></Route>
        <Route path="/sell" element={<SellProduct />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
