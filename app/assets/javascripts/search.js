$(function() {
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
    $('#user-search-result').append(html);
  }
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">${ msg }</div>`
    $('#user-search-result').append(html);
  }
  function appendMemberHTML(id, name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${id}>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('#chat-group-users').append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するメンバーはいません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
      return false;
  });

  $(document).on('click', '.chat-group-user__btn--add', function() {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    $(this).parent().remove();
    appendMemberHTML(id, name);
  });
  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
});