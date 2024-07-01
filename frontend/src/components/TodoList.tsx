import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import EditTodo from './EditTodo';
import './TodoList.css';

interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

    const fetchTodos = async () => {
        try {
            const response = await axiosInstance.get<Todo[]>('/todos/');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [todos]);

    const handleDelete = async (id: number) => {
        try {
            await axiosInstance.delete(`/todos/${id}/`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEdit = (id: number) => {
        setEditingTodoId(id);
    };

    const handleTodoUpdated = () => {
        setEditingTodoId(null);
        fetchTodos();
    };

    return (
        <div className="todo-list">
            <h2>Todo List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.completed ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleEdit(todo.id)} style={{backgroundColor:"green"}}>Edit</button>
                                <button onClick={() => handleDelete(todo.id)} style={{backgroundColor:"red"}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingTodoId !== null && (
                <EditTodo
                    todoId={editingTodoId}
                    onClose={() => setEditingTodoId(null)}
                    onTodoUpdated={handleTodoUpdated}
                />
            )}
        </div>
    );
};

export default TodoList;

