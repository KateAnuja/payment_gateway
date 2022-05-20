import "reflect-metadata";
import { bootstrapMicroframework } from 'microframework-w3tec';
import { winstonLoader } from "./loaders/winstonLoader";
import { configLoader } from "./loaders/configLoader";
import { iocLoader } from "./loaders/iocLoader";
import { eventDispatchLoader } from "./loaders/eventDispatchLoader";
import { typeormLoader } from "./loaders/typeormLoader";
import { expressLoader } from "./loaders/expressLoader";
import { Config } from "./Config";
import { monitorLoader } from "./loaders/monitorLoader";
import { swaggerLoader } from "./loaders/swaggerLoader";
require('source-map-support').install()

bootstrapMicroframework({
    loaders:[
        winstonLoader,
        configLoader,
        iocLoader,
        eventDispatchLoader,
        typeormLoader,
        expressLoader,
        monitorLoader,
        swaggerLoader,
    ]
}).then(() => {
    
    console.info(``);
    console.info(`Aloha, your app is ready on ${Config.domain}`);
    console.info(`To shut it down, press <CTRL> + C at any time.`);
    console.info(``);
    console.info('-------------------------------------------------------');
    console.info(`Environment  : ${Config.env}`);
    console.info(`Port  : ${Config.port}`);
    console.info(`Version      : `);
    console.info(``);
    console.info(`API Info     : ${Config.domain}/api`);
    console.info(`GraphQL      : `);
    
    console.info(`Swagger      : ${Config.domain}/swagger`);
   
    console.info(`Monitor      : ${Config.domain}/monitor`);
    
    console.info('-------------------------------------------------------');
    console.info('');
    
})
.catch(error => {console.error(error)})