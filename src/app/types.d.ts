import { Application, Router, RequestHandler, ErrorRequestHandler,  } from 'express';

export type Middleware = RequestHandler | ErrorRequestHandler;

export interface AppConfig {
	port: number,
	verbose: boolean,
	app: Application
}

export interface Route {
	path: string,
	router: Router,
	routeMiddlewares?: Middleware[]
}