import { DataSource } from "typeorm";
import path from 'path';
import fs from 'fs';

let configObj:any={};
        let configPath=path.join(__dirname, '../../', './') + 'config.json';
        if(fs.existsSync(configPath)){
            try{
                configObj=JSON.parse(fs.readFileSync(configPath, 'utf8'))
            }catch(err){

            }
        }
const AppDataSource = new DataSource({
    type: "mysql",
    host: configObj?.dbConnectionConfigs?.primary?.host,
    port: configObj?.dbConnectionConfigs?.primary?.port,
    username: configObj?.dbConnectionConfigs?.primary?.user,
    password: configObj?.dbConnectionConfigs?.primary?.password,
    database: configObj?.dbConnectionConfigs?.primary?.database,
    entities: [path.join(__dirname, '..', 'api/models/**/*.js')],
    synchronize:true,
    bigNumberStrings:false,
})


export { AppDataSource };