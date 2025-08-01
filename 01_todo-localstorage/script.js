document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('todo-input');
  const taskButton = document.getElementById('add-task-btn');
  const todoList = document.getElementById('todo-list');

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Array to store the tasks 
  tasks.forEach((task) => renderTask(task));

  // Adding the Tasks
  taskButton.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText == '') return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    renderTask(newTask);
    saveLocal();
    input.value = "";
    console.log(tasks);
  });

  // Render Task (Add tasks)
  function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
      <span>${task.text}</span>
      <button>Delete</button>
    `;

    // Append the task to the list so it's visible

    li.addEventListener('click', (e) => {
      // if (e.target.tagName === 'BUTTON') return
      task.completed=!task.completed
      li.classList.toggle('completed')
      saveLocal();
      
    });
    //delete logic
    li.querySelector('button').addEventListener('click',(e)=>{
      e.stopPropagation() //prevent toggle from firing
      tasks=tasks.filter((t) => t.id !==task.id)
      li.remove();
      saveLocal();
    })
    todoList.appendChild(li);
  }


  // Add tasks to the Local Storage
  function saveLocal() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
