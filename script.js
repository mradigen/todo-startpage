var tasks = [];
const inputBox = document.getElementsByTagName('input')[0];
const tasksList = document.getElementsByClassName('list')[0];

// LS = localStorage
function loadFromLS() {
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
	if (localStorage.theme == "light") {
		toggleTheme();
	}
}

function saveToLS() {
	localStorage.theme = document.body.className || "dark";
	localStorage.tasks = JSON.stringify(tasks);
}
	
inputBox.addEventListener('keyup', e => {
	if (e.key == 'Enter' && inputBox.value) {
		add(inputBox.value, tasksList);
		inputBox.value = "";
	}
});

document.addEventListener("click", (e) => {
	if (e.target == document.body) toggleTheme();
});

function add(task, j, striked = false) {
	var p = document.createElement('p');
	p.innerText = task;
	p.ondblclick = remove;
	// Shifted to global eventListener
	p.onclick = toggle;
	p.oncontextmenu = target;
	tasks.push({ task: task, striked: false });
	j.appendChild(p);
	saveToLS();
}

function toggle(p, n) {
  p = p.target
	p.className = p.className == "striked" ? "" : "striked";
	tasks[getTaskIndex(p)].striked = p.className == "striked";
	saveToLS();
}

function remove(e) {
	tasks.splice(getTaskIndex(e.target), 1);
	e.target.remove();
	saveToLS();
}

function target(e) {
	for (var i = 0; i < tasksList.children.length; i++) {
		delete tasks[i].target;
		tasksList.children[i].className = tasksList.children[i].className == "target" ? "" : tasksList.children[i].className;
	}
	e.target.className = e.target.className == "target" ? "" : "target";
	if (e.target.className == "target") {
		tasks[getTaskIndex(e.target)].target = true;
	} else {
		delete tasks[getTaskIndex(e.target)].target;
	}
	saveToLS();
	return false;
}

function toggleTheme() {
	document.body.className = document.body.className ? "" : "light";
	var bg = getComputedStyle(document.documentElement).getPropertyValue("--bg");
	document.documentElement.style.setProperty('--bg', getComputedStyle(document.documentElement).getPropertyValue("--fg"));
	document.documentElement.style.setProperty('--fg', bg);
	saveToLS();
}

function getTaskIndex(dom) {
	for (var i = 0; i < tasks.length; i++) {
		if (tasks[i].task == dom.innerText) {
			return i;
		}
	}
}
