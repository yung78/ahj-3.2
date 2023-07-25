export default class Taskbar {
  constructor() {
    this.pinned = document.querySelector('.pinned');
    this.allTasks = document.querySelector('.all_tasks');
    this.input = document.querySelector('.add_task');
    this.modal = document.querySelector('.modal');
    this.pinnedArr = [];
    this.tasksArr = ['Написать отчет', 'Забрать посылку'];
    this.filterArr = [];
  }

  changeHeader() {
    // Change pinned header
    if (this.pinned.querySelector('.task')) {
      document.querySelector('.pinned_status').textContent = 'Pinned';
    } else {
      document.querySelector('.pinned_status').textContent = 'No pinned tasks';
    }
    // Change all tasks header
    if (this.allTasks.querySelector('.task')) {
      document.querySelector('.all_tasks_header').textContent = 'All Tasks';
    } else {
      document.querySelector('.all_tasks_header').textContent = 'No tasks found';
    }
  }

  pinnedTask() {
    this.allTasks.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.className === 'checkbox') {
        e.target.textContent = 'V';
        const task = e.target.closest('.task').querySelector('.task_text').textContent;
        this.pinnedArr.push(task);
        this.tasksArr.splice(this.tasksArr.indexOf(task), 1);
        if (this.input.value === '') {
          this.taskAdder(this.tasksArr, this.allTasks);
        } else {
          e.target.closest('.task').remove();
        }
        this.taskAdder(this.pinnedArr, this.pinned);
        this.changeHeader();
      }
    });
  }

  unPinnedTask() {
    this.pinned.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.className === 'checkbox') {
        e.target.textContent = '';
        const task = e.target.closest('.task').querySelector('.task_text').textContent;
        this.tasksArr.push(task);
        this.pinnedArr.splice(this.pinnedArr.indexOf(task), 1);
        if (this.input.value === '') {
          this.taskAdder(this.tasksArr, this.allTasks);
        } else if (task.toLowerCase().includes(this.input.value.trim().toLowerCase())) {
          this.allTasks.append(e.target.closest('.task'));
        }
        this.taskAdder(this.pinnedArr, this.pinned);
        this.changeHeader();
      }
    });
  }

  taskCreator(input) {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
    <div class="task_text">${input}</div>
    <div class="checkbox"></div>
    `;
    return div;
  }

  taskAdder(tasksArr, parent) {
    this.clearAllTasks(parent);
    tasksArr.forEach((task) => {
      const div = this.taskCreator(task);
      parent.append(div);
    });
  }

  clearAllTasks(parent) {
    const tasks = parent.querySelectorAll('.task');
    for (const el of tasks) {
      el.remove();
    }
  }

  openCloseModal() {
    document.querySelector('.close').addEventListener('click', (e) => {
      e.preventDefault();
      this.modal.style.display = 'none';
    });
    this.modal.style.display = 'block';
  }

  onFilter() {
    this.input.addEventListener('input', (e) => {
      e.preventDefault();
      this.filterArr = this.tasksArr.filter((el) => el.toLowerCase().includes(this.input.value.trim().toLowerCase()));
      this.taskAdder(this.filterArr, this.allTasks);
      this.changeHeader();
    });
  }

  addTask() {
    document.querySelector('.add_task_form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.input.value.trim() === '') {
        this.openCloseModal();
      } else {
        this.tasksArr.push(this.input.value.trim());
        this.input.value = '';
        this.taskAdder(this.tasksArr, this.allTasks);
      }
      this.changeHeader();
    });
  }

  actionAll() {
    this.taskAdder(this.tasksArr, this.allTasks);
    this.pinnedTask();
    this.unPinnedTask();
    this.addTask();
    this.onFilter();
  }
}
