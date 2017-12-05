var input_user = "";
var connected_user = "";
var connected_user_initial = "";

$(".disable-default-submit").submit(function(e) {
    e.preventDefault();
});
/*
$("#form-login-body, #form-login-nav, #form-register-body").submit(function(e) {
    e.preventDefault();
});*/

// Validate user input from navbar as well as from the main form in the center of screen
function get_user_input(){
  input_user = $('#input-user').val();
  if(input_user == "")
    input_user = $('#input-user-form').val();
  if(input_user == "")
    input_user = $('#input-new-user-form').val();
}

function get_user_messages(nextActionType){
  get_user_input();

  var jqXHR = $.get("http://www.angelito.com.br/webchat/messages?nickname=" + input_user, function (data) {
      start_next_action(nextActionType, data);
  })
    .fail(function (data) {
       show_request_error(data);
    });
}

function start_next_action(nextActionType, data){
  get_user_input();

  if(nextActionType == "login"){
    // load page
    // sucess message
    if(data.length > 21){
      load_chat_page();
    }
  }
  else if(nextActionType == "register"){
    if(data.length > 21){
      alert('usuário já existe');
    }
    else{
      $.post("http://www.angelito.com.br/webchat/user?nickname=" + input_user, function (data) {
          load_chat_page(data);
      })
       .fail(function (data) {
         show_request_error(data);
       });
    }
  }
}

function load_chat_page(data){
  // Load chat page
  load_send_message_painel();
}

function show_request_error(data) {
  // Show error
  alert('erro ' + data);
}

function login() {
  get_user_messages("login");
}

function register() {
  get_user_messages("register");
}
