const Clarifai = require('clarifai')

// const app = new Clarifai.App({
//  apiKey: '2c21491a673d4d378ab2fa942b61baeb'
// });

// const handleapi = (req,res)=>{
//  	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
//  	.then(data=>{
//  		res.json(data)
//  	})
//  	.catch(res.status(400).json('unable to use api'))
// }

const handleimage = (req,res,db)=>{
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0])
	})
	.catch(err=>{
		res.status(400).json('not users')
	})
}

module.exports = {
	handleimage:handleimage,
	// handleapi:handleapi
}