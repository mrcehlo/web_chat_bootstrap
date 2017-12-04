var number_of_connected_users = 0;
var number_of_messages = 0;

function load_send_message_painel() {
  get_user_initial();
  // Clean previous html
   $("#main").empty();
  // Inject chat.html
   $("#main").load("/assets/includes/chat.html", function() {
      $("#user-initial").attr("data-letters", connected_user_initial.toUpperCase());
      // Load all load all messages
      load_messages_from_server();
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

function load_messages_from_server() {
  $.getJSON("http://www.angelito.com.br/webchat/messages?nickname=" + input_user, function (data) {
      // Clean previous html
      $("#all-messages-container").empty();
      load_single_message(null, data, 0);
  })
    .fail(function (data) {
       show_request_error(data);
    });
}

function load_single_message(html_text, all_messages, current_index) {
    localStorage.setItem("current_index", current_index.toString());

    if(current_index == 0){
      $.ajax({ type: "GET",
         url: "/assets/includes/message.html",
         success : function(text)
         {
             current_index = localStorage.getItem("current_index");

             append_message_into_page(text, all_messages, current_index);
         }
      });
    }
    else if(html_text != null){
      append_message_into_page(html_text, all_messages, current_index);
    }
}

function append_message_into_page(html_text, all_messages, current_index){
  var current_message_user = all_messages[current_index].user;
  var current_message_datetime = all_messages[current_index].datetime;
  var current_message_text = all_messages[current_index].textmsg;

  $('#all-messages-container').append(html_text);

  $(".message-user-initial").last().attr("data-letters", get_user_initial(current_message_user).toUpperCase());
  $(".message-user-name").last().text(current_message_user);
  $(".message-time").last().text(current_message_datetime);
  $(".message-text").last().html(current_message_text);

  if(Number(current_index) < all_messages.length - 1)
    load_single_message(html_text, all_messages, Number(current_index) + 1);
}

function get_user_initial(user_params) {
  if(user_params == undefined){
    connected_user = input_user;
    connected_user_initial = connected_user[0] + connected_user[connected_user.length - 1];
  }
  else {
    return user_params[0] + user_params[user_params.length - 1];
  }
}
