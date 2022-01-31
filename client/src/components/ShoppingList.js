import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
const API_BASE = 'http://localhost:5000'

export default function ShoppingList() {
    const [items, setItems] = useState([])

    useEffect(() => {
        getItems()
    }, [])
    
    const getItems = async () => {
        const data = await fetch(`/api/items`)
        .then(res => res.json())
        
        setItems(data)
    }

    const addItem = async () => {
        const name = prompt("Enter Name")
        if (name) {
            const data = await fetch('/api/items/newItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name
                })
            })
                .then(res => res.json())
                .then(data => setItems([...items, data]))
        }
    }

    const deleteItem = async (id) => {
        await fetch('/api/items/' + id, { method: 'DELETE' })
            .then(res => res.json())

        setItems(items.filter(item => item._id !== id))
    }

    return (
        <div>
            {items.map(item => (
                <ul className='ul' key={uuidv4()}>
                    <li>{item.name}</li>
                    <li>{item._id}</li>
                    <button onClick={() => deleteItem(item._id)}>Delete Item</button>
                </ul>
            ))}

            <button onClick={addItem}>Add Item</button>
        </div>
    );
}