import { User } from './DB.js';


exports.api = (app) => {



app.post('/test',function(req,res){
	console.log(req.body)
	res.end('12fg3');
})
app.post('/signup',function(req,res){
	console.log(req.body)
	// var list = new User({name:"sds", password:"123456"});
	// list.save()
	// .then(a => console.log(a))
	// .catch(err => console.log(err));
	res.end('12fg3');
})



};
