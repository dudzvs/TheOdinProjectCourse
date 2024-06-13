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

  taskElement.appendChild(taskCheck);
  taskElement.appendChild(taskLabel);
  taskElement.appendChild(delTaskBtn);

  tasksBox.appendChild(taskElement);

  return taskElement;
}
