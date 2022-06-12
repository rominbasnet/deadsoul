import _ from 'lodash';
import express from 'express';
import decode  from '../utils/jwt.utils.decode.mjs';
import { reIssueAccessToken } from '../service/session.service.mjs';


const deserializeUser = async (
	req,
	res,
	next
) => {

	
	const accessToken = _.get(req, "headers.authorization","").replace(
		/^Bearer\s/,
		""
	);

	const refreshToken = _.get(req, "headers.x-refresh");

	if(!accessToken) return next();

	const { decoded, expired } = decode(accessToken);

	if(decoded) {
		req.user = decoded;
		return next();
	}

	if(expired && refreshToken) {
		const newAccessToken = await reIssueAccessToken({ refreshToken });

		if(newAccessToken) {
			res.setHeader("x-access-token", newAccessToken);

			const { decoded } = decode(newAccessToken);

			req.user = decode;
		}
		return next();
	}

	return next();
};
export default deserializeUser;