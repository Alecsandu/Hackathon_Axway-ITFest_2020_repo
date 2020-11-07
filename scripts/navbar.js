/* only execute this script when the document is ready */
$(document).ready(function () {
  /* function called when you click of the button */
  $("#navbtn").click(function () {
    /* this if else to change the text in the button */
    if ($("#navbtn").text() == "☰") {
      $("#navbtn").text("🞬");
    } else {
      $("#navbtn").text("☰");
    }

    /* this function toggle the visibility of our "li" elements */
    $("li").toggle("slow");
  });
});
