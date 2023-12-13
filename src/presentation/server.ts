import express, { Router } from 'express';
import path from 'path';
import compression from 'compression';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {
        //Servimos todo lo que esta en nuestra carpeta public
        //* Middlewares
        //Serializa nuestro body a json (para raw json)
        this.app.use( express.json() );
        //Para x-www-form-urlencoded
        this.app.use( express.urlencoded({ extended: true }) );
        //Para utilizar compression de express (con esto ahorramos tamaño en nuestras respuestas http)
        this.app.use( compression() );

        //*Public Folder
        this.app.use( express.static( this.publicPath ) );

        //* Routes
        this.app.use( this.routes );
        //Con esto hacemos que las rutas de express y react, angular, vue, etc esten iguales, ayuda a los SPA
        this.app.get('*', (req,res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        })
    }

}