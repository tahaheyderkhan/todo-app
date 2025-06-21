function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = taskText;

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.onclick = function () {
    const newText = prompt("Edit your task:", span.innerText);
    if (newText !== null && newText.trim() !== "") {
      span.innerText = newText.trim();
    }
  };

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  removeBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}
