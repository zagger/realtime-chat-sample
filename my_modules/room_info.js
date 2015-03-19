
var room_info = (function () {//singleton
	var passes = {};
	var members = {};
	var rooms = {};

	return {
		getPass: function(room_name) {
			return passes[room_name];
		},
		setPass: function(room_name, pass) {
			passes[room_name] = pass;
		},
		addMember: function(room_name, member_name, id) {
			function addRoom(room_name, member) {
				if(rooms[room_name] === undefined) {
					rooms[room_name] = [member];
				}else {
					rooms[room_name].push(member);
				}
			}

			if(members[id] === undefined) {
				var member = {};
				member.room_name = room_name;
				member.name = member_name
				members[id] = member;
				addRoom(room_name, member);
			}
		},
		delMember: function(id) {
			delete members[id];
		},
		getRoomName: function(id) {
			return members[id].room_name;
		},
		getMembers: function() {
			return members;//object
		},
		getMembersInRoom: function(room_name) {
			rooms[room_name];
		},
		emptyMember: function(id) {
			if(!members[id]) {
				return true;
			}
			return false;
		}
	};
}());

exports.room_info = room_info;

