import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';

import '../css/landing.css';
import Logo from '../img/logo.svg';

function App() {
    return (
        <div id={'landing-container'}>
            <div className="content-wrapper">
                <img src={Logo} alt={'Logo'} />
                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>
                <div className="location">
                    <strong>Rio de Janeiro</strong>
                    <span>RJ</span>
                </div>
                <Link to={'/home'} className={'enter-app'}>
                    <FiArrowRight size={26} color={'rgba(0,0,0,0.6)'}/>
                </Link>
            </div>
        </div>
    );
}

export default App;
