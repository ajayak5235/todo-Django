import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './TodoList.css';

const AddTodo: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/todos/', {
                title,
                description,
            });
            console.log('Todo added:', response.data);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <div className="add-todo-container">
            <form className="add-todo-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="add-todo-input"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="add-todo-input"
                />
                <button type="submit" className="add-todo-button">Add Todo</button>
            </form>
        </div>
    );
};

export default AddTodo;
