import express from "express";
import mongoose from "mongoose";
import http from "http";
import config from "./config/config";
import expressConfig from "./frameworks/webserver/express";
import mongoDbConnection from "./frameworks/database/mongoDB/connection";
import serverConfig from "./frameworks/webserver/server";
import routes from "./frameworks/webserver/routes";
import socketioConfig from "./frameworks/services/socketio";

const app = express();
const server = http.createServer(app);

// express.js configuration
expressConfig(app);

// server configuration and start
serverConfig(server, config).startServer();

// socket.io configuration
socketioConfig(server)

// DB configuration and connection create
mongoDbConnection(mongoose, config).connectToMongo();

// routes for each endpoint
routes(app, express);

export default app;
