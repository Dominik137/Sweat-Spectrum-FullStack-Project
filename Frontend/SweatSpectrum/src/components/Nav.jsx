import {Link} from "react-router-dom";

function Nav() {
    return(
        <nav>
            <h3>SweatSpectrum</h3>
            <ul>
                <li> <Link to="/" > HOME </Link> </li>
                <li> <Link to="/dashboard" >Dashboard </Link></li>
                <li> <Link to="/statspro" >Stats Pro page</Link> </li>
                <li> <Link to="/analytics">Analytics Page</Link></li>
            </ul>
        </nav>

    )
}

export default Nav