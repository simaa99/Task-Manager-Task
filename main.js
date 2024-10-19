// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

// Save tasks to local storage
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Display tasks
const displayTasks = () => {
  console.log('\n--- View Tasks ---');
  if (tasks.length === 0) {
    console.log('No tasks available.');
  } else {
    tasks.forEach(({ id, description, completed }) => {
      console.log(`[${id}] ${description} - ${completed ? 'Completed' : 'Not Completed'}`);
    });
  }
};

// Add a new task
const addTask = () => {
  const description = prompt('Enter the task description:');
  if (description) {
    const newTask = { id: nextId++, description, completed: false };
    tasks.push(newTask);
    saveTasks();
    console.log(`Task added: [${newTask.id}] ${newTask.description}`);
  } else {
    console.log('Task description cannot be empty.');
  }
};

// Toggle task completion by ID
const toggleTaskCompletion = () => {
  const id = prompt('Enter the task ID to toggle completion status:');
  const task = tasks.find(t => t.id === parseInt(id));
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    console.log(`Task [${task.id}] completion status: ${task.completed ? 'Completed' : 'Not Completed'}`);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
};

// Remove a task by ID
const removeTask = () => {
  const id = prompt('Enter the task ID to remove:');
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
  if (taskIndex !== -1) {
    const removedTask = tasks.splice(taskIndex, 1)[0];
    saveTasks();
    console.log(`Task removed: [${removedTask.id}] ${removedTask.description}`);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
};

// Update a task's description by ID
const updateTask = () => {
  const id = prompt('Enter the task ID to update:');
  const task = tasks.find(t => t.id === parseInt(id));
  if (task) {
    const newDescription = prompt('Enter the new task description:');
    if (newDescription) {
      task.description = newDescription;
      saveTasks();
      console.log(`Task [${task.id}] updated to: ${task.description}`);
    } else {
      console.log('Task description cannot be empty.');
    }
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
};

// Search tasks by keyword
const searchTasks = () => {
  const keyword = prompt('Enter the keyword to search for:');
  const filteredTasks = tasks.filter(task => task.description.toLowerCase().includes(keyword.toLowerCase()));
  if (filteredTasks.length > 0) {
    console.log('Search Results:');
    filteredTasks.forEach(({ id, description, completed }) => {
      console.log(`[${id}] ${description} - ${completed ? 'Completed' : 'Not Completed'}`);
    });
  } else {
    console.log(`No tasks found containing the keyword: "${keyword}".`);
  }
};

// Display the main menu
const showMenu = () => {
  console.log('\n--- Task Manager Menu ---');
  console.log('1. View Tasks');
  console.log('2. Add Task');
  console.log('3. Toggle Task Completion');
  console.log('4. Remove Task');
  console.log('5. Update Task');
  console.log('6. Search Tasks');
  console.log('7. Exit');
  
  const action = prompt('Enter your choice:');
  switch (action) {
    case '1':
      displayTasks();
      break;
    case '2':
      addTask();
      break;
    case '3':
      toggleTaskCompletion();
      break;
    case '4':
      removeTask();
      break;
    case '5':
      updateTask();
      break;
    case '6':
      searchTasks();
      break;
    case '7':
      console.log('Exiting Task Manager.');
      break;
    default:
      console.log('Invalid choice. Please try again.');
      showMenu();
  }
};

// Start the Task Manager
showMenu();