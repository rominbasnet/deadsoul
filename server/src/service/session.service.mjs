import config from 'config';
import Session from '../model/session.model.mjs';
import sign from '../utils/jwt.utils.sign.mjs';
import  decode  from '../utils/jwt.utils.decode.mjs';
import { findUser } from './user.service.mjs';
import _ from 'lodash';

export async function createSession(userId, userAgent){
	const session = await Session.create({user: userId, userAgent});
	return session.toJSON();	
}
export function createAccessToken({
	user,
	session
}) {
	const accessToken = sign(
		{ ...user, session:session._id },
		{ expiresIn: config.get("accessTokenTtl") } /*time for session expiry*/
	);

	return accessToken;
}

export async function reIssueAccessToken({refreshToken}) {
	
	//Decode the refresh token
	const { decoded } = decode(refreshToken);
	if(!decoded || !_.get(decoded,"_id")) return false;

	//Get the session
	const session = await Session.findById(_.get(decoded, "_id"));

	//Ensure session is still valid

	if(!session || !session?.valid) return false;
	const user = await findUser({ _id: session.user });

	if(!user) return false;

	const accessToken = createAccessToken({ user, session });

	return accessToken;
}

export async function updateSession(query, update){
	return Session.updateOne(query, update);
}