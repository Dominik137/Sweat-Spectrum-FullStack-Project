import {Link} from "react-router-dom";

function Nav() {
    return(
        <nav>
            <h3>SweatSpectrum</h3>
            <ul>
                <li> <Link to="/" > HOME </Link> </li>
                <li> <Link to="/dashboard">Dashboard </Link></li>
            </ul>
        </nav>

    )
}

export default Nav