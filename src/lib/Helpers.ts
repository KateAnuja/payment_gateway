import fs from 'fs';
export class Helpers{
    public static fns={
        inc:(value:any,options:any)=>{
            return parseInt(value)+1;
        },
        fileMTime:(path:string)=>{
            var mtime = Math.floor(Math.random() * 1000);;
            try{
                var stats = fs.statSync(__dirname.replace(/\/app/g,'/public')+path);
                mtime = (new Date(stats.mtime)).getTime();
            }catch(e){
    
            }
            return mtime;
        }
    }
    
}