

var room_info = (function () {//singleton
	var passes = {};
	var members = {};

	return {
		getPass: function(room_name) {
			return passes[room_name];
		},
		setPass: function(room_name, pass) {
			passes[room_name] = pass;
		},
		addMember: function(room_name, member_name) {
			if(members[room_name] === undefined) {
				var member = {}
				member[member_name] = member_name;
				members[room_name] = member;
			}else {
				members[room_name][member_name] = member_name;
			}
		},
		getMembers: function(room_name) {
			return members[room_name];//object
		}
	};
}());

exports.room_info = room_info;

