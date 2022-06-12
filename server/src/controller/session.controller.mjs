import express from 'express';
import  sign   from '../utils/jwt.utils.sign.mjs';
import config from 'config';
import _ from 'lodash';
import { validatePassword } from '../service/user.service.mjs';
import { createSession, createAccessToken, updateSession } from '../service/session.service.mjs';

export async function createUserSessionHandler(req, res){
	//1.validate email and password
	const user = await validatePassword(req.body);

	if (!user){
		return res.status(401).send("Invalid username and password");
	}

	//2.create a session
	const session = await createSession(user._id, req.get("user-agent") || "");
	

 
	//3.create access token
	const accessToken = createAccessToken({
		user,
		session
	});

	//4.create refresh token
	const refreshToken = sign(session, {
		expiresIn: config.get("refreshTokenTtl")
	});

	//5.send refresh and access token back
	return res.send({ accessToken, refreshToken });

}

export async function invalidateUserSessionHandler(req, res){
	const sessionId = _.get(req,"user.session");

	await updateSession({ _id: sessionId }, { valid: false });

	return res.sendStatus(200);
}

