$(function(){
  function buildHTML(message){
    var image =``;
    if (message.image) image += `<img class="lower-message__image" src=${message.image} >`
      var html = 
       `<div class="message" data-message-id=${message.id}>
          <div class="upper-info">
            <div class="upper-info__user">
              ${message.user_name}
            </div>
            <div class="upper-info__date">
              ${message.date}
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
});