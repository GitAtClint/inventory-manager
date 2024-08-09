import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

export default function Inventory() {
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(false);
    const [itemToInsert, setItemToInsert] = useState(null)
    const [itemToViewOrEdit, setItemToViewOrEdit] = useState(null)

    const navigate = useNavigate();
    const location = useLocation();
    //const updatedBody = {};
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



    const editMode = () => {
        setEditing(!editing);
    }
    const leaveView = () => {
        setItemToViewOrEdit(null)
    }
    const viewItem = (item) => {
        setItemToViewOrEdit({ item_name: item.name, description: item.description, quantity: item.quantity, itemID: item.id })
    }

    const updateItem = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/inventory/${itemToViewOrEdit.itemID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({itemID: itemToViewOrEdit.itemID, ...itemToViewOrEdit}),
        })
        .then((response) => response.json())
        .then((updated) => {
            if (updated.message === "Item updated") {
                alert(updated.message);
                setEditing(false);
                setItemToViewOrEdit(null);
                window.location.reload();
            } else {
                alert(updated.message);
            }
        });
    }

    const deleteItem = () => {
        // if(confirm('Are you sure you want to delete this item?')) {
            //e.preventDefault();
            fetch(`http://localhost:8080/inventory/${itemToViewOrEdit.itemID}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((deleted) => {
                    if (deleted.message === "Item successfully removed") {
                        alert(deleted.message);
                        window.location.reload();
                    } else {
                        alert(deleted.message);
                    }
                });
    //     } else {
    //         console.log('delete canceled');
    //    }
    }

    const addItem = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/inventory/${username}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...itemToInsert }),
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
        editing ? 
        setItemToViewOrEdit({ ...itemToViewOrEdit, item_name: e.target.value }) :
        setItemToInsert({ ...itemToInsert, item_name: e.target.value });
    }
    const handleDescriptionInput = (e) => {
        editing ? 
        setItemToViewOrEdit({ ...itemToViewOrEdit, description: e.target.value }) :
        setItemToInsert({ ...itemToInsert, description: e.target.value });
    }
    const handlequantityInput = (e) => {
        editing ? 
        setItemToViewOrEdit({ ...itemToViewOrEdit, quantity: e.target.value }) :
        setItemToInsert({ ...itemToInsert, quantity: e.target.value });
    }

    return (
        <div className="inventory">
            <Link to="/" state={{ username: username }}><button>Full inventory</button></Link>
            <h1>{username}:</h1>

            {itemToViewOrEdit ?
                <>
                    {editing ?
                        (<>
                            <h1>Item Name:</h1>
                            <input onChange={handleItemNameInput} type="text" defaultValue={itemToViewOrEdit.item_name} />
                            <h3>description:</h3>
                            <input onChange={handleDescriptionInput} type="text" defaultValue={itemToViewOrEdit.description} />
                            <h5>Quantity:</h5>
                            <input onChange={handlequantityInput} type="text" defaultValue={itemToViewOrEdit.quantity} />
                            <button onClick={updateItem}>submit</button>
                        </>) : (<>
                            <h1>{itemToViewOrEdit.item_name}</h1>
                            <h3>description:</h3>
                            <p>{itemToViewOrEdit.description}</p>
                            <h5>Quantity:</h5>
                            <p>{itemToViewOrEdit.quantity}</p>

                            <button onClick={editMode}>edit</button>
                            <button onClick={() => {if(window.confirm('Are you sure you want to delete this item?')){deleteItem();}}}>delete</button>
                            <button onClick={leaveView}>return</button>
                        </>)}
                </> :
                <>
                    <ul>
                        {items.map(item => (
                            <li onClick={() => viewItem(item)} key={item.id}>{item.name}:
                                {item.description.length>100 ? `${item.description.substring(0, 100)}...` : item.description} quantity:
                                {item.quantity}
                                {/* <button onClick={() => viewItem(item)}>view</button> */}
                            </li>
                        ))}
                    </ul>
                    <h3>add item</h3>
                    <form className="add-item-form">
                        <label htmlFor="item_name">item:</label>
                        <input className="add-item-form" onChange={handleItemNameInput} type="text" id="item_name" required />
                        <br />
                        <label htmlFor="description">description:</label>
                        <input className="add-item-form" onChange={handleDescriptionInput} type="text" id="description" required />
                        <br />
                        <label htmlFor="quantity">quantity:</label>
                        <input className="add-item-form" onChange={handlequantityInput} type="text" id="quantity" required />
                        <br />
                        <button className="insert-item-button" id="itemButton" type="submit" onClick={addItem}>submit</button>
                    </form>
                </>
            }
        </div>
    );
}                   