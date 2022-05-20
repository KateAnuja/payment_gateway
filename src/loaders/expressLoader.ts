import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { Application } from 'express';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import * as path from 'path';
import * as expressHbs from 'express-handlebars';
import router from "../routes/_router";
import favicon from 'serve-favicon';
import helmet from 'helmet';
import multer from 'multer';
import { Config, Env } from '../Config';

import session from "express-session";
import * as expressSession from "express-session";
import expressMySqlSession from "express-mysql-session";
import { Helpers } from '../lib/Helpers';

import * as livereload from 'livereload';
import connectLivereload from 'connect-livereload';


export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        
        const expressApp: Application = express();
        // expressApp.use(helmet({
        //     referrerPolicy: { policy: "no-referrer" },
        //     noSniff:true,

        // }));
        if(Config.env===Env.dev){
            const liveReloadServer = livereload.createServer();
            liveReloadServer.watch([
                path.join(__dirname, '../','public'),
                path.join(__dirname, '../','views')
            ]);
            
            expressApp.use(connectLivereload());
            liveReloadServer.server.once("connection", () => {
                setTimeout(() => {
                  liveReloadServer.refresh("/");
                }, 100);
            });
    
        }
        
        

        expressApp.use(express.json({limit:'50mb'}))
        expressApp.use(express.urlencoded({extended:true}));

        const MySQLStore   = expressMySqlSession(expressSession);

        const mysqlstoreOptions:any=Config?.dbConnectionConfigs?.primary;
        if(mysqlstoreOptions){
            mysqlstoreOptions.schema={
                tableName: '_sessions_'
            };
    
            const sessionStore = new MySQLStore(mysqlstoreOptions);
            expressApp.use(session({
                secret: Config.sessionSecret,
                saveUninitialized:false,
                resave:true,
                rolling: true,
                cookie:{
                    maxAge:(12*30*24*60*60*1000),
                },
                store:sessionStore,
            }));
    
        }
        
        
        const forms=multer();
        expressApp.use(forms.array(""));


        useExpressServer(expressApp,{
            cors: true,
            classTransformer: true,
            routePrefix: '/api',
            defaultErrorHandler: false,
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: [path.join(__dirname, '..', 'api/controllers/**/*Controller.js')],
            middlewares: [path.join(__dirname, '..', 'api/middlewares/**/*Middleware.js')],
            interceptors: [],

            /**
             * Authorization features
             */
            //authorizationChecker: authorizationChecker(connection),
            //currentUserChecker: currentUserChecker(connection),
        });

        const hbs = expressHbs.create({
            helpers: Helpers.fns,
            defaultLayout: 'layout',
            partialsDir: [path.join(__dirname, '..', 'views/partials')],
            layoutsDir: path.join(__dirname, '..', 'views/layouts'),
            extname: '.hbs',
        });

        expressApp.set('views', path.join(__dirname, '..', 'views'));
        expressApp.engine('.hbs', hbs.engine);
        expressApp.set('view engine', '.hbs');
        expressApp.use('/', router);
        expressApp
            // Serve static files like images from the public folder
            .use(express.static(path.join(__dirname, '..', 'public'), { maxAge: 31557600000 }))

            // A favicon is a visual cue that client software, like browsers, use to identify a site
            .use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
        
        const server = expressApp.listen(Config.port || 3000);
        settings.setData('express_server', server);
       

        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
    }
}