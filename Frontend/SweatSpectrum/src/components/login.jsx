import { useState, useEffect } from "react";
import Dashboard from "./dashboard";

function LogIn({ user, setUser }) {
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
          } else {
            setLoginStatus('Username or password was incorrect');
          }
        })
        .then(data => setUser(data))
      // Clear form inputs after submission
      setLoginUsername("");
      setLoginPassword("");
      setLoginStatus("");
    }
  }

  function handleCreateUser(e) {
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

  function handleLogout() {
    fetch('/api/logout', {
      method: "DELETE"
    })
      .then(r => setUser(null));
  }

  return (
    <>
      <div className="grid">
        {user ?
          <>
            <h2>Welcome, {user.username}!</h2>
          </>
          :
          <>
            <div>
              <h1>Create User!</h1>
              <form onSubmit={handleCreateUser}>
                <input
                  type="text"
                  value={createUsername}
                  onChange={(e) => setCreateUsername(e.target.value)}
                />
                <input
                  type="password"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                />
                <button role="button" className="contrast" type="submit" className="btn-green">Create User</button>
                <h3>{usernameStatus}</h3>
              </form>
            </div>
            <div>
              <h1>Log In!</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button role="button" className="contrast" type="submit">Login</button>
                <h3>{logInStatus}</h3>
              </form>
            </div>
          </>
        }
      </div>
      {user && (
        <div className="navbar">
          <button role="button" className="contrast" style={{ width: '20%' }} onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
}

export default LogIn;
