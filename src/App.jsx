import { useState } from "react"
import Header from "./Header"
import InputNSearch from "./InputNSearch"
import TabsAndControl from "./TabsAndControl"
import TaskList from "./TaskList"

function App() {

  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handelAddTask = (title,state)=>{

    setTasks(prev => [
      {
        id: Date.now(),
        title: title,
        state: false,
        time: new Date().toLocaleDateString([],{hour: '2-digit', minute: '2-digit'})
      },
      ...prev
    ]);

  }
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "active") return !task.state && matchesSearch;
    if (activeTab === "completed") return task.state && matchesSearch;
    return matchesSearch;
  });


  const stats = {
    pending: tasks.filter(t => !t.state).length,
    completed: tasks.filter(t => t.state).length
  };

  return (
      <div className="app-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="content-wrapper">
            <Header stat = {stats}/>
            <InputNSearch handelAddTask={handelAddTask}  setSearchQuery = {setSearchQuery} searchQuery={searchQuery}/>
            <TabsAndControl 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
            />
            <TaskList tasks={filteredTasks} setTasks={setTasks}  />
        </div>
        
        
      </div>
  )
}

export default App
