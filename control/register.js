const handleregister = (req,res,db,bcrypt)=>{
	const {email,name,password}=req.body
	const saltRounds = 10;
	const hash = bcrypt.hashSync(password,saltRounds);
	if(!email || !password || !name){
		return res.status(400).json('incorrect form data')
	}
	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
		   return trx('users')
			.returning('*')
			.insert({
				name:name,
				email:loginEmail[0],
				joined:new Date()
			})
			.then(user=>res.json(user[0]))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
		.catch(err=>res.status(400).json('not register'))
}

module.exports={
	handleregister:handleregister
}