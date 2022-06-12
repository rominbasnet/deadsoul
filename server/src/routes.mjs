import express from 'express';
import  { createUserHandler }  from './controller/user.controller.mjs';
import   { createUserSessionHandler, invalidateUserSessionHandler }  from './controller/session.controller.mjs'; 
import validateRequest from './middleware/validateRequest.mjs';
import requiresUser from './middleware/requiresUser.mjs';
import  { createUserSchema, createUserSessionSchema }  from './schema/user.schema.mjs';


export default function (app){
	app.get('/healthcheck',(req, res)=>{
		res.sendStatus(200); // res.status(200).send("ok")
	});

	//Register User
	app.post(
		"/api/users",
		validateRequest(createUserSchema),
		createUserHandler
	);

	//Login User
	app.post(
		"/api/sessions",
		validateRequest(createUserSessionSchema),
		createUserSessionHandler
	);




	//Get user session




	//Logout
	app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler,()=>console.log("done"));

}