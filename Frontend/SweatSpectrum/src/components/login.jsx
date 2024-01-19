import { useState } from "react";

function LogIn() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPasswrod] = useState('')

  function handleSubmit(e) {
    e.preventDefault();

    // Check if username is not empty before making the API call
    if (username !== "") {
      fetch('/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: username
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

  return (
    <>
      {user ?
        <>
          <h2>Welcome, {user.user_name}!</h2>
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
