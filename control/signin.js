const handlesignin = (req,res,db,bcrypt)=>{
	if(!req.body.email || !req.body.password){
		return res.status(400).json('incorrect form data')
	}
	db.select('*').from('login')
	.where('email','=',req.body.email)
	.then(data=>{
		const  ischeck = bcrypt.compareSync(req.body.password, data[0].hash);
		if(ischeck){
			db.select('*').from('users')
			.where('email','=',req.body.email)
			.then(user=>{
				res.json(user[0])
			})
			.catch(err=>res.status(400).json('unable get user'))
		}else{
			res.status(400).json('wrong password or email')
		}
	}).catch(err=>res.status(400).json('wrong'))
}

module.exports={
	handlesignin:handlesignin
}