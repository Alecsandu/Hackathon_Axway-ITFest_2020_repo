function addEvents()
{
  var div = document.getElementById("events");
  var newTask = document.createElement("div");
  var title = document.createElement("h");
  title.innerHTML = "New task is";
  var desc = document.createElement("p");
  desc.innerHTML = "Wow that is really cool";
  newTask.className = "note";
  newTask.appendChild(title);
  newTask.appendChild(desc);
  div.appendChild(newTask);
}

function incarcaPoza(){
	var formData = new FormData();
	formData.append("photo",document.getElementById("up").files[0]);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/upload",true);
	xhttp.send(formData);
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			alert(this.responseText);
		}
	}
}

function getPhotos(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET","/get_photos",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
  xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
      var raspuns = JSON.parse(this.responseText);
			var div = document.getElementById("poze");
			for(let u of raspuns.imagini) {
        var form = document.createElement("form");
        form.method = "get";
        form.action = u.numele;
        var btn = document.createElement("button");
        btn.type = "submit";
        btn.className = "btn";
        btn.innerHTML = "Download!";
        form.appendChild(btn);
        var x = document.getElementById("events");
        x.appendChild(form);
      }
    }
  }
}
