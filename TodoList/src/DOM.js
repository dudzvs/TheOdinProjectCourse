export function createTaskElement({ text: taskText, id: taskId, isCompleted }) {
  const main = document.querySelector('main');
  let tasksBox = document.querySelector('.tasks');
  if (!tasksBox) {
    tasksBox = document.createElement('div');
    tasksBox.classList.add('tasks');
    main.appendChild(tasksBox);
  }
  const taskElement = document.createElement('li');
  taskElement.setAttribute('data-id', taskId);
  taskElement.classList.add('task');

  const taskCheck = document.createElement('input');
  taskCheck.setAttribute('type', 'checkbox');
  taskCheck.classList.add('todo-check');
  taskCheck.checked = isCompleted;

  const taskLabel = document.createElement('label');
  taskLabel.textContent = taskText;

  const delTaskBtn = document.createElement('button');
  delTaskBtn.classList.add('delete');

  const task_count = document.createElement('div');
  task_count.classList.add('task-count');

  const clearCompleted = document.createElement('div');
  clearCompleted.classList.add('clear-all');
  clearCompleted.textContent = 'Clear completed';

  taskElement.appendChild(taskCheck);
  taskElement.appendChild(taskLabel);
  taskElement.appendChild(delTaskBtn);

  tasksBox.appendChild(taskElement);
  tasksBox.appendChild(task_count);
  tasksBox.appendChild(clearCompleted);
  return taskElement;
}

export function updateTaskCount(tasks) {
  const taskCountElement = document.querySelector('.task-count');
  if (taskCountElement) {
    const taskCount = tasks.filter((task) => !task.isCompleted).length;
    taskCountElement.textContent = `${taskCount} items left`;
  }
}

export function removeCompletedTasks(tasks) {
  const tasksBox = document.querySelector('.tasks');
  const taskElements = tasksBox.querySelectorAll('.task');
  taskElements.forEach((taskElement) => {
    const taskId = parseInt(taskElement.getAttribute('data-id'), 10);
    const task = tasks.find((task) => task.id === taskId);
    if (task && task.isCompleted) {
      taskElement.remove();
    }
  });
}
