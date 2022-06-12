import mongoose from "mongoose";
import log from '../logger/index.mjs';

function connect(){

	return mongoose
	.connect("mongodb+srv://deadsoul2056:lousdaed1999@cluster0.yns7opa.mongodb.net/rest-api?retryWrites=true", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(()=>{
		log.info("Database connected");
	})
	.catch((error)=>{
		log.error("db error",error);

	})
}

export default connect;