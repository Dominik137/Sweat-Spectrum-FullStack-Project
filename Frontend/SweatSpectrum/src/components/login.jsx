import { useState, useEffect } from "react";

function LogIn() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPasswrod] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    if (username !== "") {
      fetch('/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: username,
          password: password
        })
      })
        .then(r => {
          if (r.ok) {
            return r.json();
          } else {
            return null;
          }
        })
        .then(data => setUser(data));
    }
  }

  useEffect(() => {
    fetch('/api/session')
      .then(r => {
        if (r.ok) {
          return r.json();
        } else {
          return null;
        }
      })
      .then(data => setUser(data));
  }, []);

function handleLogout(id){
  fetch('/api/logout', {
  method: "DELETE"})
.then(r=>setUser(null))
}
// makes delete call to route logout which will perfrom the delete of user from session on backend 
// then it will setUser to null on the front end



  return (
    <>
      {user ?
        <>
          <h2>Welcome, {user.user_name}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
        :
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
           <input
            type="text"
            value={password}
            onChange={(e) => setPasswrod(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      }
    </>
  );
}

export default LogIn;
