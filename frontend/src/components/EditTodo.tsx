import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EditTodo.css';

interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface EditTodoProps {
    todoId: number;
    onClose: () => void;
    onTodoUpdated: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todoId, onClose, onTodoUpdated }) => {
    const [todo, setTodo] = useState<Todo>({
        id: 0,
        title: '',
        description: '',
        completed: false,
    });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get<Todo>(`http://localhost:8000/api/todos/${todoId}/`);
                setTodo(response.data);
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };
        fetchTodo();
    }, [todoId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/todos/${todoId}/`, todo);
            onTodoUpdated();
            onClose();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setTodo({
                ...todo,
                [name]: isChecked,
            });
        } else {
            setTodo({
                ...todo,
                [name]: value,
            });
        }
    };

    return (
        <div className="edit-todo-overlay">
            <div className="edit-todo">
                <h2>Edit Todo</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={todo.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        name="description"
                        value={todo.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                    />
                    <label>
                        Completed:
                        <input
                            type="checkbox"
                            name="completed"
                            checked={todo.completed}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div className="edit-todo-buttons">
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTodo;
