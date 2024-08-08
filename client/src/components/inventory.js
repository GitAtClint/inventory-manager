import { useState, useEffect } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

export default function Inventory() {
    const [items, setItems] = useState([]);
    const [itemToInsert, setItemToInsert] = useState({ item_name: "", description: "", quantity: 0 })
    const navigate = useNavigate();

    const location = useLocation();
    var username = "";
    location.state ? username = location.state.username : username = "guest";

    //if user not logged in will auto redirect to HomePage
    if (username === "guest")
        navigate("/");

    useEffect(() => {
        fetch(`http://localhost:8080/inventory/${username}`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [username]);





    const clickAddItem = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/inventory/${username}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...itemToInsert }),
        })
            .then((response) => response.json())
            .then((post) => {
                if (post.message === "New item added to inventory") {
                    alert(post.message);
                    window.location.reload();
                } else {
                    alert(post.message);
                }
            });
    }
    const handleItemNameInput = (e) => {
        setItemToInsert({ ...itemToInsert, item_name: e.target.value });
    }
    const handleDescriptionInput = (e) => {
        setItemToInsert({ ...itemToInsert, description: e.target.value });
    }
    const handlequantityInput = (e) => {
        setItemToInsert({ ...itemToInsert, quantity: e.target.value });
    }

    return (
        <div className="inventory">
            <h1>{username}: Inventory</h1>
            <Link to="/" state={{ username: username }}><button>Full inventory</button></Link>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}: {item.description} quantity: {item.quantity} {item.creator}</li>
                ))}
            </ul>

            <h3>add item</h3>
            <form className="add-item-form">
                <label for="item_name">item:</label>
                <input className="add-item-form" onChange={handleItemNameInput} type="text" id="item_name" required />
                <br />
                <label for="description">description:</label>
                <input className="add-item-form" onChange={handleDescriptionInput} type="text" id="description" required />
                <br />
                <label for="quantity">quantity:</label>
                <input className="add-item-form" onChange={handlequantityInput} type="text" id="quantity" required />
                <br />
                <button className="insert-item-button" id="itemButton" type="submit" onClick={clickAddItem}>submit</button>
            </form>
        </div>
    );
}                   