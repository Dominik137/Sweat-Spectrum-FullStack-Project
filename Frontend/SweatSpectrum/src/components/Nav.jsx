import {Link} from "react-router-dom";
import '../App.css';

function Nav() {
    return(
        <nav>
            <ul>
                <h3 className="text-purple">SweatSpectrum</h3>
                <img/>
            </ul>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/statspro">Stats Pro page</Link></li>
          <li><Link to="/analytics">Analytics Page</Link></li>
          <li><Link to="/new-workout">New Workout Form</Link></li>
        </ul>
      </nav>
    )
}

export default Nav