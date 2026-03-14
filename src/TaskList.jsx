import { CheckCircle, GripVertical, CheckCircle2 , Clock, Trash2, Circle   } from 'lucide-react'
import { useState } from 'react';




function TaskList({ tasks, setTasks }) {

    const [draggedItemIndex, setDraggedItemIndex] = useState(null);


    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
        task.id === id ? { ...task, state: !task.state } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleDragStart = (e, index) => {
        setDraggedItemIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

   const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedItemIndex === null || draggedItemIndex === index) return;

        const newTasks = [...tasks];
        const draggedItem = newTasks[draggedItemIndex];
        newTasks.splice(draggedItemIndex, 1);
        newTasks.splice(index, 0, draggedItem);
        
        setDraggedItemIndex(index);
        setTasks(newTasks);
    };
    
    return (
        <main className="task-list">
           {
            tasks.length > 0 ?(
                   tasks.map((task, index) =>(
                    <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnd={() => setDraggedItemIndex(null) }
                        onDragOver={(e) => handleDragOver(e,index)}
                        className={`task-item ${task.state ? 'completed' : ''} ${draggedItemIndex === index ? 'dragging' : ''}`}
                    >
                        <div className="task-main">
                            <div className="drag-handle">
                                <GripVertical size={18} />
                            </div>

                            <button
                                onClick={() => toggleTask(task.id)}
                                className='status-btn'
                            >
                                {task.state ?  <CheckCircle2 size={24} color="#4ade80" /> : <Circle size={24} color="#64748b" />}

                            </button>
                            <div className="task-content">
                                <span className="task-text">{task.title}</span>
                                <div className='task-meta'>
                                    <span className="meta-time">
                                    <Clock size={12}/> 
                                    { task.time}
                                    </span>
                                    <span className="meta-dot"></span>
                                </div>
                       
                            </div>
                        </div>
                        <div className="task-action">
                            <button onClick={() => deleteTask(task.id)} className="delete-btn">
                            <Trash2 size={18} />
                        </button>
                        </div>
                    </div>
                    
                   ))
            ):(
                <div className="empty-state">
                    <CheckCircle size={48} />
                    <h3>All caught up!</h3>
                    <p>No tasks match your current view.</p>
                </div>
            )
           }
        </main>
    );
}

export default TaskList;