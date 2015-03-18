
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
			
			r_i.room_info.addMember(room_name, member_name, socket.id);
			socket.join(room_name);

			socket.to(room_name).emit('adding_menber', {
				members: r_i.room_info.getMembers(socket.id)//object
			});
			socket.emit('adding_menber', {
				members: r_i.room_info.getMembers(socket.id)//object
			});
		});

		socket.on('disconnect', function() {
			var room_name = r_i.room_info.getRoomName(socket.id);
			r_i.room_info.delMember(socket.id);
			socket.to(room_name).emit('adding_menber', {
				members: r_i.room_info.getMembers(socket.id)//object
			});
			socket.emit('adding_menber', {
				members: r_i.room_info.getMembers(socket.id)//object
			});
		})
	});
}

exports.socketing = socketing;

