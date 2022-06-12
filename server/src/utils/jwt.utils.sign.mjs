import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get("privateKey");

export default function sign(object,options){
	return jwt.sign(object, privateKey, options);
};


