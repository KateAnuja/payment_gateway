import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import inquirer from 'inquirer';
import { Config, Env } from "../Config";
import fs from 'fs';
import path from 'path';

export const configLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {

        let configObj:any={};
        let configPath=path.join(__dirname, '../../', './') + 'config.json';
        if(fs.existsSync(configPath)){
            try{
                configObj=JSON.parse(fs.readFileSync(configPath, 'utf8'))
            }catch(err){

            }
        }else{
            fs.writeFileSync(configPath, '{}');
        }

        let isEnvOk=true;
        let errArr:string[]=[];
        
        if(configObj.env){
            Config.env=configObj.env;
        }else{
            isEnvOk=false;
            configObj.env=Env.prod;
            errArr.push("env")
        }

        if(configObj.port){
            Config.port=configObj.port;
        }else{
            isEnvOk=false;
            configObj.port=3030;
            errArr.push("port")
        }

        if(configObj.sessionSecret){
            Config.sessionSecret=configObj.sessionSecret;
        }else{
            isEnvOk=false;
            configObj.sessionSecret=''; // Util.generatePassword(20);
            errArr.push("sessionSecret")
        }

        if(configObj.domain){
            Config.domain=configObj.domain;
        }else{
            isEnvOk=false;
            errArr.push("domain")
        }


        

        if(configObj.dbConnectionConfigs){
            Config.dbConnectionConfigs=configObj.dbConnectionConfigs;
        }else{
            isEnvOk=false;
            errArr.push("dbConnectionConfigs")
            configObj.dbConnectionConfigs={
                "primary":{
                    "host":"localhost",
                    "user":"root",
                    "password":"",
                    "database":"primary_db",
                    "port":"3306"
                }
            }
        }

        
        if(errArr.length > 0){
            console.error('Error in config.json missing:', errArr.join(","));
            let qrepo:any={
                "domain":{
                    message:'Enter domain name. Ex: https://example.com)'
                }
            }
            let questions:any = [];
            if(errArr.indexOf("dbConnectionConfigs")!=-1){
                questions.push({
                    type:'input',
                    name:'_dbHost',
                    message:'Enter database host (Ex: 127.0.0.1)'
                })
                questions.push({
                    type:'input',
                    name:'_dbPort',
                    message:'Enter database port (Ex: 3306)'
                })

                questions.push({
                    type:'input',
                    name:'_dbUser',
                    message:'Enter database user (Ex: db_user)'
                })
                questions.push({
                    type:'password',
                    name:'_dbPassword',
                    message:'Enter database password (Ex: someStrongPassword)'
                })
                questions.push({
                    type:'input',
                    name:'_dbName',
                    message:'Enter database name (Ex: sample_db)'
                })
            }

            errArr.forEach((val)=>{
                
                if(qrepo[val]){
                    if(!qrepo[val].type)qrepo[val].type='input';
                    qrepo[val].name=val;
                    questions.push(qrepo[val]);
                }
            })

            inquirer.prompt(questions).then(answers => {
                let isDbA=false;
                for(let k in answers){
                    if(k.indexOf("_")!=0){
                        configObj[k]=answers[k];
                    }else{
                        isDbA=true;
                    }
                }
                if(isDbA){
                    configObj.dbConnectionConfigs={
                        "primary":{
                            "host":answers["_dbHost"],
                            "user":answers["_dbUser"],
                            "password":answers["_dbPassword"],
                            "database":answers["_dbName"],
                            "port":answers["_dbPort"]
                        }
                    }
                }
                
                fs.writeFileSync(configPath, JSON.stringify(configObj,null,4));
                console.log("Restart the application");
            })

        }
        settings.setData('config', configObj);
       
    
    }
}