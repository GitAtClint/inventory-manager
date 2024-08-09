import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {

    const [items, setItems] = useState([]);
    const [login, setLogin] = useState({ username: "", password: "" })
    const [itemToView, setItemToView] = useState(null)
    const location = useLocation();
    var username = "";
    location.state ? username = location.state.username : username = "guest";

    useEffect(() => {
        fetch('http://localhost:8080/')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const leaveView = () => {
        setItemToView(null)
    }
    const viewItem = (item) => {
        setItemToView({ item_name: item.name, description: item.description, quantity: item.quantity, created_by: item.creator })
    }

    return (
        <div className="homePage">
            <h1>Inventory Manager</h1>
            {username === "guest" ? <Link to="/login"><button>login</button></Link> :
                <>
                    <Link to="/login"><button>logout</button></Link>
                    <Link to="/inventory" state={{ username: username }}><button>my inventory</button></Link>
                </>}
            {itemToView ?
                <>
                    <h1>{itemToView.item_name}</h1>
                    <h3>description:</h3>
                    <p>{itemToView.description}</p>
                    <h5>Quantity:</h5>
                    <p>{itemToView.quantity}</p>
                    <h5>Created By:</h5>
                    <p>{itemToView.created_by}</p>

                    <button onClick={leaveView}>return</button>
                </> :
                <ul>
                    {items.map(item => (
                        <li onClick={() => viewItem(item)} key={item.id}>{item.name}: {item.description.substring(0, 100)}... quantity: {item.quantity} {item.creator}</li>
                    ))}
                </ul>
            }
        </div>
    );
}
