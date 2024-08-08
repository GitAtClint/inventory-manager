import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:8080/')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="home-page">
            <h1>Home Page</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}: {item.description}</li>
                ))}
            </ul>
        </div>
    );
}