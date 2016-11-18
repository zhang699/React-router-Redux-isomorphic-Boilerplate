var mongoose = require("mongoose");
mongoose.connect('mongodb://forclass1:test123@ds013898.mlab.com:13898/forclass',function(err){
	if(err){throw err};
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect mongo")
});

//用戶註冊
exports.User = mongoose.model('users', new mongoose.Schema({
	account:{type: String, unique: true},
	password: String,
  email: String,
  name: String,
  RegistedDate: String
}));
//發表文章
exports.Post = mongoose.model('articles', new mongoose.Schema({
	posterAccount: String,
	posterName: String,
	title: String,
  content: String,
  PostDate: String
}));
