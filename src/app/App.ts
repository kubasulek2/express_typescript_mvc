import express, { Application } from 'express';
import { AppConfig, Route } from './types';

const defaultConfig: AppConfig = {
	app: express(),
	verbose: false,
	port: 3000
};

class App {
	private port: AppConfig['port'];
	private app: AppConfig['app'];
	private verbose: AppConfig['verbose'];


	constructor (config: Partial<AppConfig> = {}) {
		const appConfig: AppConfig = Object.assign(defaultConfig, config);
		const { app, port, verbose } = appConfig;

		this.app = app;
		this.port = port;
		this.verbose = verbose;

	}

	public get use (): Application['use'] { return this.app.use; }

	/**
	 * routes should be specified from greatest to least specificity
	 * route middlewares can be specified on controller level, however one can pass router level array of middlewares here
	 */
	public init (routes: Route[] = []): void {
		
		// Initialize each route
		routes.forEach(r => {
			const {path,router,routeMiddlewares} = r;
			
			// Apply router level middlewares
			if (routeMiddlewares) router.use(...routeMiddlewares);
			

			// Mount router
			this.app.use(path, router);
		});

		
		// listen on port
		this.app.listen(this.port, () => this.verbose && console.log(`Listening on port: ${ this.port }`));
	}

}

export default App;
