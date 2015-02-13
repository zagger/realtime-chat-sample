
var io = io('http://172.17.0.2:3000');
// var io = io.connect();

io.on('connect', function(name){
	console.log('connected with ' + name);
});

io.on('publish', function(data){
	console.log('published with ' + data.value);
});

io.on('br_recive', function(br_data) {
	console.log(br_data);
	// $('textarea').val($('textarea').val() + br_data.value);
	$('textarea').val(br_data.value);
	$('#insert').html(br_data.value);
});

io.emit('connected', {value: "client data"});


$(function() {
	$('#tr_broad').bind('click', function() {
		console.log('aaa');
		io.emit('broad', {});	
	});
	$('textarea').bind('keyup', function() {
		io.emit('broad', {value: $('textarea').val()});	
	})
});


console.log(10000);
