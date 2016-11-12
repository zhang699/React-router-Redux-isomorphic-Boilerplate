import { User } from './DB.js';


exports.api = (app) => {

app.get('/test',(req,res)=>res.end(req.session.user.toString()) )

app.post('/login',function(req,res){
	User.find({account:req.body.account})
		.then(data => {
			if (data[0].password === req.body.password) {

				//
				req.session.user = req.body.account;
				console.log(req.session)
			  res.end('success login')
			}
		})
		.then(() => res.end('帳號或密碼錯誤'))
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
