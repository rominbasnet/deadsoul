import User from '../model/user.model.mjs';
import lodash from 'lodash';

export async function createUser(input){
	try{
		return await User.create(input);
	}
	catch (error){
		throw new Error(error);
	}
}

export async function findUser(query){
	return User.findOne(query).lean();
};

export async function validatePassword({ email, password }){
	const user  = await User.findOne({ email });
	if (!user) {
		return false;	
	}

	const isValid = await user.comparePassword(password);

	if(!isValid){
		return false;
	}
	return lodash.omit(user.toJSON(), "password");
}

