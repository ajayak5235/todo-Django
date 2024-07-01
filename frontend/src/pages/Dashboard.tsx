import React from 'react';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {

    return (
        <div className='Dashboard'>
            <Navbar></Navbar>
            
                <h2>Your Todos</h2>
           
            <main style={{display:"flex"}}>
                <div style={{display:"flex" , flexDirection:"row"}}>
                <AddTodo />
                </div>
                
                <TodoList />
            </main>
        </div>
    );
};

export default Dashboard;
