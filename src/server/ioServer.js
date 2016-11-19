 const ioServer = (io) => {

  io.on('connection', function(socket){

    console.log('a user connected');
    //發表文章
  	socket.on('postArticle', function(){
  		post({
  			host: 'localhost',
  			port: '3001',
  			path: '/getArticle'
  		},'hi')
  		.then(function(data){
  			socket.broadcast.emit('updateArticle',JSON.parse(data));//broadcast傳給所有人除了自己
  			socket.emit('updateArticle',JSON.parse(data));//加上傳給自己的socket
  		});
    });


  });
}

export default ioServer;
