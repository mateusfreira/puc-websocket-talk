var ws = require('nodejs-websocket');
var clients = [];
var server = ws.createServer(function(conn) {
	clients.push(conn);
	console.log('New connection');
	conn.sendText('Wellcome')
	conn.on('close', function(){
		console.log('close');
		var index  = clients.indexOf(conn);
		clients.splice(index, 1);
	})
	conn.on('text', function(text ){
		var hasLogin = text.indexOf('login') === 0;
		console.log(hasLogin, text);
		if(hasLogin){
			conn.user_name = text.split(':')[1];
		}else
			clients.forEach(function(client){
				try{
					client.sendText(conn.user_name+" : "+text);
				}catch(e){}
			});
		});
}).listen(8082);