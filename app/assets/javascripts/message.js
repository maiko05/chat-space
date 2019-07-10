$(document).on('turbolinks:load', function() { 

  function buildHTML(message){
    var image =``;
    if (message.image) image += `<img class="lower-message__image" src=${message.image} >`
      var html = 
       `<div class="message" data-message_id="${message.id}">
          <div class="upper-info">
            <div class="upper-info__user">
              ${message.user_name}
            </div>
            <div class="upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          ${image}
        </div>`
      return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset('');
      $('input').prop('disabled',false); 
    })
    .fail(function(){
      alert('error');
    })
    return false;
  });

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message_id");
    group_id = $('.current-group').data("group_id")
    $('.form__submit').removeAttr('data-disable-with');
    $.ajax({
      url: `/groups/${group_id}/api/messages/`,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id,
             group_id: group_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        messages.forEach(function(message) {
         insertHTML += buildHTML(message);
         $('.messages').append(insertHTML);
        });
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      };
    })
    .fail(function() {
      alert('error');
    });
  };
    if(location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(reloadMessages, 5000);
    }
  // if ($('div').hasClass('.current-group__name')){
  //   setInterval(reloadMessages, 5000);
  // }
});
