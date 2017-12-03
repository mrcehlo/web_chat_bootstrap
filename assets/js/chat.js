

function load_send_message_painel() {
  get_user_initial();
  // Clean previous html
   $("#main").empty();
  // Inject chat.html
   $("#main").load("/assets/includes/chat.html", function() {
      $("#user-initial").attr("data-letters", connected_user_initial.toUpperCase());
   });
   // Set user name nav display
   $("#connected_user").text(connected_user);
   $("#connected_user").removeClass("d-none");
   // Hide login in-line
   $("#input-user").addClass("d-none");
   // Change login to logoff
   $("#input-button").text("Logoff");
   $("#input-button").attr("onclick", "logoff()");
}

function get_user_initial() {
  connected_user = input_user;
  connected_user_initial = connected_user[0] + connected_user[connected_user.length - 1];
}
