import { useState } from 'react'

import './App.css'
import Nav from './components/Nav';
import Home from './components/Home';
import Dashboard from './components/dashboard';
import StatsPro from './components/StatsPro';
import Analytics from './components/Analytics';
import NewWorkoutForm from './components/NewWorkoutForm';
import ScrollToTop from './components/ScrollToTop';

import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Router,
  Link
} from "react-router-dom";



function App() {


  return (
    <div>
      
        <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />}/>  
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/statspro" element={<StatsPro />}/>
          <Route path="/analytics" element={<Analytics />}/>
          <Route path="/new-workout" element={<NewWorkoutForm />}/>
        </Routes>
        {/* <Footer /> */}
        {/* <ScrollToTop/> */}
      </BrowserRouter>
      
    </div>
  )
}

export default App
