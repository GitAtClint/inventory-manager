import { useState, useEffect } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

export default function Inventory() {

    const [items, setItems] = useState([]);
    const [login, setLogin] = useState({ username: "", password: ""})
    const navigate = useNavigate();

    const location = useLocation();
    var username = "";
    location.state ? username=location.state.username : username="guest";
    
    //if user not logged in will auto redirect to HomePage
    if(username === "guest")
        navigate("/");
    
    useEffect(() => {
        fetch(`http://localhost:8080/inventory/${username}`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [username]);

    return (
        <div className="inventory">
            <h1>{username}: Inventory</h1>
            <Link to="/" state={{username:username}}><button>Full inventory</button></Link>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}: {item.description} quantity: {item.quantity} {item.creator}</li>
                ))}
            </ul>
        </div>
    );
}