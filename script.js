// ✅ Make sure code runs after page loads
window.addEventListener("DOMContentLoaded", () => {
  const SUPABASE_URL = 'https://hwwoovsayomjkvuqdjfm.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3d29vdnNheW9tamt2dXFkamZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDU3OTAsImV4cCI6MjA2NjY4MTc5MH0.OTWUmNAsZZiCcifUQxMfUhUmfarz8kWpjY6TIWg1hQk';

  // ✅ Get Supabase client AFTER library is loaded
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  // ✅ Load tasks when page loads
  loadTasks();

  async function loadTasks() {
    const { data, error } = await supabaseClient.from("todos").select("*");
    if (data) {
      data.forEach(task => renderTask(task));
    }
  }

  // ✅ Make addTask global so the button can use it
  window.addTask = async function () {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const { data, error } = await supabaseClient
      .from("todos")
      .insert([{ task: taskText }]);

    if (data && data.length > 0) {
      renderTask(data[0]);
      taskInput.value = "";
    }
  };

  function renderTask(taskObj) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = taskObj.task;

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = async function () {
      const newText = prompt("Edit your task:", span.innerText);
      if (newText && newText.trim() !== "") {
        span.innerText = newText.trim();
        await supabaseClient
          .from("todos")
          .update({ task: newText.trim() })
          .eq("id", taskObj.id);
      }
    };

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.onclick = async function () {
      li.remove();
      await supabaseClient
        .from("todos")
        .delete()
        .eq("id", taskObj.id);
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);

    taskList.appendChild(li);
  }
});

