document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.querySelector(".adbtn");
    const taskInput = document.querySelector(".text");
    const taskContainer = document.querySelector(".task-list");
    const emptyMessage = document.querySelector(".empty-message");

    // Hide the empty message initially
    emptyMessage.style.display = "none";

    // Load existing tasks from localStorage
    loadTasks();

    // Add Task Function
    addButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const currentDateTime = formatDateTime(new Date());
            addTask(taskText, false, currentDateTime); // Pass the formatted date and time
            taskInput.value = ""; // Clear input after adding
            saveTasks(); 
        }
    });

    // Function to Format Date and Time with "Today" and "Yesterday"
    function formatDateTime(date) {
        const options = { hour: '2-digit', minute: '2-digit' };
        const formattedTime = date.toLocaleTimeString([], options); // HH:MM format

        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        const isYesterday = date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();

        let formattedDate;
        if (isToday) {
            formattedDate = "Today";
        } else if (isYesterday) {
            formattedDate = "Yesterday";
        } else {
            formattedDate = date.toLocaleDateString(); // MM/DD/YYYY format
        }

        return `${formattedDate} ${formattedTime}`;
    }

    // Function to Add Task
    function addTask(text, completed = false, createdAt = formatDateTime(new Date())) {
        // Remove the empty message if tasks are present
        if (taskContainer.children.length === 0) {
            emptyMessage.style.display = "none"; // Hide message
        }

        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        // Create a label for the checkbox
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("checkbox-label");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = completed; // Set checkbox state based on completion
        checkbox.addEventListener("change", () => {
            taskContent.classList.toggle("completed", checkbox.checked);
            saveTasks(); // Save to localStorage on checkbox change
        });

        const customCheckbox = document.createElement("span");
        customCheckbox.classList.add("custom-checkbox");

        // Append checkbox and custom checkbox to the label
        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(customCheckbox);
        taskItem.appendChild(checkboxLabel);

        // Truncate text if it's too long
        const truncatedText = truncateText(text, 30); // Limit text length to 30 characters
        const taskContent = document.createElement("span");
        taskContent.classList.add("task-content");
        taskContent.innerText = truncatedText;

        // Create a new span for the date and time
        const taskDate = document.createElement("span");
        taskDate.classList.add("task-date");
        taskDate.innerText = createdAt; // Use passed date and time

        taskItem.appendChild(taskContent); // Append task content to task item
        taskItem.appendChild(taskDate); // Append date and time to task item

        // Move edit and delete buttons to the end
        const editButton = document.createElement("img");
        editButton.src = "edit.png"; // Ensure this path is correct
        editButton.alt = "Edit Task";
        editButton.classList.add("edit-btn");
        editButton.addEventListener("click", () => editTask(taskItem, taskContent));

        const deleteButton = document.createElement("img");
        deleteButton.src = "delete.png"; // Ensure this path is correct
        deleteButton.alt = "Delete Task";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
            deleteTask(taskItem);
            checkEmpty();
            saveTasks(); // Save to localStorage after deletion
        });

        // Append edit and delete buttons at the end
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskContainer.appendChild(taskItem);

        // Update checkbox state based on completion
        if (completed) {
            taskContent.classList.add("completed");
        }
    }

    // Function to Truncate Text
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "..."; // Add "..." if text exceeds maxLength
        }
        return text; // Return original text if within limit
    }

    // Function to Check if Task List is Empty
    function checkEmpty() {
        if (taskContainer.children.length === 0) {
            emptyMessage.style.display = "block"; // Show empty message
        }
    }

    // Function to Edit Task
    function editTask(taskItem, taskContent) {
        const popup = document.createElement("div");
        popup.classList.add("popup");

        const popupContent = document.createElement("div");
        popupContent.classList.add("popup-content");

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskContent.innerText.replace("...", ""); // Remove "..." for editing
        editInput.classList.add("edit-input");

        const saveButton = document.createElement("button");
        saveButton.innerText = "Save";
        saveButton.classList.add("save-btn");
        saveButton.addEventListener("click", () => {
            const newValue = editInput.value.trim();
            if (newValue) {
                taskContent.innerText = truncateText(newValue, 30); // Apply truncation on save
                document.body.removeChild(popup);
                saveTasks(); // Save to localStorage after editing
            }
        });

        const closeButton = document.createElement("button");
        closeButton.innerText = "Cancel";
        closeButton.classList.add("close-btn");
        closeButton.addEventListener("click", () => {
            document.body.removeChild(popup);
        });

        popupContent.appendChild(editInput);
        popupContent.appendChild(saveButton);
        popupContent.appendChild(closeButton);
        popup.appendChild(popupContent);
        document.body.appendChild(popup);
    }

    // Function to Delete Task
    function deleteTask(taskItem) {
        taskContainer.removeChild(taskItem);
    }

    // Function to Save Tasks to localStorage
    function saveTasks() {
        const tasks = [];
        const taskItems = taskContainer.querySelectorAll(".task-item");
        taskItems.forEach(item => {
            const checkbox = item.querySelector(".task-checkbox");
            const taskContent = item.querySelector(".task-content");
            const taskDate = item.querySelector(".task-date");
            tasks.push({
                text: taskContent.innerText.replace("...", ""), // Remove "..." before saving
                completed: checkbox.checked,
                createdAt: taskDate.innerText // Save date and time as well
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    // Function to Load Tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Check if there are no tasks and show the empty message
        if (tasks.length === 0) {
            document.querySelector(".empty-message").style.display = "block";
          
        } else {
            document.querySelector(".empty-message").style.display = "none";
            

            console.log("p")
            tasks.forEach(task => {
                addTask(task.text, task.completed, task.createdAt); // Pass saved date and time
            });
        }
    }
});
const popup_d = document.querySelector(".drawing-popup");
popup_d.style.display = 'none';

document.getElementById('hw').addEventListener('click', function () {
    popup_d.style.display = 'flex';
});

document.querySelector(".close1-btn").addEventListener('click', function () {
    popup_d.style.display = 'none';

});

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let eraserMode = false;

// Start drawing
canvas.addEventListener('mousedown', () => {
    drawing = true;
});

canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    if (eraserMode) {
        ctx.clearRect(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop, 4, 4);
    }
    else {
        ctx.strokeStyle = 'black'

        // Draw line based on cursor position
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }
}

// Stop drawing
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

// Capture and display the drawing in the sidebar
function submitDrawing() {
    document.querySelector(".drawing-popup").style.display = 'none';
    document.querySelector(".empty-message").style.display = 'none';

    const imageURL = canvas.toDataURL('image/png');

    // Create a new image element for each submitted drawing
    const newImageContainer = document.createElement('li');
    newImageContainer.style.marginBottom = '10px';

    const newImage = document.createElement('img');
    newImage.src = imageURL;
    newImage.alt = 'Submitted Drawing';
    newImage.style.maxWidth = '50%';
    newImage.style.border ="1px solid gray";
    newImage.style.borderRadius = "12px"
    newImage.style.margin ="9px"
    newImage.style.boxShadow ="1px 8px 15px -3px rgba(0, 0, 0, 0.1), 1px 8px 15px -3px rgba(0, 0, 0, 0.1), 5px 8px 15px -3px rgba(0, 0, 0, 0.1)"
    

    // Create a delete button
    const deleteButton = document.createElement("img");
        deleteButton.src = "delete.png"; // Ensure this path is correct
        deleteButton.alt = "Delete Task";
        deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
        deleteDrawing(imageURL, newImageContainer);
    };

    // Append the new image and delete button to the container
    newImageContainer.appendChild(newImage);
    newImageContainer.appendChild(deleteButton);

    // Append the container to the sidebar
    const imgcont = document.querySelector(".task-list");

    imgcont.appendChild(newImageContainer);

    // Save to local storage
    saveDrawing(imageURL);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.querySelector(".submit-btn").addEventListener('click', submitDrawing);


// Clear the entire canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
document.querySelector(".reset-btn").addEventListener('click', clearCanvas);
document.querySelector(".pencil-btn").addEventListener('click',function(){eraserMode = false});
// Toggle eraser mode
function toggleEraser() {
    eraserMode = !eraserMode;
    if (eraserMode) {
        alert('Eraser mode activated. Draw with white to erase.');
    } else {
        alert('Drawing mode activated. Draw with black color.');
    }
}

document.querySelector(".eraser-btn").addEventListener('click', toggleEraser);


// Save drawing to local storage
function saveDrawing(imageURL) {
    let savedDrawings = JSON.parse(localStorage.getItem('drawings')) || [];
    savedDrawings.push(imageURL);
    localStorage.setItem('drawings', JSON.stringify(savedDrawings));
}

// Load drawings from local storage
function loadDrawings() {


    const savedDrawings = JSON.parse(localStorage.getItem('drawings')) || [];
    const sidebar = document.querySelector('.task-list');
    if (savedDrawings.length === 0 && task.length === 0) {
        document.querySelector(".empty-message").style.display = "block";
    } else {
        document.querySelector(".empty-message").style.display = "none";
        savedDrawings.forEach(imageURL => {
            const newImageContainer = document.createElement('li');
            newImageContainer.style.marginBottom = '10px';

            const newImage = document.createElement('img');
            newImage.src = imageURL;
            newImage.alt = 'Submitted Drawing';
            newImage.style.maxWidth = '50%';
            newImage.style.border ="1px solid gray";
            newImage.style.borderRadius = "12px"
            newImage.style.margin ="9px"
            newImage.style.boxShadow ="1px 8px 15px -3px rgba(0, 0, 0, 0.1), 1px 8px 15px -3px rgba(0, 0, 0, 0.1), 5px 8px 15px -3px rgba(0, 0, 0, 0.1)"
            

            // Create a delete button
            const deleteButton = document.createElement("img");
            deleteButton.src = "delete.png"; // Ensure this path is correct
            deleteButton.alt = "Delete Task";
            deleteButton.classList.add("delete-btn");
            deleteButton.onclick = function () {
                deleteDrawing(imageURL, newImageContainer);
            };

            // Append the new image and delete button to the container
            newImageContainer.appendChild(newImage);
            newImageContainer.appendChild(deleteButton);

            // Append the container to the sidebar
            sidebar.appendChild(newImageContainer);
        });

        if (savedDrawings.length > 0) {
            document.querySelector(".empty-message").style.display = 'none';
        }
    }
}

// Delete drawing from the sidebar and local storage
function deleteDrawing(imageURL, container) {
    // Remove the image container from the sidebar
    container.remove();

    // Update local storage
    let savedDrawings = JSON.parse(localStorage.getItem('drawings')) || [];
    savedDrawings = savedDrawings.filter(url => url !== imageURL);
    localStorage.setItem('drawings', JSON.stringify(savedDrawings));

    // Check if there are still images left
    if (savedDrawings.length === 0) {
        document.querySelector(".empty-message").style.display = 'block';
    }
}

// Load drawings when the page loads
window.onload = loadDrawings;
