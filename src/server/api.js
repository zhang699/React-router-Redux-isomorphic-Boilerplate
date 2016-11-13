import { User } from './DB.js';


exports.api = (app) => {

app.get('/getUser',function(req,res){
	User.find({account:req.session.user},{_id:0,account:1,email:1,name:1})
		.then(data => {
			res.end(JSON.stringify(data[0]));
		})
		.catch(err => console.log(err));
})

app.post('/login',function(req,res){
	User.find({account:req.body.account})
		.then(data => {
			if(data[0] === undefined) {
				res.end('帳號或密碼錯誤')
			}
			if (data[0].password === req.body.password) {
				req.session.user = req.body.account;//將會在cookie中存入token之後token回到server取值
			  res.end('success login')
			}else{
				res.end('帳號或密碼錯誤')
			}
		})
})
app.post('/logout',function(req,res){
	req.session.user = null
	res.end();
})

app.post('/signup',function(req,res){

	User.find({account:req.body.account})
  	.then(data => {
	  	if(data[0] !== undefined){
		  	res.end('此帳號已被註冊')
		  }
	  })
		.then(() => {
			let user = new User({
				account: req.body.account,
				password: req.body.password,
			  email: req.body.email,
			  name: req.body.nickName,
			  RegistedDate: new Date()
			});
			user.save()
			.catch(err => console.log(err));
			res.end('成功註冊');
		})
   	.catch(err => console.log(err));
})



};

exports.userInfo = (account1) => {

}
