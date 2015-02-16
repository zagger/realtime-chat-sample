
$(function() {
	$('#send_name').bind('click', function() {
		var member_name = $('#member_name').val();
		var room_name = $('#room_name').val();
		location.href = 'https://realtime-chat-sample.herokuapp.com/chat/' 
			+ room_name 
			+ '/'
			+ member_name;
	});
});

