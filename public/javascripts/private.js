
var io = io.connect('https://realtime-chat-sample.herokuapp.com');

io.on('connection', function(socket){
	console.log('connected with ' + name);
});


io.on('br_recive', function(br_data) {
	$('#ta').val(br_data.value);
});

io.on('adding_menber', function(members) {
	var list_str = "";
	for( var member in members.members) {
		list_str = list_str + '<li>' + member + '</li>'
		$('#member_list').html(list_str);
	}
});

$(function() {
	var room_name = $('#title').html();
	var member_name = $('#member_name').html();
	io.emit('register', {
		room_name: room_name,
		member_name: member_name
	});

	$('#ta').bind('keyup', function() {
		io.emit('broad', {
			value: $('#ta').val(),
			room_name: room_name,
			room_kind: 'private'
		});	
	});

});

