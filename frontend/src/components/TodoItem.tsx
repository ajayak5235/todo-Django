import React, { useState } from 'react';
import axios from 'axios';
import EditTodo from './EditTodo';

interface TodoItemProps {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, completed }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        await axios.delete(`/api/todos/${id}/`);
       
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleTodoUpdated = () => {
        
    };

    return (
        <div>
            {isEditing ? (
                <EditTodo
                    todoId={id}
                    onClose={handleEditToggle}
                    onTodoUpdated={handleTodoUpdated}
                />
            ) : (
                <>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <label>
                        Completed:
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={async (e) => {
                                await axios.put(`/api/todos/${id}/`, {
                                    title,
                                    description,
                                    completed: e.target.checked
                                });
                        
                            }}
                        />
                    </label>
                
                </>
            )}
        </div>
    );
};

export default TodoItem;
