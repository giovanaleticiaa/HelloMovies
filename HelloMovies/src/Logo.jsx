import { Link } from 'react-router-dom';
import './Logo.css';
import Logo from './assets/Logo.png'

function Home() {
    return (
        <div>
            <Link to="/app" className="app">
                <img src={Logo} alt="Logo" className="logo" />
            </Link>
        </div>
    );
}

export default Home;