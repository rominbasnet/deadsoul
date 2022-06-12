import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

const UserSchema = new mongoose.Schema(
{
	email: { type: String, required: true, unique: true},
	name:{ type: String, required: true},
	password: { type: String, required: true},
},
{
	timestamps: true
}

);

UserSchema.pre('save', async function(next){
	let user = this;
	if (!user.isModified("password")) return next();

	const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
	const hash = await bcrypt.hashSync(user.password, salt);

	user.password = hash;
	return next();
});

//Used for logging in
UserSchema.methods.comparePassword = async function(candidatePassword){
	const user = this;
	return bcrypt.compare(candidatePassword, user.password)
			.catch((e)=> false);
};

const User = mongoose.model("User", UserSchema);

export default User;