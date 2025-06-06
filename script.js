document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('task-input');
  const addBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  // 🔁 Carregar tarefas salvas
  loadTasks();

  // ➕ Adicionar tarefa
  addBtn.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText !== '') {
      addTaskToDOM(taskText, false);
      saveTask(taskText, false);
      input.value = '';
      input.focus();
    }
  });

  // 🎯 Delegação de eventos (completar ou excluir)
  taskList.addEventListener('click', (event) => {
    const target = event.target;
    const li = target.closest('.task-item');
    const text = li.querySelector('span').textContent;

    if (target.classList.contains('complete-btn')) {
      li.classList.toggle('completed');
      toggleTaskStatus(text);
    }

    if (target.classList.contains('delete-btn')) {
      li.remove();
      deleteTask(text);
    }
  });

  // 📌 Função: adicionar tarefa na tela
  function addTaskToDOM(text, completed) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (completed) li.classList.add('completed');

    const taskLeft = document.createElement('div');
    taskLeft.classList.add('task-left');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');

    const span = document.createElement('span');
    span.textContent = text;

    // 🔁 Permitir edição ao dar duplo clique
span.addEventListener('dblclick', () => {
  const inputEdit = document.createElement('input');
  inputEdit.type = 'text';
  inputEdit.value = span.textContent;
  inputEdit.classList.add('edit-input');

  // Substitui o texto pelo input
  taskLeft.replaceChild(inputEdit, span);
  inputEdit.focus();

  // Salvar quando sair do campo ou pressionar Enter
  const save = () => {
    const newText = inputEdit.value.trim();
    if (newText && newText !== span.textContent) {
      minhasbolas(span.textContent, newText);
      span.textContent = newText;
    }
    taskLeft.replaceChild(span, inputEdit);
  };

  inputEdit.addEventListener('blur', save);
  inputEdit.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') save();
  });
});


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.classList.add('delete-btn');

    taskLeft.appendChild(completeBtn);
    taskLeft.appendChild(span);
    li.appendChild(taskLeft);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  // 💾 Função: salvar nova tarefa
  function saveTask(text, completed) {
    const tasks = getTasks();
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // 🔁 Função: carregar tarefas
  function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => {
      addTaskToDOM(task.text, task.completed);
    });
  }

  // ✅ Função: alternar status da tarefa
  function toggleTaskStatus(text) {
    const tasks = getTasks();
    const index = tasks.findIndex(task => task.text === text);
    if (index !== -1) {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  // ❌ Função: excluir tarefa
  function deleteTask(text) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // 🔍 Função utilitária: obter tarefas do localStorage
  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  // ✏️ Atualiza o texto da tarefa no localStorage
function minhasbolas(oldText, newText) {
  const tasks = getTasks();
  const index = tasks.findIndex(task => task.text === oldText);
  if (index !== -1) {
    tasks[index].text = newText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
});
