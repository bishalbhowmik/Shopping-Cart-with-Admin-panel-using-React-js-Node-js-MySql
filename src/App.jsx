import React from 'react'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Profile from './Profile'
import Home from './Home'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import Start from './Start'
import EmployeeDetail from './EmployeeDetail'
import EmployeeLogin from './EmployeeLogin'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddProduct from './AddProduct'
import Products from './Products'
import EditProduct from './EditProduct'
import Shopping from './Shopping'
import AddAdmin from './AddAdmin'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          {/* <Route path='/' element={<Employee />}></Route>
        <Route path='/' element={<Products />}></Route> */}
          <Route path='/' element={<Home />}></Route>
          <Route path='/employee' element={<Employee />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/employeeEdit/:id' element={<EditEmployee />}></Route>
          <Route path='/addproduct' element={<AddProduct />}></Route>
          <Route path='/productlist' element={<Products />}></Route>
          <Route path='/productEdit/:id' element={<EditProduct />}></Route>

        </Route>
        <Route path='/create' element={<AddEmployee />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/start' element={<Start />}></Route>
        <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
        <Route path='/createadmin' element={<AddAdmin />}></Route>
        {/* <Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route> */}



        <Route path='shopping' element={<Shopping />}>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App