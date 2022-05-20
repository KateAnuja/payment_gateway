export enum Env {
    dev="dev",
    prod="prod",
}

export class Config {
    public static port:number;
    public static env:Env;
    public static domain:string;
    public static dbConnectionConfigs:{
        [key:string]:{
            host:string,
            user:string,
            password:string,
            database:string,
            port:number,
        }
    };
    public static sessionSecret:string;
    public static adminPasswordPolicy:{
        oneCapital:boolean,
        oneSmall:boolean,
        oneDigit:boolean,
        oneSpecialChar:boolean,
        minLength:number,
    };
}