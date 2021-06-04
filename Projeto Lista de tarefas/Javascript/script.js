const taskForm = document.querySelector(".form");   // o formulário
const taskInput = document.querySelector(".inserirTarefa");  // o input
const taskList = document.querySelector(".myList");  // a lista

// array pra guardar as tarefas
let tasks = [];

// quando tiver um submit no form, ele vai passar o valor para adicionar
taskForm.addEventListener("submit", function (event) {
    if (taskInput.value !== "") { 
        event.preventDefault();
        addTask(taskInput.value);
    } else {                      //se o valor for vazio vai alertar essa mensagem
        alert("Insira uma nova tarefa, por favor!");
    }
});

// função para adicionar uma nova tarefa
function addTask(item) {
    if (item !== "") {
        const task = {
            id: Date.now(), //Date.now() vai gerar uma id nova cada vez usando a data atual
            name: item,
            completed: false,
        };
        tasks.push(task);
        addToLocalStorage(tasks);

        taskInput.value = ""; // limpa o valor depois de enviar
    }
}

// função para fazer as tarefas aparecem como <li> na tela
function renderTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach(function (item) {
        const checked = item.completed ? "checked" : null;

        const li = document.createElement("li");
        li.setAttribute("class", "item");
        li.setAttribute("data-key", item.id);

        if (item.completed === true) {
            li.classList.add("checked");
        }

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button">X</button>
        `;

        taskList.append(li);
    });
}

// função para guardar as tarefas no localStorage, transformando em string
function addToLocalStorage(tasks) {
    localStorage.setItem("index", JSON.stringify(tasks));
    renderTasks(tasks);
}

// função para pegar as tarefas do localStorage, transformando em Array
function getFromLocalStorage() {
    const reference = localStorage.getItem("index");
    if (reference) {
        tasks = JSON.parse(reference);
        renderTasks(tasks);
    }
}

// função para mudar os valores de completo para nao completo
function toggle(id) {
    tasks.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(tasks);
}

// função para deletar uma tarefa do array de tarefas
function deleteTask(id) {
    tasks = tasks.filter(function (item) {
        return item.id != id;
    });

    addToLocalStorage(tasks);
}

// serve para pegar tudo do localStorage
getFromLocalStorage();

// vai ouvir um evento de click na lista, se for na checkbox vai usar a função toggle, e se for no botão de deletar vai usar a função deleteTask
taskList.addEventListener("click", function (event) {
    if (event.target.type === "checkbox") {
        toggle(event.target.parentElement.getAttribute("data-key"));
    }

    if (event.target.classList.contains("delete-button")) {
        deleteTask(event.target.parentElement.getAttribute("data-key"));
    }
});