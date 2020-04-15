import React from 'react';
import { Link } from 'react-router-dom';

const About = () => (
    <nav>
        <div className="nav-wrapper">
            <Link to={'/'} className="brand-logo">Quetzi</Link>
            <ul className="right hide-on-med-and-down">
                <li><Link to={'/shop'}>Shop</Link></li>
                <li><Link to={'/about'}>About</Link></li>
            </ul>
        </div>
    </nav>
)

export default About;