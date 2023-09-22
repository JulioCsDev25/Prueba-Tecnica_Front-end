import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout({ children }) {
    return (
        <div>
            <div className="header-container">
                <header className="header navbar navbar-expand-sm">

                    <ul className="navbar-item theme-brand flex-row  text-center">
                        <li className="nav-item theme-text">
                            <a href="/" className="nav-link"> APP TEST </a>
                        </li>
                    </ul>

                </header>
            </div>
            <main>
                {children}
            </main>
            <footer>
                
            </footer>
        </div>
    );
}

export default Layout;
