import React from "react"
import { Link } from 'react-router-dom';
import './NavBar.css';

// ce composant fonctionnel ne fait que nous montrer les noms des pages
// l'hyperlien de type Link permet de les afficher sans reloader la page
function NavBar() {
    return (
        <nav className="nav-bar">
            <ul>
                <li><Link to="/">Random</Link></li>
                <li><Link to="/categorie">Categorie</Link></li>
                <li><Link to="/extra">Extra</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;