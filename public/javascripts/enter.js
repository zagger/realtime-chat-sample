
$(function() {
	$('#send_name').bind('click', function() {
		var member_name = $('#member_name').val();
		var room_name = $('#room_name').val();
		location.href = 'http://172.17.0.3:3000/chat/' 
			+ room_name 
			+ '/'
			+ member_name;
	});
});

