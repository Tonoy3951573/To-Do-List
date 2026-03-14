import { useState } from "react";
import { Plus, Search } from 'lucide-react'

function InputNSearch({handelAddTask,setSearchQuery, searchQuery}){

    const [inputValue, setInputValue] = useState("");

   const handelSubmitClick = (e)=>{
        e.preventDefault();

        if(!inputValue.trim()) return;

        handelAddTask(inputValue,false);
        setInputValue("");
    }

 


    return(
        <div className="action-bar">
            <form onSubmit = {handelSubmitClick} className="input-relative">
                <Plus className="input-icon" size={20} />
                <input
                    type="text" 
                    placeholder="What to be done?" 
                    value={inputValue}
                    onChange={(e)=> setInputValue(e.target.value)}
                />
               
                <button type="submit" className="add-btn">
                    Add
                </button>
            </form>

            <div className="search-box">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                
            </div>
        </div>

        
    );
}

export default InputNSearch;