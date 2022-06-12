import express from 'express';
import log from '../logger/index.mjs';

const validate = (schema)=> async (
	req,
	res,
	next
) =>{
	
	try{

		await schema.validate({
			body: req.body,
			query: req.query,
			params: req.params
		});
		return next();
	}

	catch(e){
		log.error(e);
		return res.status(400).send(e.errors);
	}

}
export default validate;