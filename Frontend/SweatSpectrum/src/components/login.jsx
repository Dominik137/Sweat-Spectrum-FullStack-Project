import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard";

function LogIn({user, setUser}) {
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState('');
  const [logInStatus, setLoginStatus] = useState('')
  const [usernameStatus, setUsernameStatus] = useState('')
 

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (loginUsername !== "") {
      fetch('/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword
        })
      })
        .then(r => {
          if (r.ok) {
            return r.json();
            
          } else {setLoginStatus('Username or password was incorrect')
             
          }
        })
        .then(data => setUser(data))
    // Clear form inputs after submission
    setLoginUsername("");
    setLoginPassword("");
    setLoginStatus("");
    
    }
  }
  
  function handleCreateUser(e){
    e.preventDefault()
    console.log("Submitting user creation:", createUsername, createPassword);
    fetch('/api/create_user', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: createUsername,
        password: createPassword
      })
    })
      .then(r => {
        if (r.ok) {
          return r.json();
        } else {
          setUsernameStatus('Invalid username or password');
        }
      })
      .then(data => setUser(data));
      // Clear form inputs after submission
      setCreateUsername("");
      setCreatePassword("");
      setUsernameStatus('')
  }

  

function handleLogout(id){
  fetch('/api/logout', {
  method: "DELETE"})
.then(r=>setUser(null))
}
// makes delete call to route logout which will perfrom the delete of user from session on backend 
// then it will setUser to null on the front end


  return (
    <>
      <div className="grid">
      {user ?
        <>
          <h2>Welcome, {user.username}!</h2>
          <button role="button" class="contrast" onClick={handleLogout}>Logout</button>
        </>
        :
        <>
        <div>
          <article className="test">
              <h1>
                Create Account
              </h1>
              <p>Enter a new username and password to create your account.</p>
              <form onSubmit={handleCreateUser}>
              <input
                type="text"
                placeholder="Create Username"
                value={createUsername}
                onChange={(e) => setCreateUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Create Password"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
              />
              <button role="button" class="contrast" type="submit" className="btn-green">Create User</button>
              <h3>{usernameStatus}</h3>
            </form>
          </article>
          <div className = "test">
          <h1>
                Log In
              </h1>
              <p>Already have an account? Fill in your details below to log in. </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
           <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button role="button" class="contrast" type="submit">Login</button>
          <h3>{logInStatus}</h3>
        </form>
        </div>
        </div>
        </>
      }
      </div>
    </>
  );
}

export default LogIn;
