import { Link } from "react-router-dom";
import '../App.css';

function Nav({ user, handleLogout }) {
  console.log(user)
  return (
    <nav>
      <ul>
        <h3 className="text-purple">SweatSpectrum</h3>

      </ul>
      <ul>
  {user ? (
    <>
      <li><Link to="/">HOME</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/statspro">Stats Pro page</Link></li>
      <li><Link to="/analytics">Analytics Page</Link></li>
      <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
    </>
  ) : (
    <>
      <li><Link to="/">HOME</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/statspro">Stats Pro page</Link></li>
      <li><Link to="/analytics">Analytics Page</Link></li>
    </>
  )}
</ul>
    </nav>
  )
}

export default Nav;
