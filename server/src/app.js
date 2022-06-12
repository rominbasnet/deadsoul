import express from 'express';
import config from 'config';
import log from './logger/index.mjs';
import connect from './db/connect.mjs';
import routes from './routes.mjs';
import User from './model/user.model.mjs';
import deserializeUser from './middleware/deserializeUser.mjs';
import mongoose from 'mongoose';

const port = config.get("port");
const host = config.get("host");
const app = express();
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.listen(port, host,()=> {
	log.info(`Server listening on at http://${host}:${port}`);
	connect();
	routes(app);

});
