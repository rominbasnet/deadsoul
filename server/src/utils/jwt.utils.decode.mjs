import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get("privateKey");

export default function decode(token){
	try{
		const decoded = jwt.verify(token, privateKey);
		return { valid: true, expired: false, decoded }; 
	}
	catch(error){
		console.log({ error });
		return {
			valid: false,
			expired: error.message === "jwt expired",
			decoded: null
		};
	}
}