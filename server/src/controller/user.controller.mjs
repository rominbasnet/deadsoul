import express from 'express';
import lodash from 'lodash';

import  {createUser}  from '../service/user.service.mjs';

export async function createUserHandler(req, res){
	try{
		const user = await createUser(req.body);
		return res.send(lodash.omit(user.toJSON(), "password"));

	}
	catch(e){
		
		return res.status(409).send(e.message);
	}
}

