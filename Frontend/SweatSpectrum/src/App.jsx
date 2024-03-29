import { useState , useEffect} from 'react'

import './App.css'
import Nav from './components/Nav';
import Home from './components/home'
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
import NewSetForm from './components/NewSetForm';
import EditWorkoutForm from './components/EditWorkoutForm';



function App() {

  const [user, setUser] = useState(null);
  // console.log(user)

  useEffect(() => {
    fetch('/api/session')
      .then(r => {
        if (r.ok) {
          return r.json();
        } else {
          return null;
        }
      })
      .then(data => {setUser(data)
      });
  }, []);

  function handleLogout() {
    fetch('/api/logout', {
      method: "DELETE"
    })
      .then(r => setUser(null));
  }

  const [userWorkouts, setUserWorkouts] = useState([])

  useEffect(() => {
    if (user) {
      fetch(`/api/users/${user.id}/workouts`)
        .then(r => r.json())
        .then(data => setUserWorkouts(data))
    }
  }, [user]);



  return (
    <div>
      
        <BrowserRouter>
        <Nav handleLogout={handleLogout} user={user}/>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser}/>}/>  
          <Route path="/dashboard" element={<Dashboard user={user}/>}/>
          <Route path="/statspro" element={<StatsPro user={user} userWorkouts={userWorkouts} />}/>
          <Route path="/analytics" element={<Analytics />}/>
          <Route path="/new-workout" element={<NewWorkoutForm user={user}/>}/>
          <Route path="/new-set" element={<NewSetForm user={user} />}/>
          <Route path="/edit-workout/:id" element={<EditWorkoutForm user={user} />} />
        </Routes>
        {/* <Footer /> */}
        {/* <ScrollToTop/> */}
      </BrowserRouter>
      
    </div>
  )
}

export default App
