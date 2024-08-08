import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {

    const [items, setItems] = useState([]);
    const [login, setLogin] = useState({ username: "", password: ""})
    const location = useLocation();
    var username = "";
    location.state ? username=location.state.username : username="guest";
    
    useEffect(() => {
        fetch('http://localhost:8080/')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="homePage">
            <h1>Home Page</h1>
            {username==="guest" ? <Link to="/login"><button>login</button></Link> :
            <>
            <Link to="/login"><button>logout</button></Link>
            <Link to="/inventory" state={{username:username}}><button>my inventory</button></Link>
            </>}
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}: {item.description.substring(0,100)}... quantity: {item.quantity} {item.creator}</li>
                ))}
            </ul>
        </div>
    );
}