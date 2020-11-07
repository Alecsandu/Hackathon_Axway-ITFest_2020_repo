function addEvents()
{
  var div = document.getElementById("events");
  var newTask = document.createElement("div");
  var title = document.createElement("p");
  title.innerHTML = "New task is";
  var desc = document.createElement("p");
  desc.innerHTML = "Wow that is really cool";
  //desc.className = "nice";
  newTask.appendChild(title);
  newTask.appendChild(desc);
  div.appendChild(newTask);
}
