var tasks = [];

function loadTasks() {
  tasks = JSON.parse(localStorage.tasks);
  for (var i = 0; i < tasks.length; i++) {
    var p = document.createElement('p');
    p.innerText = tasks[i].task;
    p.ondblclick = remove;
    p.onclick = toggle;
    p.oncontextmenu = target;
    p.className = tasks[i].target ? "target" : tasks[i].striked ? "striked" : "";
    tasksList.appendChild(p);
  }
}

function saveTasks() {
  localStorage.tasks = JSON.stringify(tasks);
}

const inputBox = document.getElementsByTagName('input')[0];
const tasksList = document.getElementsByClassName('list')[0];
inputBox.addEventListener('keyup', e => {
    if (e.key == 'Enter' && inputBox.value) {
      add(inputBox.value, tasksList);
      inputBox.value = "";
    }
});


function add(task, j, striked = false) {
  var p = document.createElement('p');
  p.innerText = task;
  p.ondblclick = remove;
  p.onclick = toggle;
  p.oncontextmenu = target;
  tasks.push({ task: task, striked: false });
  j.appendChild(p);
  saveTasks();
}

function toggle(ele) {
  ele = ele.path[0];
  ele.className = ele.className == "striked" ? "" : "striked";
  tasks[getTaskIndex(ele)].striked = ele.className == "striked";
  saveTasks();
}

function remove(e) {
  tasks.splice(getTaskIndex(e.path[0]), 1);
  e.path[0].remove();
  saveTasks();
}

function target(e) {
  for (var i = 0; i < tasksList.children.length; i++) {
    delete tasks[i].target;
    tasksList.children[i].className = tasksList.children[i].className == "target" ? "" : tasksList.children[i].className;
  }
  e.path[0].className = e.path[0].className == "target" ? "" : "target";
  if (e.path[0].className == "target") {
    tasks[getTaskIndex(e.path[0])].target = true;
  } else {
    delete tasks[getTaskIndex(e.path[0])].target;
  }
  saveTasks();
  return false;
}

function toggleTheme(e) {
  document.body.className = document.body.className ? "" : "dark";
}

function getTaskIndex(dom) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].task == dom.innerText) {
      return i;
    }
  }
}