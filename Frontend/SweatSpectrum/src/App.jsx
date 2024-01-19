import { useState } from 'react'

import './App.css'
import Nav from './components/Nav';


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
  const [count, setCount] = useState(0)


  return (
    <div>
      
        <BrowserRouter>
        <Nav/>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/community" element ={<CommunityPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/about" element={<AboutMe/>} /> */}
        </Routes>
        <Footer />
        <ScrollToTop/>
      </BrowserRouter>









      
    </div>
  )
}

export default App
