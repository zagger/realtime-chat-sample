

// var room_info = require('./my_modules/room_info.js');
var r_i = require('./room_info.js');


function socketing(io) {
	io.on('connection', function(socket){
		socket.on('broad', function(data) {
			switch(data.room_kind) {
				case 'public':
					socket.to('public').emit('br_recive', {value: data.value});
					break;
				case 'private':
					socket.to(data.room_name).emit('br_recive', {value: data.value});
					break;
			}
		});
	
		socket.on('register', function(data){
			var room_name = data.room_name;
			var member_name = data.member_name;
			
			r_i.room_info.addMember(room_name, member_name);
			socket.join(room_name);

			socket.to(room_name).emit('adding_menber', {
				members: r_i.room_info.getMembers(room_name)//object
			});
			socket.emit('adding_menber', {
				members: r_i.room_info.getMembers(room_name)//object
			});
		});

		socket.on('disconnect', function(){
		});
	});
}

exports.socketing = socketing;

