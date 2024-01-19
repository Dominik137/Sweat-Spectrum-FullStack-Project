import { useState } from 'react'

import './App.css'
import Nav from './components/Nav';
import Home from './components/Home';
import Dashboard from './components/dashboard';

import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Router,
  Link
} from "react-router-dom";

//NOTE: Will need this import for auto scrolling to top of page when clicking through routes
// import ScrollToTop from './components/ScrollToTop';

function App() {


  return (
    <div>
      
        <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />}/>  
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
        {/* <Footer /> */}
        {/* <ScrollToTop/> */}
      </BrowserRouter>
      
    </div>
  )
}

export default App
