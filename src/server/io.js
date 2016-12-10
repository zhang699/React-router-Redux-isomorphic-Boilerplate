import { Redisclient } from './redis';

const payload = [{a:12,b:13},{a:12,b:13},{a:12,b:13}];

Redisclient.set("short", JSON.stringify(payload), () => {

});
Redisclient.get("short",function (err, reply) {
    console.log(JSON.parse(reply)); // Will print `OK`
});



export const socketio = (io, axios, config1) => {

//伺服器重啟時Redis初始化連線人數
Redisclient.set("connectedUserNumber",0, () => {});
Redisclient.set("chatRoomUsersList",[], () => {});

io.on('connection', function(socket){

  //使用者斷開後減少連線人數
  socket.on('disconnect', function(socket){
    Redisclient.get("connectedUserNumber",function (err, reply) {
      if (err) console.log(err);
      Redisclient.set("connectedUserNumber",parseInt(reply)-1, () => {
        console.log('連線人數'+ (parseInt(reply)-1))
      });
    });
  });
  //使用者連接後增加連線人數
  Redisclient.get("connectedUserNumber",function (err, reply) {
    if (err) console.log(err);
    Redisclient.set("connectedUserNumber",parseInt(reply)+1, () => {
      console.log('連線人數'+ (parseInt(reply)+1))
    });
  });

	//房間
	socket.on('mainPage',() => {
		socket.join('mainPage',() => {
		  console.log('join main okok')
			socket.leave('chatPage', () => {
				console.log('leave chat');
			})
		});
	})
	socket.on('chatPage',(res) => {
		socket.join('chatPage',() => {
		  console.log('join chat')
      console.log(res)
      Redisclient.get("chatRoomUsersList", (err, reply) => {
        if (err) console.log(err);
        // const payload = res;
        // Redisclient.set("chatRoomUsersList",payload, () => {
        //   //console.log('連線人數'+ (parseInt(reply)-1))
        // });
      });
			socket.leave('mainPage', () => {
				console.log('leave main')
			});
		});
	})


  //事件
  socket.on('chat',(res) => {
    console.log(res);
    socket.broadcast.to('chatPage').emit('chat',{data: res});
    socket.emit('chat',{data: res})
  })

	socket.on('postArticle', function(){
		axios.get(`${config1.origin}/getArticle`)
			.then(function(response){
				socket.broadcast.to('mainPage').emit('addArticle', response.data);//broadcast傳給所有人除了自己
				socket.emit('addArticle', response.data);//加上傳給自己的socket
         //socket.broadcast.to(id).emit('my message', msg);
			}).
			catch(err => {
				console.log(err);
			})
	});
	socket.on('chat', (data) => {
		console.log(data)
	})
});
}
