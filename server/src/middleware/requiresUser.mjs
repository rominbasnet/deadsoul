import _ from 'lodash';
import express from 'express';

const requiresUser = async(req, res, next)=>{
	const user = _.get(req,"user");

	if(!user) {
		return res.sendStatus(403);
	}

	return next();
};

export default requiresUser;